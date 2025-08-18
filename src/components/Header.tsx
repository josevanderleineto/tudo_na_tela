'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logdo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Logo Tudo na Tela"
                width={60} // Aumentado de 40 para 60
                height={60} // Aumentado de 40 para 60
                className="w-14 h-14 object-cover rounded-full" // Atualizado de w-10 h-10 para w-14 h-14
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
                Tudo na Tela
              </h1>
              <p className="text-white/80 md:text-xl">
                Os melhores filmes para você assistir além  de séries, animes, canais, notícias, esportes e muito mais!
              </p>
            </div>
          </Link>

          {/* Navegação */}
          {/* <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Início
            </Link>
             
          </nav> */}

          {/* Menu mobile */}
          <div className="md:hidden">
             
          </div>
        </div>
      </div>
    </header>
  );
}
