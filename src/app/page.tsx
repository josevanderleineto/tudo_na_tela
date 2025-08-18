 'use client';

import { useEffect, useState } from 'react';
import { Filme } from '@/types/filme';
import FilmeCard from '@/components/FilmeCard';
import Header from '@/components/Header';
// NOVO: Importe o ícone de busca (Search)
import { Loader2, Film, Search } from 'lucide-react'; 

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  // NOVO: Estado para armazenar o termo da pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      setLoading(true);
      setError(null); // Limpa erros anteriores
      const response = await fetch('/api/filmes');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar filmes');
      }
      
      const data = await response.json();
      setFilmes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // NOVO: Lógica para filtrar os filmes com base no termo da pesquisa
  // A busca não diferencia maiúsculas de minúsculas.
  const filmesFiltrados = filmes.filter((filme) =>
    filme.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );
// 
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-violet-700">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4">
          Filmes e Séries Recentes
          </h2>
          <p className="text-white/90 text-lg text-xl max-w-2xl mx-auto">
          Visualize os filmes e séries que foram adicionados recentemente ao nosso sistema
          </p>
        </div>

        {/* NOVO: Barra de Pesquisa */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar por título..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 rounded-full py-3 px-6 pl-12 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          </div>
        </div>


        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
              <p className="text-white/80">Carregando filmes...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-white font-medium">{error}</p>
              <button
                onClick={fetchFilmes}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        )}

        {/* Lista de Filmes - LÓGICA ALTERADA */}
        {!loading && !error && (
          <>
            {/* Verifica se a lista filtrada tem itens */}
            {filmesFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Mapeia a lista FILTRADA */}
                {filmesFiltrados.map((filme) => (
                  <FilmeCard key={filme.id} filme={filme} />
                ))}
              </div>
            ) : (
              // Se a lista filtrada estiver vazia, mostra uma mensagem
              <div className="text-center py-20">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
                  {/* Verifica se o usuário digitou algo na busca */}
                  {termoPesquisa ? (
                    <>
                      <Search className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Nenhum resultado encontrado
                      </h3>
                      <p className="text-white/70">
                        Tente procurar por outro termo.
                      </p>
                    </>
                  ) : (
                    // Se não digitou nada e não há filmes, mostra a mensagem original
                    <>
                      <Film className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Nenhum filme encontrado
                      </h3>
                      <p className="text-white/70">
                        Ainda não há filmes cadastrados. Acesse a área administrativa para adicionar filmes.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-black/20 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-white/70">
            © 2025 Tudo na Tela. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}