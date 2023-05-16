import { Router } from 'express'
import { BaseClient, Issuer } from 'openid-client'
import { Request } from 'express'
import { generators } from 'openid-client'

type GoogleCallback = {
  code: string
  nonce: string
}

type UserInfo = {
  email_verified: boolean
  email: string
}

declare module 'express-session' {
  interface SessionData {
    nonce: string
    userInfo: UserInfo
  }
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

const authenticationRouter: Router = Router({ strict: true })

// eslint-disable-next-line @typescript-eslint/no-misused-promises
authenticationRouter.get('/', async (req, res) => {
  const nonce = generators.nonce()

  req.session.nonce = nonce

  const client = await loadClient()

  return res.redirect(
    client.authorizationUrl({
      redirect_uri: 'http://localhost:3000/authentication/callback',
      scope: 'email',
      code_challenge: generators.codeChallenge(nonce),
    })
  )
})

authenticationRouter.get(
  '/callback',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request<GoogleCallback>, res) => {
    if (req.session.nonce === undefined) {
      return res.sendStatus(400)
    }
    const codeVerifier = req.session.nonce
    req.session.regenerate((error) => console.log(error))

    try {
      const client = await loadClient()
      const params = client.callbackParams(req)
      const tokenSet = await client.callback(
        'http://localhost:3000/authentication/callback',
        params,
        { code_verifier: generators.codeChallenge(codeVerifier) }
      )

      req.session.userInfo = await client.userinfo<UserInfo>(tokenSet)

      return res.sendStatus(200)
    } catch (error) {
      console.log(error)
      return res.status(500).send('cannot authenticate')
    }
  }
)

export default authenticationRouter
