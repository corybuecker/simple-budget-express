import { createHash } from 'crypto'

type Import = {
  [name: string]: string
}
type Scope = {
  [site: string]: Import
}

export default class ImportMapGenerator {
  private imports: Import
  private scope: Scope

  constructor() {
    const cacheBuster = createHash('md5')
      .update(Math.random().toString())
      .digest('hex')
    // https://generator.jspm.io/#a2NjYGBmL87MLchJ1U0qTUlPLdFNrSgoSi0uZihKTUwu0U3Jz3UwtNAz0jPQT87JTM0rgYoX5ZeWpBaBpc30DA31DCDiULUA+QqiXFgA
    this.imports = {
      react: `https://ga.jspm.io/npm:react@18.2.0/index.js?v=${cacheBuster}`,
      'react-dom/client':
        'https://ga.jspm.io/npm:react-dom@18.2.0/client.js?v=${cacheBuster}',
      'react-router-dom': `./react-router-dom.js?v=${cacheBuster}`,
      './nav': `./nav.js?v=${cacheBuster}`,
      './main': `./main.js?v=${cacheBuster}`,
      './errors': `./errors.js?v=${cacheBuster}`,
    }

    this.scope = {
      'https://ga.jspm.io/': {
        'react-dom': `https://ga.jspm.io/npm:react-dom@18.2.0/index.js?v=${cacheBuster}`,
        scheduler: `https://ga.jspm.io/npm:scheduler@0.23.0/index.js?v=${cacheBuster}`,
      },
    }
  }

  toString() {
    return JSON.stringify({ imports: this.imports, scopes: this.scope })
  }
}
