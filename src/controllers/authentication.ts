import { BaseClient, generators, Issuer } from 'openid-client'
import { FastifyInstance } from 'fastify'

type UserInfo = {
  email_verified: boolean
  email: string
}

const loadClient = async (): Promise<BaseClient> => {
  const { Client }: Issuer<BaseClient> = await Issuer.discover(
    'https://accounts.google.com'
  )

  return new Client({
    client_id: process.env.CLIENT_ID ?? '',
    client_secret: process.env.CLIENT_SECRET ?? '',
  })
}

const registerAuthenticationController = (application: FastifyInstance) => {
  application.route({
    method: 'GET',
    url: '/authentication',
    handler: async (request, reply) => {
      await request.session.regenerate()

      const nonce = generators.nonce()
      const client = await loadClient()

      request.session.simpleBudgetSession = { nonce }

      return reply.redirect(
        client.authorizationUrl({
          redirect_uri: 'http://localhost:3000/authentication/callback',
          scope: 'email',
          code_challenge: generators.codeChallenge(nonce),
        })
      )
    },
  })

  application.route({
    method: 'GET',
    url: '/authentication/callback',
    handler: async (request, reply) => {
      if (!request.session.simpleBudgetSession.nonce) {
        throw Error('reset session?')
      }

      const codeVerifier = request.session.simpleBudgetSession.nonce

      await request.session.regenerate()

      const client = await loadClient()
      const params = client.callbackParams(request.url)
      const tokenSet = await client.callback(
        'http://localhost:3000/authentication/callback',
        params,
        { code_verifier: generators.codeChallenge(codeVerifier) }
      )
      const userInfo = await client.userinfo<UserInfo>(tokenSet)

      if (!userInfo.email_verified) {
        throw Error('email must be verified')
      }

      request.session.simpleBudgetSession = { email: userInfo.email }

      return reply.redirect('/')
    },
  })
}

export default registerAuthenticationController
