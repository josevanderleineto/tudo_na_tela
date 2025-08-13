'use client';

import { Film, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
              <Film className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
                Tudo na Tela
              </h1>
              <p className="text-white/80 text-sm">
                Os melhores filmes para você assistir além  de séries, animes, canais, notícias, esportes e muito mais!
              </p>
            </div>
          </Link>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Início
            </Link>
             
          </nav>

          {/* Menu mobile */}
          <div className="md:hidden">
             
          </div>
        </div>
      </div>
    </header>
  );
}

