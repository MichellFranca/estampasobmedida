import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // 1. CORREÇÃO DE SEO: Idioma alterado para Português do Brasil na tag Html abaixo
  return (
    <Html lang="pt-BR">
      <Head />
      <body className="antialiased">
        {/* 2. GOOGLE TAG MANAGER (NOSCRIPT) - Fallback de Segurança */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-SEUCODIGO"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
