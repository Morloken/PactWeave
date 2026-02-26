'use client';

import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider>
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </SessionProvider>
  );
}
