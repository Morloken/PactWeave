'use client';

import { Container, Paper, Title, Text, Button, Center } from '@mantine/core';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <Container size={420} my={40}>
        <Text>Завантаження...</Text>
      </Container>
    );
  }

  if (session) {
    return null;
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Вхід</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Увійдіть через Google для продовження
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Center>
          <Button size="lg" onClick={() => signIn('google', { redirectTo: '/' })}>
            Увійти через Google
          </Button>
        </Center>
      </Paper>
    </Container>
  );
}
