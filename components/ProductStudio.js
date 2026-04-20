/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext"; // <-- PUXANDO A MEMÓRIA GLOBAL

export default function ProductStudio() {
  const [product, setProduct] = useState("shirt");
  const [color, setColor] = useState("black");
  const [art, setArt] = useState(null);
  const fileInputRef = useRef(null);

  // --- MOTOR DO CARRINHO GLOBAL ---
  const { addToCart } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Dados do cliente para vincular à arte
  const [size, setSize] = useState("M");
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsApp, setCustomerWhatsApp] = useState("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const handleAddToCart = () => {
    const valor = product === "shirt" ? "R$ 129,00" : "R$ 59,00";
    const nomeProduto =
      product === "shirt" ? "Camiseta Personalizada" : "Caneca Personalizada";

    // Criar o pacote do produto customizado
    const customItem = {
      id: `custom-${Date.now()}`,
      category: product,
      name: nomeProduto,
      price: valor,
      img: product === "shirt" ? images.shirt[color] : images.mug[color], // Usamos a foto limpa para não quebrar a memória
      size: product === "shirt" ? size : null,
      color: color === "black" ? "Preta" : "Branca",
      clientData: `Nome: ${customerName} | WA: ${customerWhatsApp}`,
    };

    addToCart(customItem); // Joga na Sacola Global
    setIsDrawerOpen(false); // Fecha esta gaveta (a do carrinho global abrirá sozinha)
  };

  // --- MOTOR DE ARRASTAR E SOLTAR ---
  const [artPos, setArtPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartCoords = useRef({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;
    dragStartCoords.current = { x: clientX - artPos.x, y: clientY - artPos.y };
  };

  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;
      setArtPos({
        x: clientX - dragStartCoords.current.x,
        y: clientY - dragStartCoords.current.y,
      });
    };

    const handleDragEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove, { passive: false });
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, setArtPos]);

  useEffect(() => {
    setArtPos({ x: 0, y: 0 });
  }, [product, setArtPos]);

  // Links das imagens base
  const images = {
    shirt: {
      black: "/images/camisa-preta.png",
      white: "/images/camisa-branca.png",
    },
    mug: {
      black: "/images/caneca-preta.png",
      white: "/images/caneca-branca.png",
    },
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setArt(imageUrl);
      setArtPos({ x: 0, y: 0 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 select-none relative">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
          Estúdio de{" "}
          <span className="text-[var(--primary-color)]">Criação</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Faça o upload e arraste a imagem para a posição desejada.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* PALCO DE VISUALIZAÇÃO */}
        <div className="flex-1 bg-[var(--background-card)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-center relative min-h-[600px] overflow-hidden">
          <div className="relative flex items-center justify-center w-full h-full">
            <img
              src={
                product === "shirt" ? images.shirt[color] : images.mug[color]
              }
              alt={`Base ${product}`}
              className="max-h-[500px] w-auto object-contain pointer-events-none"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x600/1a1a1a/333333?text=Sua+Foto+Aqui";
              }}
            />
            {art && (
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className={`absolute z-30 cursor-move transition-opacity ${isDragging ? "opacity-70 scale-105" : "opacity-100 hover:ring-2 hover:ring-[var(--primary-color)] hover:bg-white/5"} p-2 rounded`}
                style={{
                  top: product === "shirt" ? "40%" : "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${artPos.x}px), calc(-50% + ${artPos.y}px))`,
                  width: product === "shirt" ? "180px" : "120px",
                  height: product === "shirt" ? "180px" : "120px",
                }}
              >
                <img
                  src={art}
                  alt="Sua Estampa"
                  className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                />
                <div
                  className={`absolute inset-0 border-2 border-dashed ${isDragging ? "border-[var(--primary-color)]" : "border-white/30"} pointer-events-none rounded`}
                ></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-[9px] uppercase px-2 py-1 rounded whitespace-nowrap opacity-50">
                  ↔ Arraste ↕
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAINEL DE CONTROLES */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          <div className="bg-[var(--background-card)] p-6 border border-[var(--border-color)] rounded-md">
            <h3 className="text-white font-bold uppercase mb-4 text-[10px] tracking-widest border-b border-[var(--border-color)] pb-2">
              1. Produto
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setProduct("shirt")}
                className={`py-3 text-[10px] font-black uppercase border rounded-sm ${product === "shirt" ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]" : "text-gray-400 border-[var(--border-color)] hover:text-white"}`}
              >
                Camiseta
              </button>
              <button
                onClick={() => setProduct("mug")}
                className={`py-3 text-[10px] font-black uppercase border rounded-sm ${product === "mug" ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]" : "text-gray-400 border-[var(--border-color)] hover:text-white"}`}
              >
                Caneca
              </button>
            </div>
          </div>

          <div className="bg-[var(--background-card)] p-6 border border-[var(--border-color)] rounded-md">
            <h3 className="text-white font-bold uppercase mb-4 text-[10px] tracking-widest border-b border-[var(--border-color)] pb-2">
              2. Cor Base
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setColor("black")}
                className={`w-10 h-10 rounded-full bg-[#111] border-2 shadow-inner transition-transform hover:scale-110 ${color === "black" ? "border-[var(--primary-color)]" : "border-[#333]"}`}
                title="Preta"
              ></button>
              <button
                onClick={() => setColor("white")}
                className={`w-10 h-10 rounded-full bg-[#eee] border-2 shadow-inner transition-transform hover:scale-110 ${color === "white" ? "border-[var(--primary-color)]" : "border-gray-500"}`}
                title="Branca"
              ></button>
            </div>
          </div>

          <div className="bg-[var(--background-card)] p-6 border border-[var(--border-color)] rounded-md">
            <h3 className="text-white font-bold uppercase mb-4 text-[10px] tracking-widest border-b border-[var(--border-color)] pb-2">
              3. Upload da Arte
            </h3>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-[var(--border-color)] hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/5 py-10 transition-colors rounded-sm group"
            >
              <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-1 group-hover:text-[var(--primary-color)]">
                Upload da Imagem
              </span>
              <span className="text-[9px] text-gray-500">
                Clique aqui para enviar
              </span>
            </button>
            {art && (
              <button
                onClick={() => setArt(null)}
                className="w-full mt-3 text-[10px] text-red-500 uppercase font-bold hover:underline"
              >
                Remover Imagem
              </button>
            )}
          </div>

          <div className="bg-[var(--background-card)] p-6 border border-[var(--border-color)] mt-auto rounded-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-[10px] font-bold uppercase">
                Preço Estimado
              </span>
              <span className="text-[var(--primary-color)] text-3xl font-black">
                {product === "shirt" ? "R$ 129,00" : "R$ 59,00"}
              </span>
            </div>
            <button
              disabled={!art}
              onClick={() => setIsDrawerOpen(true)}
              className={`w-full py-5 font-black uppercase tracking-widest text-xs transition-all rounded-sm ${art ? "bg-[var(--primary-color)] text-white hover:scale-105 shadow-[0_0_15px_rgba(245,124,0,0.4)]" : "bg-[var(--border-color)] text-gray-600"}`}
            >
              {art ? "Confirmar Layout" : "Envie uma arte primeiro"}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* A GAVETA DE CONFIGURAÇÃO (ANTES DE IR PARA A SACOLA) */}
      {/* ========================================================= */}

      {/* Fundo escuro (Overlay) - Só aparece quando a gaveta está aberta */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* A Gaveta em si */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[var(--background-dark)] border-l border-[var(--border-color)] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-2xl flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Cabeçalho da Gaveta */}
        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--background-card)]">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">
            Configurar{" "}
            <span className="text-[var(--primary-color)]">Produto</span>
          </h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
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

        {/* Corpo da Gaveta (Formulário e Detalhes) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Mini Resumo do Produto */}
          <div className="flex gap-4 items-center bg-[var(--background-card)] p-4 rounded-md border border-[var(--border-color)]">
            <div className="w-16 h-16 bg-[#050505] rounded overflow-hidden flex items-center justify-center p-2 border border-[#222]">
              <img
                src={
                  product === "shirt" ? images.shirt[color] : images.mug[color]
                }
                alt="Produto"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                {product === "shirt" ? "Camiseta Oversized" : "Caneca Dark"}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Cor: {color === "black" ? "Preta" : "Branca"} | Arte Anexada
              </p>
              <p className="text-[var(--primary-color)] font-black text-sm mt-1">
                {product === "shirt" ? "R$ 129,00" : "R$ 59,00"}
              </p>
            </div>
          </div>

          {/* Seleção de Tamanho (Só aparece se for camiseta) */}
          {product === "shirt" && (
            <div>
              <label className="text-white font-bold uppercase text-[10px] tracking-widest block mb-3">
                Tamanho da Peça
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["P", "M", "G", "GG"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSize(t)}
                    className={`py-2 text-xs font-black rounded-sm border transition-all ${size === t ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]" : "bg-transparent text-gray-400 border-[var(--border-color)] hover:border-gray-500"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* NOVO: BOTÃO DO GUIA DE MEDIDAS */}
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[var(--primary-color)] text-[10px] uppercase font-bold mt-4 hover:underline flex items-center gap-2 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Ver Guia de Medidas
              </button>
            </div>
          )}

          {/* Dados de Contato */}
          <div className="space-y-4">
            <label className="text-white font-bold uppercase text-[10px] tracking-widest block border-b border-[var(--border-color)] pb-2">
              Seus Dados para Contato
            </label>

            <div>
              <label className="text-gray-400 text-[10px] uppercase block mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full bg-[var(--background-card)] border border-[var(--border-color)] text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--primary-color)] transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-400 text-[10px] uppercase block mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                value={customerWhatsApp}
                onChange={(e) => setCustomerWhatsApp(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full bg-[var(--background-card)] border border-[var(--border-color)] text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--primary-color)] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Rodapé da Gaveta (Botão de Adicionar à Sacola) */}
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--background-card)]">
          <button
            onClick={handleAddToCart}
            disabled={!customerName || !customerWhatsApp}
            className={`w-full py-5 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 rounded-sm ${!customerName || !customerWhatsApp ? "bg-[var(--border-color)] text-gray-500 cursor-not-allowed" : "bg-[var(--primary-color)] text-white hover:scale-105 shadow-[0_0_15px_rgba(245,124,0,0.3)]"}`}
          >
            Adicionar à Sacola
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MODAL DO GUIA DE MEDIDAS E TIPO DE CORTE */}
      {/* ========================================================= */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsSizeGuideOpen(false)}
          ></div>

          <div className="relative bg-[var(--background-card)] border border-[var(--border-color)] w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">
                Guia de{" "}
                <span className="text-[var(--primary-color)]">Medidas</span>
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
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

            <div className="p-6 bg-[#0a0a0a]">
              <div className="flex justify-center mb-6 opacity-80">
                {/* Ícone vetorizado de T-Shirt simulando o molde técnico */}
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.38 3.46L16 2a8.96 8.96 0 0 1-3.99 0 8.98 8.98 0 0 1-3.99 0L3.62 3.46 2 6l3 3v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l3-3-1.62-2.54z"></path>
                </svg>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Tamanho
                    </th>
                    <th className="py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Altura
                    </th>
                    <th className="py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Largura
                    </th>
                    <th className="py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Manga
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-white">
                  <tr className="border-b border-[var(--border-color)]/50 hover:bg-white/5 transition-colors">
                    <td className="py-3 font-black text-[var(--primary-color)]">
                      P
                    </td>
                    <td className="py-3">72 cm</td>
                    <td className="py-3">54 cm</td>
                    <td className="py-3">22 cm</td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]/50 hover:bg-white/5 transition-colors">
                    <td className="py-3 font-black text-[var(--primary-color)]">
                      M
                    </td>
                    <td className="py-3">74 cm</td>
                    <td className="py-3">56 cm</td>
                    <td className="py-3">23 cm</td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]/50 hover:bg-white/5 transition-colors">
                    <td className="py-3 font-black text-[var(--primary-color)]">
                      G
                    </td>
                    <td className="py-3">76 cm</td>
                    <td className="py-3">58 cm</td>
                    <td className="py-3">24 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-black text-[var(--primary-color)]">
                      GG
                    </td>
                    <td className="py-3">78 cm</td>
                    <td className="py-3">60 cm</td>
                    <td className="py-3">25 cm</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[9px] text-gray-500 mt-6 text-center uppercase tracking-wider">
                * Modelagem Oversized. Pode haver variação de 1 a 2cm.
              </p>
            </div>

            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--background-card)]">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-full py-3 bg-[var(--primary-color)] text-white font-black uppercase tracking-widest text-xs rounded-sm hover:bg-white hover:text-[var(--primary-color)] transition-all"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
