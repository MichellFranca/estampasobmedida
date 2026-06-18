import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    // O CartProvider envolve todo o site, dando acesso ao carrinho em qualquer página!
    <CartProvider>
      {/* ======================================================= */}
      {/* GOOGLE TAG MANAGER (GTM) - O Cérebro do Rastreamento    */}
      {/* ======================================================= */}
      {/* Usamos o "next/script" com "afterInteractive" para não deixar o site lento */}
      <Script
        id="gtm-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-SEUCODIGO');
          `,
        }}
      />

      {/* 
        NOTA ESTRATÉGICA: 
        O Pixel da Meta (Facebook/Instagram) não está no código fonte para evitar erros 
        de console já que as contas não existem ainda. Quando criar, instale o Pixel 
        diretamente por dentro do painel do Google Tag Manager!
      */}

      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
