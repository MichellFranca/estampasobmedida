/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Colecao() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NOVO: Controle do menu de celular

  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    const url = `https://wa.me/${seuNumeroWhatsApp}?text=${mensagem}`;
    window.open(url, "_blank");
  };

  const shirts = [
    {
      id: 1,
      category: "camisa",
      name: 'Camiseta "Graffiti Skull"',
      price: "R$ 129,00",
      img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      category: "camisa",
      name: 'Camiseta "Urban Decay"',
      price: "R$ 119,00",
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      category: "camisa",
      name: 'Camiseta "Neon Lines"',
      price: "R$ 139,00",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      category: "camisa",
      name: 'Camiseta "Dark Mode"',
      price: "R$ 129,00",
      img: "https://images.unsplash.com/photo-1618517351600-b6cb5f48cb1a?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      category: "camisa",
      name: 'Camiseta "Street Tag"',
      price: "R$ 119,00",
      img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      category: "camisa",
      name: 'Camiseta "Oversized Basic"',
      price: "R$ 99,00",
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const mugs = [
    {
      id: 7,
      category: "caneca",
      name: 'Caneca "Jurassic Park"',
      price: "R$ 79,00",
      img: "/images/caneca-jurassic.jpeg",
    },
    {
      id: 8,
      category: "caneca",
      name: 'Caneca "Caneca de casamento"',
      price: "R$ 65,00",
      img: "/images/caneca-casamento.jpeg",
    },
    {
      id: 9,
      category: "caneca",
      name: 'Caneca "Caneca dia dos Pais"',
      price: "R$ 55,00",
      img: "/images/caneca-pais.webp",
    },
    {
      id: 10,
      category: "caneca",
      name: 'Caneca "Street Art"',
      price: "R$ 69,00",
      img: "/images/caneca-jurassic.jpeg",
    },
    {
      id: 11,
      category: "caneca",
      name: 'Caneca "Minimal"',
      price: "R$ 59,00",
      img: "/images/caneca-casamento.jpeg",
    },
    {
      id: 12,
      category: "caneca",
      name: 'Caneca "Neon Vibe"',
      price: "R$ 75,00",
      img: "/images/caneca-pais.webp",
    },
  ];

  const hoodies = [
    {
      id: 13,
      category: "moletom",
      name: 'Moletom "Box Logo"',
      price: "R$ 249,00",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 14,
      category: "moletom",
      name: 'Moletom "Winter Dark"',
      price: "R$ 279,00",
      img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb1?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 15,
      category: "moletom",
      name: 'Moletom "Oversized Sand"',
      price: "R$ 259,00",
      img: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 16,
      category: "moletom",
      name: 'Moletom "Street Line"',
      price: "R$ 239,00",
      img: "https://images.unsplash.com/photo-1516826957135-700ede19c6ce?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 17,
      category: "moletom",
      name: 'Moletom "Graffiti Back"',
      price: "R$ 289,00",
      img: "https://images.unsplash.com/photo-1522435555198-d152a5146c24?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 18,
      category: "moletom",
      name: 'Moletom "Night City"',
      price: "R$ 269,00",
      img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background-dark)] flex flex-col pt-24">
      <Head>
        <title>Coleção Completa | Estampa sob medida</title>
      </Head>
      <a
        href="https://wa.me/5571999092470?text=Olá! Preciso de ajuda com a coleção."
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--background-dark)]/95 backdrop-blur-md border-b border-[var(--border-color)] py-3 shadow-2xl"
            : "bg-[var(--background-dark)] py-6 border-b border-[var(--border-color)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-3 group"
          >
            <img
              src="/images/logo.png"
              alt="Logo Estampa sob medida"
              className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/200x60/1A237E/FFFFFF?text=Logo+Aqui";
              }}
            />
          </Link>

          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-300 items-center ml-8">
            <Link
              href="/"
              className="hover:text-[var(--primary-color)] transition-colors"
            >
              Início
            </Link>
            <span className="text-[var(--primary-color)]">Coleção</span>
            <Link
              href="/"
              className="hover:text-[var(--primary-color)] transition-colors"
            >
              NOVIDADES
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6 ml-auto">
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
            <Link
              href="/"
              className="hidden md:block ml-2 px-6 py-2.5 font-black uppercase text-[10px] bg-[var(--primary-color)] text-white hover:bg-white hover:text-[var(--primary-color)] transition-all shadow-lg shadow-[var(--primary-color)]/20 rounded-sm"
            >
              Criar no Estúdio
            </Link>
            {/* NOVO: Botão Hambúrguer para Celular */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* NOVO: GAVETA DO MENU MOBILE */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-[80] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-[var(--background-dark)] border-l border-[var(--border-color)] z-[90] transform transition-transform duration-500 shadow-2xl flex flex-col md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
          <h3 className="text-lg font-black text-white uppercase tracking-widest">
            Menu
          </h3>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
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
        <div className="flex flex-col p-6 space-y-6 text-sm font-bold uppercase tracking-widest text-gray-300">
          <Link
            href="/"
            className="hover:text-[var(--primary-color)] transition-colors text-left"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            href="/colecao"
            className="text-[var(--primary-color)] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Coleção
          </Link>
          <Link
            href="/"
            className="hover:text-[var(--primary-color)] transition-colors text-left"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Criar no Estúdio
          </Link>
        </div>
      </div>

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
        <section className="py-20 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Nossa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-purple)]">
              Coleção
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Adicione itens à sacola e finalize o pedido de uma vez só.
          </p>
        </section>

        <div className="max-w-7xl mx-auto space-y-32 mb-32">
          {/* CAMISAS */}
          <section className="px-6">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-l-4 border-[var(--primary-color)] pl-4 mb-12">
              T-Shirts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shirts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[var(--background-card)] border border-[var(--border-color)] rounded-lg overflow-hidden group"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={p.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                      alt={p.name}
                      onClick={() => setSelectedProduct(p)}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {p.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--primary-color)] font-black text-xl">
                        {p.price}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setSelectedSize("M");
                        }}
                        className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase rounded hover:bg-[var(--primary-color)] hover:text-white transition-colors"
                      >
                        Adicionar +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CANECAS (Fundo Claro) */}
          <section className="bg-gray-100 py-24 -mx-6 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black text-[var(--secondary-color)] uppercase tracking-tighter border-l-4 border-[var(--secondary-color)] pl-4 mb-12">
                Canecas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {mugs.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col text-center"
                  >
                    <img
                      src={p.img}
                      className="aspect-square object-cover rounded mb-4 cursor-zoom-in"
                      alt={p.name}
                      onClick={() => setSelectedProduct(p)}
                    />
                    <h3 className="text-[var(--secondary-color)] font-bold text-xs truncate mb-2">
                      {p.name}
                    </h3>
                    <span className="text-[var(--primary-color)] font-black text-sm mb-4">
                      {p.price}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setSelectedSize("M");
                      }}
                      className="w-full bg-[var(--secondary-color)] text-white py-2 text-[9px] font-black uppercase rounded"
                    >
                      Sacola
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MOLETONS */}
          <section className="px-6">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-l-4 border-[var(--accent-purple)] pl-4 mb-12">
              Moletons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hoodies.map((p) => (
                <div
                  key={p.id}
                  className="relative aspect-video rounded-xl overflow-hidden group border border-[var(--border-color)]"
                >
                  <img
                    src={p.img}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity cursor-zoom-in"
                    alt={p.name}
                    onClick={() => setSelectedProduct(p)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-3xl font-black text-white uppercase mb-2">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-6 pointer-events-auto">
                      <span className="text-[var(--primary-color)] text-xl font-bold">
                        {p.price}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setSelectedSize("M");
                        }}
                        className="bg-white text-black px-8 py-3 text-xs font-black uppercase rounded hover:bg-[var(--primary-color)] hover:text-white transition-all"
                      >
                        Adicionar à Sacola
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 2. MODAL DE "ESPIAR PRODUTO" (QUICK VIEW) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
          {/* Fundo escuro */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Caixa do Modal */}
          <div className="relative bg-[var(--background-card)] border border-[var(--border-color)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row">
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors bg-black/20 p-2 rounded-full"
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

            {/* Lado Esquerdo: Imagem Gigante */}
            <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-8">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Lado Direito: Informações e Ação */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <span className="text-[var(--primary-color)] font-black uppercase text-[10px] tracking-[0.3em] mb-2 block">
                ✦ {selectedProduct.category} Exclusive
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                {selectedProduct.name}
              </h2>
              <p className="text-2xl font-black text-white mb-6">
                {selectedProduct.price}
              </p>

              {/* SELETOR DE TAMANHO DENTRO DO MODAL (Só para roupas) */}
              {(selectedProduct.category === "camisa" ||
                selectedProduct.category === "moletom") && (
                <div className="mb-8">
                  <label className="text-gray-500 font-bold uppercase text-[10px] tracking-widest block mb-3 italic">
                    Selecione o Tamanho
                  </label>
                  <div className="flex gap-2">
                    {["P", "M", "G", "GG"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedSize(t)}
                        className={`w-12 h-12 flex items-center justify-center text-xs font-black rounded-sm border transition-all ${selectedSize === t ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)] shadow-[0_0_15px_rgba(242,101,34,0.3)]" : "bg-transparent text-gray-400 border-[var(--border-color)] hover:border-gray-500"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-3 italic">
                    Descrição do Item
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Produzido com malha premium de alta gramatura, este item da
                    coleção 2026 reflete a essência do streetwear autêntico.
                    Acabamento reforçado e toque macio para o uso diário.
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-3 italic">
                    Envio e Entrega
                  </h4>
                  <p className="text-gray-400 text-[11px]">
                    ✦ Despacho em até 48h úteis.
                    <br />✦ Entrega garantida via transportadora ou correios.
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => {
                    const itemComTamanho = {
                      ...selectedProduct,
                      size:
                        selectedProduct.category !== "caneca"
                          ? selectedSize
                          : null,
                    };
                    addToCart(itemComTamanho);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-5 bg-[var(--primary-color)] text-white font-black uppercase tracking-widest text-xs rounded-sm hover:scale-[1.02] transition-all shadow-[0_10px_20px_rgba(242,101,34,0.2)]"
                >
                  Confirmar e Adicionar
                </button>
                <p className="text-center text-[9px] text-gray-600 mt-4 uppercase font-bold">
                  Compra 100% segura via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[var(--background-card)] border-t border-[var(--border-color)] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Logo Estampa sob medida"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/200x60/1A237E/FFFFFF?text=Logo+Aqui";
                }}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
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

            {/* ÍCONES VISUAIS DE PAGAMENTO */}
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
                title="Boleto Bancário"
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
          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">
            © 2026 ESTAMPA SOB MEDIDA LTDA | CNPJ: 00.000.000/0001-00 | CRIADO
            POR FRANCA WEB & CRIATIVA
          </p>
          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">
            Salvador, Bahia - Brasil
          </p>
        </div>
      </footer>
    </div>
  );
}
