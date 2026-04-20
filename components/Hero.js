import Link from "next/link";

export default function Hero({ onOpenStudio }) {
  return (
    <div className="relative h-screen flex items-center justify-start px-6 md:px-20 overflow-hidden bg-black">
      {/* VÍDEO EM LOOP (O Motor Visual) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 saturate-80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
        {/* Camada de sombra para garantir que o texto branco fique legível */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* CONTEÚDO (Texto e Botões) */}
      <div className="relative z-10 max-w-2xl mt-20">
        <div className="inline-block px-4 py-1 border border-[var(--primary-color)] mb-6">
          <span className="text-[var(--primary-color)] text-xs font-bold uppercase tracking-widest">
            Nova Coleção Disponível
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
          Sua arte, <br />
          <span className="text-[var(--primary-color)]">Nossa rua.</span>
        </h1>

        <p className="text-lg md:text-xl font-light text-gray-300 mb-8 max-w-lg">
          Camisetas oversized e canecas premium. Escolha um de nossos drops
          exclusivos ou assine sua própria peça no estúdio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onOpenStudio}
            className="bg-[var(--primary-color)] text-black px-8 py-4 font-black uppercase text-sm hover:bg-white hover:scale-105 transition-all text-center"
          >
            Personalizar Agora
          </button>
          <Link
            href="/colecao"
            className="bg-transparent border border-white text-white px-8 py-4 font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors text-center"
          >
            Ver Coleção
          </Link>
        </div>
      </div>
    </div>
  );
}
