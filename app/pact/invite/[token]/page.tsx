import { Container, Title, Text, Button, Paper, Center } from '@mantine/core';
import { getPactByInviteToken, joinPact } from '@/lib/actions/pact';
import { auth } from '@/auth';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import InviteClient from './InviteClient';

interface Props {
  params: { token: string };
}

export default async function InvitePage({ params }: Props) {
  const session = await auth();

  let pact;
  try {
    pact = await getPactByInviteToken(params.token);
  } catch {
    return (
      <Container size="sm" py="xl">
        <Paper withBorder shadow="md" p="xl" radius="md">
          <Title order={2} ta="center" c="red">Запрошення недійсне</Title>
          <Text c="dimmed" ta="center" mt="md">
            Це запрошення більше не дійсне або було використано.
          </Text>
          <Center mt="xl">
            <Link href="/">
              <Button>На головну</Button>
            </Link>
          </Center>
        </Paper>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container size="sm" py="xl">
        <Paper withBorder shadow="md" p="xl" radius="md">
          <Title order={2} ta="center">Вхід до PactWeave</Title>
          <Text c="dimmed" ta="center" mt="md">
            Увійдіть, щоб приєднатися до угоди
          </Text>
          <Center mt="xl">
            <form action={async () => {
              'use server';
              await signIn('google', { redirectTo: `/pact/invite/${params.token}` });
            }}>
              <Button type="submit">Увійти через Google</Button>
            </form>
          </Center>
        </Paper>
      </Container>
    );
  }

  if (pact.status !== 'Pending') {
    return (
      <Container size="sm" py="xl">
        <Paper withBorder shadow="md" p="xl" radius="md">
          <Title order={2} ta="center" c="red">Угода недоступна</Title>
          <Text c="dimmed" ta="center" mt="md">
            Ця угода більше не приймає нових учасників (статус: {pact.status})
          </Text>
          <Center mt="xl">
            <Link href="/">
              <Button>На головну</Button>
            </Link>
          </Center>
        </Paper>
      </Container>
    );
  }

  return <InviteClient pact={pact} />;
}
