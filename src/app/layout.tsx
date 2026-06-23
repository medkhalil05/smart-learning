import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Learning - Plateforme d'Apprentissage Intelligente",
  description: "Transformez vos cours en professeurs virtuels intelligents grâce à l'IA. Plateforme d'apprentissage adaptatif avec tuteur IA, quiz interactifs et analytiques.",
  keywords: ["apprentissage", "IA", "éducation", "tuteur virtuel", "quiz", "PDF", "université"],
   icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
