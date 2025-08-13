# Tudo na Tela - Site de Filmes

Um site moderno em Next.js para exibir filmes recentes com integração ao WhatsApp e painel administrativo completo.

## 🚀 Funcionalidades

- **Catálogo de Filmes**: Exibição de filmes em cards elegantes com gradiente rosa/roxo
- **Integração WhatsApp**: Botão "Assistir Agora" que redireciona para WhatsApp com mensagem personalizada
- **Painel Administrativo**: CRUD completo para gerenciar filmes
- **Design Responsivo**: Layout adaptável para desktop e mobile
- **Banco PostgreSQL**: Integração com banco de dados PostgreSQL (Neon)

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React, TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: PostgreSQL (Neon)
- **Ícones**: Lucide React
- **Deploy**: Vercel

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd filme-site
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
DATABASE_URL=sua_string_de_conexao_postgresql
WHATSAPP_NUMBER=seu_numero_whatsapp
NEXT_PUBLIC_WHATSAPP_NUMBER=seu_numero_whatsapp
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Acesse http://localhost:3000

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com a seguinte estrutura:

```sql
CREATE DATABASE tudo_na_tela;

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    sinopse TEXT,
    imagem_url TEXT
);
```

## 📱 Funcionalidades

### Página Principal
- Exibe todos os filmes cadastrados em cards elegantes
- Cada card contém: imagem, título, sinopse e botão "Assistir Agora"
- Design responsivo com gradiente rosa/roxo
- Integração com WhatsApp

### Página Administrativa (/admin)
- **Adicionar Filmes**: Formulário para cadastrar novos filmes
- **Editar Filmes**: Edição inline dos filmes existentes
- **Deletar Filmes**: Remoção com confirmação
- **Listar Filmes**: Visualização de todos os filmes cadastrados

### Integração WhatsApp
- Botão "Assistir Agora" gera link do WhatsApp
- Mensagem personalizada: "Olá, gostaria de assistir o filme: [NOME_DO_FILME]"
- Abre em nova aba/aplicativo

## 🎨 Design

O design é baseado no site de referência (https://mundoiptv.vercel.app/) com:
- Gradiente de rosa/magenta para roxo/violeta
- Títulos em amarelo/dourado
- Texto branco para conteúdo
- Cards com efeitos hover e transições suaves
- Layout moderno e profissional

## 🚀 Deploy

O projeto está configurado para deploy na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push

## 📝 Estrutura do Projeto

```
src/
├── app/
│   ├── api/filmes/          # API routes para CRUD de filmes
│   ├── admin/               # Página de administração
│   └── page.tsx             # Página principal
├── components/
│   ├── FilmeCard.tsx        # Componente de card de filme
│   └── Header.tsx           # Componente de cabeçalho
├── lib/
│   └── db.ts                # Configuração do banco de dados
└── types/
    └── filme.ts             # Tipos TypeScript
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas ou suporte, entre em contato via WhatsApp: +55 71 98190-2254
