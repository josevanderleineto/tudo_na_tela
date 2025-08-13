export interface Filme {
  id: number;
  titulo: string;
  sinopse: string | null;
  imagem_url: string | null;
}

export interface NovoFilme {
  titulo: string;
  sinopse?: string;
  imagem_url?: string;
}

export interface AtualizarFilme {
  titulo?: string;
  sinopse?: string;
  imagem_url?: string;
}

