 'use client';

import { useState } from 'react';
import { Filme } from '@/types/filme';
import { Play, MessageCircle } from 'lucide-react';

interface FilmeCardProps {
  filme: Filme;
}

export default function FilmeCard({ filme }: FilmeCardProps) {
  const [showFull, setShowFull] = useState(false);

  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5571981902254';
    const message = `Olá, gostaria de saber como funciona. Vim do site Tudo na Tela.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  

  return (
    <div className="group relative bg-gradient-to-br from-pink-500 via-purple-600 to-violet-700 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
      {/* Imagem */}
      <div className="relative h-64 overflow-hidden">
        {filme.imagem_url ? (
          <img
            src={filme.imagem_url}
            alt={filme.titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <Play className="w-16 h-16 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
          {filme.titulo}
        </h3>

        {filme.sinopse && (
          <>
            <p className={`text-white/90 text-sm leading-relaxed ${showFull ? '' : 'line-clamp-3'}`}>
              {filme.sinopse}
            </p>
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-yellow-300 text-sm font-semibold hover:underline"
            >
              {showFull ? 'Mostrar menos' : 'Ler mais'}
            </button>
          </>
        )}

        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <MessageCircle className="w-5 h-5" />
          Assistir Agora
        </button>
      </div>
    </div>
  );
}
