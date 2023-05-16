import { NextFunction, Router } from 'express'
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
authenticationRouter.get('/', async (req, res, next: NextFunction) => {
  try {
    const nonce = generators.nonce()
    const client = await loadClient()

    req.session.regenerate(() => {
      req.session.nonce = nonce

      res.redirect(
        client.authorizationUrl({
          redirect_uri: 'http://localhost:3000/authentication/callback',
          scope: 'email',
          code_challenge: generators.codeChallenge(nonce),
        })
      )
    })
  } catch (error) {
    next(error)
  }
})

authenticationRouter.get(
  '/callback',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request<GoogleCallback>, res, next: NextFunction) => {
    try {
      if (req.session.nonce === undefined) {
        throw Error('reset session?')
      }
      const codeVerifier = req.session.nonce
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      req.session.regenerate(async () => {
        try {
          const client = await loadClient()
          const params = client.callbackParams(req)
          const tokenSet = await client.callback(
            'http://localhost:3000/authentication/callback',
            params,
            { code_verifier: generators.codeChallenge(codeVerifier) }
          )
          const userInfo = await client.userinfo<UserInfo>(tokenSet)

          if (!userInfo.email_verified) {
            throw Error('email must be verified')
          }

          req.session.userInfo = userInfo

          res.redirect('/')
        } catch (error) {
          next(error)
        }
      })
    } catch (error) {
      next(error)
    }
  }
)

export default authenticationRouter
