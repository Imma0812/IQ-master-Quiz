import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IQ Master Pro - Test de QI Scientifique',
  description: 'Test de QI professionnel basé sur les normes WAIS-IV et matrices de Raven.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
