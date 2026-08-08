import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Domini standard ufficiali dell'ecosistema RM Studio
  const standardDomains = [
    "love.rmstudio.app",
    "localhost",
    "127.0.0.1",
  ];

  const isStandardDomain = standardDomains.some(
    (domain) => hostname === domain || hostname.endsWith(".vercel.app")
  );

  // Se la richiesta proviene da un Dominio Personalizzato CNAME White-Label (es. inviti.white-wedding.it)
  if (!isStandardDomain) {
    const customDomainClean = hostname.toLowerCase().replace(/^www\./, "");

    // Se l'utente visita la radice del dominio personalizzato '/', reindirizza internamente allo studio agenzia dedicato
    if (url.pathname === "/") {
      url.pathname = `/agency/${customDomainClean}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Intercetta tutte le rotte tranne asset statici, _next, favicon e immagini
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sfondi|logo.png|wax-seal.png).*)",
  ],
};
