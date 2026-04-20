/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Hero from "../components/Hero";
import ProductStudio from "../components/ProductStudio";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [view, setView] = useState("home");
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } =
    useCart();

  const total = cart.reduce((acc, item) => {
    const priceNum = parseFloat(
      item.price.replace("R$ ", "").replace(",", "."),
    );
    return acc + priceNum * item.quantity;
  }, 0);

  const handleWhatsAppCheckout = () => {
    const seuNumeroWhatsApp = "5571999092470";
    let mensagem = "*PEDIDO MULTI-ITENS - ESTAMPA SOB MEDIDA*%0A%0A";
    cart.forEach((item, index) => {
      let extras = "";
      if (item.size) extras += ` | Tam: ${item.size}`;
      if (item.color) extras += ` | Cor: ${item.color}`;
      if (item.clientData)
        extras += `%0A   *Atenção:* ${item.clientData} (Arte no chat)`;
      mensagem += `${index + 1}. *${item.name}*%0A   Qtd: ${item.quantity} | Valor: ${item.price}${extras}%0A%0A`;
    });
    mensagem += `*TOTAL DO PEDIDO:* R$ ${total.toFixed(2).replace(".", ",")}%0A%0APodemos confirmar os dados de pagamento e entrega?`;
    window.open(
      `https://wa.me/${seuNumeroWhatsApp}?text=${mensagem}`,
      "_blank",
    );
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const carouselRef = useRef(null);
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const carouselProducts = [
    {
      id: 1,
      name: 'Camiseta "Neon Tag"',
      price: "R$ 129,00",
      img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&h=500&fit=crop",
    },
    {
      id: 2,
      name: 'Caneca "Matte Dark"',
      price: "R$ 59,00",
      img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400&h=500&fit=crop",
    },
    {
      id: 3,
      name: 'Moletom "Urban Box"',
      price: "R$ 249,00",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&h=500&fit=crop",
    },
    {
      id: 4,
      name: 'Camiseta "Ghost"',
      price: "R$ 119,00",
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&h=500&fit=crop",
    },
    {
      id: 5,
      name: 'Caneca "Graffiti"',
      price: "R$ 65,00",
      img: "https://images.unsplash.com/photo-1578784157147-3806a090b833?q=80&w=400&h=500&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background-dark)] flex flex-col relative">
      <Head>
        <title>Estampa sob medida | Streetwear Custom</title>
      </Head>

      <a
        href="https://wa.me/5571999092470?text=Olá! Preciso de ajuda com o meu pedido."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] flex flex-col items-center group transition-transform hover:scale-110 active:scale-95"
      >
        <div className="bg-[#25D366] p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] flex items-center justify-center mb-1">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </div>
        <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
          Ajuda
        </span>
      </a>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[var(--background-dark)]/95 backdrop-blur-md border-b border-[var(--border-color)] py-3 shadow-2xl" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="cursor-pointer flex items-center gap-3 group"
            onClick={() => setView("home")}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/200x60/1A237E/FFFFFF?text=Logo+Aqui";
              }}
            />
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-300 items-center ml-8">
            <button
              onClick={() => setView("home")}
              className={`transition-colors ${view === "home" ? "text-[var(--primary-color)]" : "hover:text-white"}`}
            >
              Início
            </button>
            <Link
              href="/colecao"
              className="hover:text-[var(--primary-color)] transition-colors"
            >
              Coleção
            </Link>
            <button className="hover:text-[var(--primary-color)] transition-colors">
              Drops
            </button>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-gray-300 hover:text-[var(--primary-color)] relative group"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[var(--primary-color)] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => setView("studio")}
              className="hidden md:block ml-2 px-6 py-2.5 font-black uppercase text-[10px] bg-[var(--primary-color)] text-white hover:bg-white hover:text-[var(--primary-color)] transition-all shadow-lg shadow-[var(--primary-color)]/20 rounded-sm"
            >
              Criar Agora
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[var(--background-dark)] z-[70] transform transition-transform duration-500 shadow-2xl flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--background-card)]">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">
            Sua <span className="text-[var(--primary-color)]">Sacola</span>
          </h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-bold uppercase text-xs tracking-widest">
              Sua sacola está vazia
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.category}-${item.id}-${item.size || "unico"}`}
                className="flex gap-4 bg-[var(--background-card)] p-4 rounded-lg border border-[var(--border-color)]"
              >
                <img
                  src={item.img}
                  className="w-20 h-20 object-contain bg-black rounded"
                  alt={item.name}
                />
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm leading-tight">
                    {item.name}
                  </h4>
                  {(item.size || item.color) && (
                    <p className="text-gray-500 text-[10px] uppercase mt-1">
                      {item.size && `Tam: ${item.size} `}{" "}
                      {item.color && `| Cor: ${item.color}`}
                    </p>
                  )}
                  <p className="text-[var(--primary-color)] font-black text-sm mt-1">
                    {item.price}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.category, item.size, -1)
                      }
                      className="w-8 h-8 bg-[#050505] text-white rounded border border-[#333]"
                    >
                      -
                    </button>
                    <span className="text-white font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.category, item.size, 1)
                      }
                      className="w-8 h-8 bg-[#050505] text-white rounded border border-[#333]"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.category, item.size)
                      }
                      className="ml-auto text-red-500 text-[10px] font-bold uppercase hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--border-color)] bg-[var(--background-card)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white font-bold uppercase text-xs tracking-widest">
                Total
              </span>
              <span className="text-[var(--primary-color)] text-2xl font-black">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-5 bg-[#25D366] text-white font-black uppercase tracking-widest text-xs rounded shadow-lg hover:scale-105 transition-all"
            >
              Finalizar no WhatsApp
            </button>
          </div>
        )}
      </div>

      <main className="flex-grow">
        {view === "home" ? (
          <>
            <Hero />

            {/* FAIXA ROTATIVA STREETWEAR */}
            <div className="bg-[var(--primary-color)] text-[var(--background-dark)] py-3 overflow-hidden border-y border-[var(--primary-color)] relative z-10">
              <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0%);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                .animate-marquee {
                  display: flex;
                  width: 200%;
                  animation: marquee 15s linear infinite;
                }
              `}</style>
              <div className="animate-marquee whitespace-nowrap flex items-center">
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ 100% ALGODÃO PREMIUM
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ ESTAMPA EXCLUSIVA
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ ENVIO PARA TODO O BRASIL
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ DESIGN AUTORAL
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ 100% ALGODÃO PREMIUM
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ ESTAMPA EXCLUSIVA
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ ENVIO PARA TODO O BRASIL
                </span>
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mx-6">
                  ✦ DESIGN AUTORAL
                </span>
              </div>
            </div>

            {/* SEÇÃO CARROSSEL COM BARRA DE ROLAGEM OCULTA E SETAS FLUTUANTES */}
            <section className="py-24 pl-6 md:pl-20 bg-[var(--background-card)] border-y border-[var(--border-color)]">
              <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>

              <div className="pr-6 md:pr-20 mb-10 text-left">
                <h3 className="text-white text-3xl md:text-4xl font-black uppercase">
                  Destaques da{" "}
                  <span className="text-[var(--primary-color)]">Semana</span>
                </h3>
                <p className="text-gray-400 mt-2">
                  Navegue pelos drops mais quentes.
                </p>
              </div>

              <div className="relative group">
                {/* BOTÃO ESQUERDA FLUTUANTE */}
                <button
                  onClick={() => scrollCarousel("left")}
                  className="absolute left-2 md:left-6 top-[40%] z-20 w-14 h-14 bg-black/70 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[var(--primary-color)] transition-all opacity-0 group-hover:opacity-100 shadow-2xl -translate-y-1/2"
                >
                  <svg
                    className="w-7 h-7 pr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth pr-6 md:pr-20 relative z-10"
                >
                  {carouselProducts.map((p) => (
                    <div
                      key={p.id}
                      className="min-w-[280px] md:min-w-[320px] bg-[var(--background-dark)] border border-[var(--border-color)] cursor-pointer snap-start flex-shrink-0 text-left rounded-lg overflow-hidden shadow-lg group/card"
                    >
                      <div className="aspect-[4/5] overflow-hidden relative">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="object-cover w-full h-full group-hover/card:scale-110 transition-transform duration-700 opacity-90 group-hover/card:opacity-100"
                        />
                        <div className="absolute top-4 right-4 bg-[var(--primary-color)] text-white text-[10px] font-black px-3 py-1 uppercase rounded-sm">
                          Drop
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-white truncate">
                          {p.name}
                        </h4>
                        <p className="text-[var(--primary-color)] font-black mt-1">
                          {p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTÃO DIREITA FLUTUANTE COM ANIMAÇÃO */}
                <button
                  onClick={() => scrollCarousel("right")}
                  className="absolute right-8 md:right-24 top-[40%] z-20 w-14 h-14 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[var(--primary-color)] transition-all shadow-[0_0_20px_rgba(242,101,34,0.6)] -translate-y-1/2 animate-pulse group-hover:animate-none"
                >
                  <svg
                    className="w-7 h-7 pl-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </section>

            <section className="py-24 px-6 bg-gray-100">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                  <h3 className="text-black text-4xl md:text-5xl font-black uppercase tracking-tighter">
                    Nossa{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-purple)]">
                      Vibe
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-2 font-medium">
                    Cores vivas, qualidade premium e muita personalidade.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[250px]">
                  <div className="col-span-2 row-span-2 relative group overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Streetwear Colorido"
                    />
                    <div className="absolute bottom-6 left-6">
                      <span className="bg-white text-[var(--secondary-color)] px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg">
                        Estilo Autêntico
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 row-span-1 relative group overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Camisa Branca"
                    />
                  </div>
                  <div className="col-span-1 row-span-2 relative group overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=600&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Cores"
                    />
                  </div>
                  <div className="col-span-1 row-span-1 relative group overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Caneca"
                    />
                  </div>
                  <div className="col-span-2 row-span-1 relative group overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1550614000-4b95d4ed79ea?q=80&w=800&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Neon Lifestyle"
                    />
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-[var(--accent-purple)] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md">
                        Lifestyle
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 row-span-1 relative group overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1499939667766-4afceb292d05?q=80&w=800&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Urban Vibe"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[var(--secondary-color)] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md">
                        Cultura Urbana
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 px-6 bg-[var(--background-dark)] border-t border-[var(--border-color)]">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Nossa{" "}
                    <span className="text-[var(--primary-color)]">
                      Comunidade
                    </span>
                  </h2>
                  <p className="text-gray-400 mt-2 font-medium">
                    Quem usa Estampa sob medida nas ruas. Poste com{" "}
                    <span className="text-white font-bold">
                      #EstampaSobMedida
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="max-w-sm mx-auto w-full bg-[var(--background-card)] rounded-xl overflow-hidden border border-[var(--border-color)] group hover:border-[var(--primary-color)] transition-colors">
                    <div className="h-56 w-full overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1528701202534-192e276f7ab3?q=80&w=600&auto=format&fit=crop"
                        alt="Cliente 1"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-400 text-[10px] tracking-widest">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-black text-[10px]">
                          MG
                        </div>
                        <span className="text-white font-bold text-sm tracking-wide">
                          @marcos.gomes
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm italic leading-relaxed">
                        &quot;A qualidade da malha é absurda. O caimento
                        oversized é perfeito, igualzinho ao das marcas gringas.
                        Recomendo muito!&quot;
                      </p>
                    </div>
                  </div>

                  <div className="max-w-sm mx-auto w-full bg-[var(--background-card)] rounded-xl overflow-hidden border border-[var(--border-color)] group hover:border-[var(--primary-color)] transition-colors">
                    <div className="h-56 w-full overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
                        alt="Cliente 2"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-400 text-[10px] tracking-widest">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--secondary-color)] text-white flex items-center justify-center font-black text-[10px]">
                          CL
                        </div>
                        <span className="text-white font-bold text-sm tracking-wide">
                          @caio.lifestyle
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm italic leading-relaxed">
                        &quot;Fiz uma arte própria no estúdio e chegou super
                        rápido. A impressão não desbota na lavagem de jeito
                        nenhum. Cliente fiel agora.&quot;
                      </p>
                    </div>
                  </div>

                  <div className="max-w-sm mx-auto w-full bg-[var(--background-card)] rounded-xl overflow-hidden border border-[var(--border-color)] group hover:border-[var(--primary-color)] transition-colors">
                    <div className="h-56 w-full overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600&auto=format&fit=crop"
                        alt="Cliente 3"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-400 text-[10px] tracking-widest">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent-purple)] text-white flex items-center justify-center font-black text-[10px]">
                          LS
                        </div>
                        <span className="text-white font-bold text-sm tracking-wide">
                          @lucas.street
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm italic leading-relaxed">
                        &quot;Os moletons são pesados, perfeitos para a noite. O
                        drop esgotou rápido mas consegui garantir o meu. Estão
                        de parabéns!&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 px-6 text-center bg-[var(--background-dark)] border-t border-[var(--border-color)]">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 tracking-tighter">
                Tem uma{" "}
                <span className="text-[var(--primary-color)]">
                  ideia única?
                </span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Vá para o nosso estúdio, faça o upload da sua arte e veja a
                mágica acontecer em tempo real na nossa malha premium.
              </p>
              <button
                onClick={() => setView("studio")}
                className="bg-[var(--primary-color)] text-white px-12 py-5 font-black uppercase tracking-widest text-sm hover:scale-105 hover:bg-white hover:text-[var(--primary-color)] transition-all shadow-xl shadow-[var(--primary-color)]/20 rounded-sm"
              >
                Abrir o Estúdio de Criação
              </button>
            </section>
          </>
        ) : (
          <div className="pt-24 min-h-screen">
            <ProductStudio />
          </div>
        )}
      </main>

      <footer className="bg-[var(--background-card)] border-t border-[var(--border-color)] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 break-words">
              A maior plataforma de personalização de camisas e canecas do
              Brasil. Qualidade premium de fábrica direto para o seu estilo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6 text-[var(--primary-color)]">
              Institucional
            </h4>
            <ul className="text-gray-400 text-sm space-y-3 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">
                Sobre Nós
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Nossas Lojas
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6 text-[var(--primary-color)]">
              Dúvidas
            </h4>
            <ul className="text-gray-400 text-sm space-y-3 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">
                Trocas e Devoluções
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Prazos de Entrega
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Como Personalizar
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Fale Conosco
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6 text-[var(--primary-color)]">
              Pagamento & Segurança
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              <div
                title="Pix"
                className="bg-white w-12 h-8 rounded flex items-center justify-center shadow-md cursor-help transition-transform hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#32BCAD">
                  <path d="M11.9999 1.5L2.5 10.9999L11.9999 20.4998L21.4998 10.9999L11.9999 1.5ZM11.9999 18.0001L5.00007 10.9999L11.9999 3.99971L18.9997 10.9999L11.9999 18.0001Z" />
                  <path d="M11.9999 6.5L7.5 10.9999L11.9999 15.4998L16.4998 10.9999L11.9999 6.5Z" />
                </svg>
              </div>
              <div
                title="Visa"
                className="bg-white w-12 h-8 rounded flex items-center justify-center shadow-md cursor-help transition-transform hover:scale-110"
              >
                <span className="text-[#1434CB] font-black text-[14px] italic tracking-tighter leading-none">
                  VISA
                </span>
              </div>
              <div
                title="MasterCard"
                className="bg-white w-12 h-8 rounded flex items-center justify-center shadow-md relative overflow-hidden cursor-help transition-transform hover:scale-110"
              >
                <div className="w-5 h-5 bg-[#EB001B] rounded-full absolute -left-1 opacity-90"></div>
                <div className="w-5 h-5 bg-[#F79E1B] rounded-full absolute -right-1 opacity-90"></div>
              </div>
              <div
                title="Boleto"
                className="bg-white w-12 h-8 rounded flex items-center justify-center shadow-md cursor-help transition-transform hover:scale-110"
              >
                <svg width="22" height="14" viewBox="0 0 24 24" fill="#000">
                  <path d="M2 2h2v20H2zm3 0h1v20H5zm3 0h3v20H8zm5 0h1v20h-1zm3 0h2v20h-2zm3 0h1v20h-1z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-tight">
                Site 100% Seguro
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest break-words w-full md:w-auto">
            © 2026 ESTAMPA SOB MEDIDA LTDA | CNPJ: 00.000.000/0001-00 | CRIADO
            POR FRANCA WEB & CRIATIVA
          </p>
          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest whitespace-nowrap">
            Salvador, Bahia - Brasil
          </p>
        </div>
      </footer>
    </div>
  );
}
