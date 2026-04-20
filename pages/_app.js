import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    // O CartProvider envolve todo o site, dando acesso ao carrinho em qualquer página!
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
