// Local: app/robots.ts

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Regra para todos os robôs de busca
      userAgent: '*',
      // Permite o acesso a TODAS as páginas
      allow: '/',
    },
    // MUITO IMPORTANTE: Coloque o link para o seu sitemap aqui
    sitemap: 'https://www.tudonatela.com/sitemap.xml',
  }
}