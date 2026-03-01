'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/app/toast';

interface CustomField {
  fieldId: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  value: unknown;
  isRequired: boolean;
}

export default function NewPactPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState<CustomField[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (!title.trim()) {
      showToast('Введіть назву угоди');
      return;
    }

    setLoading(true);
    try {
      const { createPact } = await import('@/lib/actions/pact');
      const result = await createPact({
        title: title,
        customFields: fields,
      });
      
      showToast('Угода створена!');
      router.push(`/pacts/${result.pactId}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Створити угоду</h1>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назва угоди
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введіть назву угоди"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Поля угоди
                </label>
                
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.fieldId} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) => updateField(index, 'name', e.target.value)}
                          placeholder="Назва поля"
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none"
                        />
                        <select
                          value={field.type}
                          onChange={(e) => updateField(index, 'type', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none"
                        >
                          <option value="text">Текст</option>
                          <option value="number">Число</option>
                          <option value="date">Дата</option>
                          <option value="boolean">Так/Ні</option>
                          <option value="currency">Валюта</option>
                        </select>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.isRequired}
                            onChange={(e) => updateField(index, 'isRequired', e.target.checked)}
                            className="w-4 h-4 text-violet-600 rounded focus:ring-violet-600"
                          />
                          <span className="text-sm text-gray-600">Обов&apos;язкове</span>
                        </label>
                      </div>
                      <button
                        onClick={() => removeField(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addField}
                  className="mt-4 w-full py-4 border-2 border-dashed border-violet-300 text-violet-600 rounded-lg hover:bg-violet-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Додати поле
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  Створити угоду
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
