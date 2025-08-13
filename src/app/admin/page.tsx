 // Caminho: app/admin/page.tsx (ou o caminho da sua página)
'use client';

import { useEffect, useState } from 'react';
import { Filme, NovoFilme } from '@/types/filme';
import Header from '@/components/Header';
import { 
  Plus, Edit, Trash2, Save, X, Loader2, Film, Image as ImageIcon 
} from 'lucide-react';

export default function AdminPage() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novoFilme, setNovoFilme] = useState<NovoFilme>({
    titulo: '',
    sinopse: '',
    imagem_url: ''
  });
  const [editandoFilme, setEditandoFilme] = useState<Filme | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  // Autenticação
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  // Função que chama a API de login para verificar a senha
  const verificarSenha = async () => {
    setIsCheckingPassword(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senha }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setAutenticado(true);
      } else {
        alert('Senha incorreta');
      }
    } catch (err) {
      setError('Erro ao tentar fazer login. Tente novamente.');
      alert('Erro de conexão ao tentar fazer login.');
    } finally {
      setIsCheckingPassword(false);
    }
  };

  useEffect(() => {
    if (autenticado) {
      fetchFilmes();
    }
  }, [autenticado]);

  const fetchFilmes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/filmes', {
        headers: {
          Authorization: `Bearer ${senha}`,
        },
      });
      if (!response.ok) {
        throw new Error('Não foi possível carregar os filmes.');
      }
      const data = await response.json();
      setFilmes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  const criarFilme = async () => {
    if (!novoFilme.titulo.trim()) {
      alert('O campo Título é obrigatório.');
      return;
    }
    setSalvando(true);
    try {
      const response = await fetch('/api/filmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${senha}`,
        },
        body: JSON.stringify(novoFilme),
      });
      if (!response.ok) throw new Error('Erro ao criar o filme.');
      await fetchFilmes();
      setNovoFilme({ titulo: '', sinopse: '', imagem_url: '' });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setSalvando(false);
    }
  };

  const atualizarFilme = async () => {
    if (!editandoFilme) return;
    setSalvando(true);
    try {
      const response = await fetch(`/api/filmes/${editandoFilme.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${senha}`,
        },
        body: JSON.stringify({
          titulo: editandoFilme.titulo,
          sinopse: editandoFilme.sinopse,
          imagem_url: editandoFilme.imagem_url,
        }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar o filme.');
      await fetchFilmes();
      setEditandoId(null);
      setEditandoFilme(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setSalvando(false);
    }
  };

  const deletarFilme = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este filme?')) return;
    try {
      const response = await fetch(`/api/filmes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${senha}`,
        },
      });
      if (!response.ok) throw new Error('Erro ao deletar o filme.');
      await fetchFilmes();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  const iniciarEdicao = (filme: Filme) => {
    setEditandoId(filme.id);
    setEditandoFilme({ ...filme });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditandoFilme(null);
  };

  if (!autenticado) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-violet-700">
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm w-full max-w-sm">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4 text-center">Acesso Restrito</h2>
            <input type="password" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && verificarSenha()} className="w-full mb-4 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
            <button onClick={verificarSenha} disabled={isCheckingPassword} className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center">
            {isCheckingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
            </button>
            {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
        </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-violet-700">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4">Administração</h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">Gerencie os filmes do seu catálogo</p>
        </div>

        {/* SEÇÃO 1: FORMULÁRIO PARA ADICIONAR NOVOS FILMES */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Novo Filme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Título *</label>
              <input
                type="text"
                value={novoFilme.titulo}
                onChange={(e) => setNovoFilme({ ...novoFilme, titulo: e.target.value })}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Digite o título do filme"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">URL da Imagem</label>
              <input
                type="url"
                value={novoFilme.imagem_url}
                onChange={(e) => setNovoFilme({ ...novoFilme, imagem_url: e.target.value })}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white/80 text-sm font-medium mb-2">Sinopse</label>
            <textarea
              value={novoFilme.sinopse}
              onChange={(e) => setNovoFilme({ ...novoFilme, sinopse: e.target.value })}
              rows={3}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Digite a sinopse do filme"
            />
          </div>
          <button
            onClick={criarFilme}
            disabled={salvando}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            {salvando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {salvando ? 'Salvando...' : 'Adicionar Filme'}
          </button>
        </div>

        {loading && <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-white animate-spin" /></div>}
        {error && !loading && <div className="text-center py-20 bg-red-500/20 rounded-xl p-4"><p className="text-white">{error}</p></div>}
        
        {/* SEÇÃO 2: LISTA DE FILMES CADASTRADOS */}
        {!loading && !error && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Filmes Cadastrados ({filmes.length})</h3>
            {filmes.map((filme) => (
              <div key={filme.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                {editandoId === filme.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" value={editandoFilme?.titulo || ''} onChange={(e) => setEditandoFilme(prev => prev ? {...prev, titulo: e.target.value} : null)} className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white"/>
                      <input type="url" value={editandoFilme?.imagem_url || ''} onChange={(e) => setEditandoFilme(prev => prev ? {...prev, imagem_url: e.target.value} : null)} className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white"/>
                    </div>
                    <textarea value={editandoFilme?.sinopse || ''} onChange={(e) => setEditandoFilme(prev => prev ? {...prev, sinopse: e.target.value} : null)} rows={3} className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white"/>
                    <div className="flex gap-2">
                      <button onClick={atualizarFilme} disabled={salvando} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                        {salvando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Salvar
                      </button>
                      <button onClick={cancelarEdicao} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                        <X className="w-4 h-4" /> Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-36 bg-white/20 rounded-lg overflow-hidden flex-shrink-0">
                      {filme.imagem_url ? <img src={filme.imagem_url} alt={filme.titulo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-white/50" /></div>}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-yellow-300 mb-2">{filme.titulo}</h4>
                      {filme.sinopse && <p className="text-white/80 mb-4 leading-relaxed">{filme.sinopse}</p>}
                      <div className="flex gap-2">
                        <button onClick={() => iniciarEdicao(filme)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                          <Edit className="w-4 h-4" /> Editar
                        </button>
                        <button onClick={() => deletarFilme(filme.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Deletar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filmes.length === 0 && !loading && <div className="text-center py-10"><p className="text-white/70">Nenhum filme cadastrado ainda. Use o formulário acima para começar.</p></div>}
          </div>
        )}
      </main>
    </div>
  );
}