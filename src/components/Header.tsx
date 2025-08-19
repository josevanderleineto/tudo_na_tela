 'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
              <Image
                src="/logo.svg"
                alt="Logo Tudo na Tela"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain rounded-full"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300 truncate">
                Tudo na Tela
              </h1>
              <p className="text-white/80 text-xs sm:text-sm md:text-base leading-snug">
                Os melhores filmes, séries, animes, canais, notícias, esportes e muito mais!
              </p>
            </div>
          </Link>

          {/* Menu mobile placeholder */}
          <div className="md:hidden"></div>
        </div>
      </div>
    </header>
  );
}
