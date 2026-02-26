import { Container, Title, Text, Button, Paper, Group, Badge, Stack, Card } from '@mantine/core';
import { getPact } from '@/lib/actions/pact';
import { auth } from '@/auth';
import Link from 'next/link';
import PactDetailClient from './PactDetailClient';

const statusColors: Record<string, string> = {
  Draft: 'gray',
  Pending: 'yellow',
  Signed: 'green',
  Disputed: 'red',
  Resolved: 'blue',
  Cancelled: 'dark',
};

interface Props {
  params: { pactId: string };
}

export default async function PactDetailPage({ params }: Props) {
  const session = await auth();
  
  if (!session) {
    return (
      <Container size="md" py="xl">
        <Text>Будь ласка, увійдіть для перегляду угоди</Text>
      </Container>
    );
  }

  const userId = (session.user as { id: string }).id;

  let pact;
  try {
    pact = await getPact(params.pactId);
  } catch {
    return (
      <Container size="md" py="xl">
        <Text>Угода не знайдена</Text>
      </Container>
    );
  }

  return <PactDetailClient pact={pact} userId={userId} />;
}
