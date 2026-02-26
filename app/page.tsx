'use client';

import { Container, Title, Text, Button, Group, Card, SimpleGrid } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomeClient() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Container size="lg" py="xl">
        <Text>Завантаження...</Text>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container size="lg" py="xl">
        <Title order={1} mb="md">PactWeave</Title>
        <Text c="dimmed" mb="xl">
          Система конструювання гнучких угод
        </Text>
        <Button size="lg" onClick={() => signIn('google', { redirectTo: '/' })}>
          Увійти через Google
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">PactWeave</Title>
      <Text c="dimmed" mb="xl">
        Система конструювання гнучких угод
      </Text>

      <Group mb="xl">
        <Text>Вітаємо, {session.user?.name}</Text>
        <Button variant="subtle" color="red" onClick={() => signOut({ callbackUrl: '/' })}>
          Вийти
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="sm">Мої угоди</Title>
          <Text c="dimmed" mb="md">Перегляд та управління вашими угодами</Text>
          <Link href="/pacts">
            <Button>Перейти</Button>
          </Link>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="sm">Створити угоду</Title>
          <Text c="dimmed" mb="md">Нова угода з гнучкими полями</Text>
          <Link href="/pacts/new">
            <Button>Створити</Button>
          </Link>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
