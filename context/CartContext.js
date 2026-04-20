/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useContext, useEffect } from "react";

// Cria o espaço na memória
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // MÁGICA: Ao carregar o site, procura se já havia um carrinho guardado no navegador
  useEffect(() => {
    const savedCart = localStorage.getItem("estampa_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // MÁGICA: Sempre que o carrinho mudar, guarda no navegador
  useEffect(() => {
    localStorage.setItem("estampa_cart", JSON.stringify(cart));
  }, [cart]);

  // Função para adicionar itens
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Cria um ID único juntando a categoria, o id e os detalhes (como tamanho da peça no estúdio)
      const itemExists = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.size === product.size,
      );

      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Abre a gaveta
  };

  const removeFromCart = (id, category, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === id && item.category === category && item.size === size),
      ),
    );
  };

  const updateQuantity = (id, category, size, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.category === category && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Ferramenta pronta para ser usada nas outras páginas
export function useCart() {
  return useContext(CartContext);
}
