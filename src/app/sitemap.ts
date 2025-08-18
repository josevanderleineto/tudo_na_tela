// Local: app/sitemap.ts

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.tudonatela.com/', // URL da sua página inicial
      lastModified: new Date(),
      changeFrequency: 'weekly', // Pode ser 'daily', 'weekly', 'monthly'
      priority: 1, // Prioridade da página (1 é o mais alto)
    },
    // Se você tiver outras páginas, como /sobre, /contato, adicione-as aqui
    // {
    //   url: 'https://www.seusite.com.br/outra-pagina',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}