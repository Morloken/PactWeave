'use client';

import { Container, Title, Text, Button, Paper, Group, Badge, Stack, Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  pact: {
    _id: string;
    title: string;
    status: string;
    initiatorId: string;
    counterpartyId: string | null;
    customFields: Array<{
      fieldId: string;
      name: string;
      type: string;
      value: unknown;
      isRequired: boolean;
    }>;
    initiator: { name: string | null; image: string | null } | null;
    counterparty: { name: string | null; image: string | null } | null;
  };
  userId: string;
}

const statusColors: Record<string, string> = {
  Draft: 'gray',
  Pending: 'yellow',
  Signed: 'green',
  Disputed: 'red',
  Resolved: 'blue',
  Cancelled: 'dark',
};

export default function PactDetailClient({ pact, userId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const isInitiator = pact.initiatorId === userId;
  const isCounterparty = pact.counterpartyId === userId;
  const canInvite = pact.status === 'Draft' && isInitiator;
  const canJoin = pact.status === 'Pending' && !isInitiator && !pact.counterpartyId;
  const canSign = pact.status === 'Pending' && isCounterparty;
  const canCancel = (pact.status === 'Draft' || pact.status === 'Pending') && (isInitiator || pact.status === 'Draft');

  const handleSendInvite = async () => {
    setLoading('invite');
    try {
      const { sendPactInvite } = await import('@/lib/actions/pact');
      const result = await sendPactInvite(pact._id);
      notifications.show({
        title: 'Запрошення надіслано',
        message: `Посилання: ${window.location.origin}/pact/invite/${result.inviteToken}`,
        color: 'green',
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: 'Помилка',
        message: error instanceof Error ? error.message : 'Невідома помилка',
        color: 'red',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleJoin = async () => {
    setLoading('join');
    try {
      const { joinPact } = await import('@/lib/actions/pact');
      await joinPact(pact._id);
      notifications.show({
        title: 'Успіх',
        message: 'Ви приєдналися до угоди',
        color: 'green',
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: 'Помилка',
        message: error instanceof Error ? error.message : 'Невідома помилка',
        color: 'red',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleSign = async () => {
    setLoading('sign');
    try {
      const { signPact } = await import('@/lib/actions/pact');
      await signPact(pact._id);
      notifications.show({
        title: 'Успіх',
        message: 'Угода підписана',
        color: 'green',
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: 'Помилка',
        message: error instanceof Error ? error.message : 'Невідома помилка',
        color: 'red',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    setLoading('cancel');
    try {
      const { cancelPact } = await import('@/lib/actions/pact');
      await cancelPact(pact._id);
      notifications.show({
        title: 'Угода скасована',
        message: 'Угода була скасована',
        color: 'yellow',
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: 'Помилка',
        message: error instanceof Error ? error.message : 'Невідома помилка',
        color: 'red',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Container size="md" py="xl">
      <Group justify="space-between" mb="xl">
        <Group>
          <Button variant="subtle" onClick={() => router.push('/pacts')}>← Назад</Button>
          <Title order={1}>{pact.title}</Title>
        </Group>
        <Badge color={statusColors[pact.status]} size="lg">{pact.status}</Badge>
      </Group>

      <Stack gap="md">
        <Paper withBorder shadow="md" p="lg" radius="md">
          <Title order={3} mb="md">Сторони угоди</Title>
          
          <Group>
            <Card withBorder p="sm" radius="md" style={{ flex: 1 }}>
              <Text size="sm" c="dimmed">Ініціатор</Text>
              <Group>
                {pact.initiator?.image && (
                  <img src={pact.initiator.image} alt="" width={32} height={32} style={{ borderRadius: '50%' }} />
                )}
                <Text fw={500}>{pact.initiator?.name || 'Невідомо'}</Text>
              </Group>
            </Card>
            
            <Card withBorder p="sm" radius="md" style={{ flex: 1 }}>
              <Text size="sm" c="dimmed">Контрагент</Text>
              {pact.counterparty ? (
                <Group>
                  {pact.counterparty.image && (
                    <img src={pact.counterparty.image} alt="" width={32} height={32} style={{ borderRadius: '50%' }} />
                  )}
                  <Text fw={500}>{pact.counterparty.name || 'Невідомо'}</Text>
                </Group>
              ) : (
                <Text c="dimmed" fs="italic">Очікує приєднання</Text>
              )}
            </Card>
          </Group>
        </Paper>

        <Paper withBorder shadow="md" p="lg" radius="md">
          <Title order={3} mb="md">Поля угоди</Title>
          
          {pact.customFields.length === 0 ? (
            <Text c="dimmed">Полів немає</Text>
          ) : (
            <Stack>
              {pact.customFields.map((field) => (
                <div key={field.fieldId}>
                  <Group justify="space-between">
                    <Text fw={500}>
                      {field.name}
                      {field.isRequired && <Text component="span" c="red"> *</Text>}
                    </Text>
                    <Badge variant="light">{field.type}</Badge>
                  </Group>
                  <Text c="dimmed">
                    {field.value !== null && field.value !== undefined 
                      ? String(field.value) 
                      : '—'}
                  </Text>
                </div>
              ))}
            </Stack>
          )}
        </Paper>

        <Paper withBorder shadow="md" p="lg" radius="md">
          <Title order={3} mb="md">Дії</Title>
          
          <Group>
            {canInvite && (
              <Button onClick={handleSendInvite} loading={loading === 'invite'}>
                Надіслати запрошення
              </Button>
            )}

            {canJoin && (
              <Button onClick={handleJoin} loading={loading === 'join'}>
                Приєднатися до угоди
              </Button>
            )}

            {canSign && (
              <Button onClick={handleSign} loading={loading === 'sign'} color="green">
                Підписати угоду
              </Button>
            )}

            {canCancel && (
              <Button onClick={handleCancel} loading={loading === 'cancel'} color="red" variant="light">
                Скасувати угоду
              </Button>
            )}

            {pact.status === 'Signed' && (
              <Text c="dimmed">Ця угода підписана і не може бути змінена</Text>
            )}
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
