'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X, ArrowLeft, Loader2, Sparkles, FileText } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/pacts')}
          className="p-2 hover:bg-violet-500/15 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-violet-300" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-white">Створити угоду</h1>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-violet-500/10 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-violet-200/80 mb-2">
              Назва угоди
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введіть назву угоди"
              className="w-full px-4 py-3 rounded-lg border border-violet-500/20 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all bg-slate-900/50 text-white placeholder-slate-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-violet-200/80 mb-3">
              Поля угоди
            </label>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.fieldId} className="flex items-start gap-4 p-5 rounded-lg bg-slate-900/40 border border-violet-500/5">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(index, 'name', e.target.value)}
                      placeholder="Назва поля"
                      className="px-4 py-3 rounded-lg border border-violet-500/20 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all bg-slate-900/50 text-white placeholder-slate-500"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateField(index, 'type', e.target.value)}
                      className="px-4 py-3 rounded-lg border border-violet-500/20 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all bg-slate-900/50 text-white"
                    >
                      <option value="text">Текст</option>
                      <option value="number">Число</option>
                      <option value="date">Дата</option>
                      <option value="boolean">Так/Ні</option>
                      <option value="currency">Валюта</option>
                    </select>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={field.isRequired}
                          onChange={(e) => updateField(index, 'isRequired', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-700 rounded-full peer-checked:bg-violet-600 transition-colors"></div>
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
                      </div>
                      <span className="text-sm text-slate-300">Обов&apos;язкове</span>
                    </label>
                  </div>
                  <button
                    onClick={() => removeField(index)}
                    className="p-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addField}
              className="mt-4 w-full py-4 border-2 border-dashed border-violet-500/20 text-violet-400/70 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/5 rounded-lg transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Додати поле
            </button>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => router.push('/pacts')}
              className="px-6 py-3 text-slate-300 hover:bg-slate-700/40 rounded-lg transition-colors font-medium"
            >
              Скасувати
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg transition-all font-medium flex items-center gap-2 disabled:opacity-50 shadow-md shadow-violet-500/15"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <Sparkles className="w-5 h-5" />
              Створити угоду
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
