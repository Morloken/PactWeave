import './globals.css';
import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import Providers from './Providers';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

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
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
