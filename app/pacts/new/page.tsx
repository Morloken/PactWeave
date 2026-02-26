'use client';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Container, Title, TextInput, Button, Group, Paper, Select, Stack, Text, ActionIcon, Checkbox, NumberInput, Switch } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createPact } from '@/lib/actions/pact';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface CustomField {
  fieldId: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  value: unknown;
  isRequired: boolean;
}

export default function NewPactPage() {
  const router = useRouter();
  const [fields, setFields] = useState<CustomField[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
    },
    validate: {
      title: (value) => (value.length < 1 ? 'Введіть назву угоди' : null),
    },
  });

  const addField = () => {
    setFields([
      ...fields,
      { fieldId: uuidv4(), name: '', type: 'text', value: null, isRequired: false },
    ]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: keyof CustomField, value: unknown) => {
    const newFields = [...fields];
    (newFields[index] as unknown as Record<string, unknown>)[key] = value;
    setFields(newFields);
  };

  const handleSubmit = async () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    setLoading(true);
    try {
      const result = await createPact({
        title: form.values.title,
        customFields: fields,
      });
      
      notifications.show({
        title: 'Успіх',
        message: 'Угода створена',
        color: 'green',
      });
      
      router.push(`/pacts/${result.pactId}`);
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
    <Container size="md" py="xl">
      <Title order={1} mb="xl">Створити нову угоду</Title>

      <Paper withBorder shadow="md" p="lg" radius="md">
        <Stack>
          <TextInput
            label="Назва угоди"
            placeholder="Введіть назву"
            required
            {...form.getInputProps('title')}
          />

          <Text fw={500} size="sm">Поля угоди</Text>
          
          {fields.map((field, index) => (
            <Paper key={field.fieldId} p="sm" withBorder>
              <Group align="flex-end" grow>
                <TextInput
                  label="Назва поля"
                  placeholder="Назва"
                  value={field.name}
                  onChange={(e) => updateField(index, 'name', e.target.value)}
                />
                <Select
                  label="Тип"
                  data={[
                    { value: 'text', label: 'Текст' },
                    { value: 'number', label: 'Число' },
                    { value: 'date', label: 'Дата' },
                    { value: 'boolean', label: 'Так/Ні' },
                    { value: 'currency', label: 'Валюта' },
                  ]}
                  value={field.type}
                  onChange={(value) => updateField(index, 'type', value)}
                />
                <Checkbox
                  label="Обов'язкове"
                  checked={field.isRequired}
                  onChange={(e) => updateField(index, 'isRequired', e.currentTarget.checked)}
                />
                <ActionIcon color="red" variant="light" onClick={() => removeField(index)}>
                  ✕
                </ActionIcon>
              </Group>
            </Paper>
          ))}

          <Button variant="light" onClick={addField}>
            + Додати поле
          </Button>

          <Group justify="flex-end">
            <Button variant="default" onClick={() => router.back()}>
              Скасувати
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Створити угоду
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
