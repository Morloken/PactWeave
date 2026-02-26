import { Container, Title, Text, Button, Card, Badge, Group, SimpleGrid } from '@mantine/core';
import { getMyPacts } from '@/lib/actions/pact';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { auth } from '@/auth';

const statusColors: Record<string, string> = {
  Draft: 'gray',
  Pending: 'yellow',
  Signed: 'green',
  Disputed: 'red',
  Resolved: 'blue',
  Cancelled: 'dark',
};

export default async function PactsPage() {
  const session = await auth();
  
  if (!session) {
    return (
      <Container size="lg" py="xl">
        <Text>Будь ласка, увійдіть для перегляду угод</Text>
      </Container>
    );
  }

  const pacts = await getMyPacts();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Мої угоди</Title>
        <Group>
          <Link href="/pacts/new">
            <Button>Створити угоду</Button>
          </Link>
          <form action={async () => {
            'use server';
            await signOut({ callbackUrl: '/' });
          }}>
            <Button variant="subtle" color="red" type="submit">
              Вийти
            </Button>
          </form>
        </Group>
      </Group>

      {pacts.length === 0 ? (
        <Text c="dimmed">Угод поки немає. Створіть нову угоду.</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {pacts.map((pact) => (
            <Link key={pact._id} href={`/pacts/${pact._id}`} style={{ textDecoration: 'none' }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Badge color={statusColors[pact.status]}>{pact.status}</Badge>
                </Group>
                <Text fw={500} size="lg">{pact.title}</Text>
                <Text size="sm" c="dimmed">
                  Створено: {new Date(pact.createdAt).toLocaleDateString('uk-UA')}
                </Text>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
