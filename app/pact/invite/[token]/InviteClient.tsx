'use client';

import { Container, Title, Text, Button, Paper, Stack, Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  pact: {
    _id: string;
    title: string;
    status: string;
    initiator: { name: string | null; image: string | null } | null;
  };
}

export default function InviteClient({ pact }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    try {
      const { joinPact } = await import('@/lib/actions/pact');
      await joinPact(pact._id);
      notifications.show({
        title: 'Успіх',
        message: 'Ви приєдналися до угоди',
        color: 'green',
      });
      router.push(`/pacts/${pact._id}`);
    } catch (error) {
      notifications.show({
        title: 'Помилка',
        message: error instanceof Error ? error.message : 'Невідома помилка',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Title order={2} ta="center">Запрошення до угоди</Title>
        
        <Stack mt="xl">
          <Card withBorder p="md" radius="md">
            <Text fw={500} size="lg">{pact.title}</Text>
            <Text c="dimmed" size="sm" mt="xs">
              Ініціатор: {pact.initiator?.name || 'Невідомо'}
            </Text>
          </Card>

          <Text ta="center" c="dimmed">
            Ви були запрошені приєднатися до цієї угоди. Після приєднання ви зможете її підписати.
          </Text>

          <Button onClick={handleJoin} loading={loading} fullWidth size="lg">
            Приєднатися до угоди
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
