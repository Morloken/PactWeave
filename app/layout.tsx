import './globals.css';
import type { Metadata } from 'next';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'PactWeave',
  description: 'Система конструювання гнучких угод',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
