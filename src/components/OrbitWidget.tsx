'use client';

import React, { useEffect, useState } from 'react';

export default function OrbitWidget() {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Legge il file in tempo reale dalla sua posizione originale su rmstudio.app
    fetch('https://rmstudio.app/orbit-template.html')
      .then((res) => res.text())
      .then((html) => {
        // Adatta automaticamente i percorsi relativi delle immagini/loghi verso rmstudio.app
        const adaptedHtml = html
          .replaceAll('src="public/', 'src="https://rmstudio.app/public/')
          .replaceAll('src="loghi/', 'src="https://rmstudio.app/loghi/')
          .replaceAll('src="./', 'src="https://rmstudio.app/');
        setHtmlContent(adaptedHtml);
      })
      .catch((err) => console.error('Errore nel caricamento del Sistema Orbitale RM Studio:', err));
  }, []);

  if (!htmlContent) {
    return (
      <div className="py-12 text-center text-slate-500 text-xs tracking-wider uppercase">
        Caricamento Ecosistema RM Studio...
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden my-12"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
