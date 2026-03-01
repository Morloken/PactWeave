import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { getMyPacts } from '@/lib/actions/pact';
import { FileText, Clock, CheckCircle, Plus } from 'lucide-react';

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  Draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Чернетка' },
  Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Очікує' },
  Signed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Підписано' },
  Disputed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Спір' },
  Resolved: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Вирішено' },
  Cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Скасовано' },
};

export default async function PactsPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }

  const pacts = await getMyPacts();

  const total = pacts.length;
  const pending = pacts.filter(p => p.status === 'Pending').length;
  const signed = pacts.filter(p => p.status === 'Signed').length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Всього угод</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Очікують підпису</p>
              <p className="text-2xl font-bold text-gray-900">{pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Завершені</p>
              <p className="text-2xl font-bold text-gray-900">{signed}</p>
            </div>
          </div>
        </div>
      </div>

      {pacts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Угод поки немає</h3>
          <p className="text-gray-500 mb-6">Створіть свою першу угоду</p>
          <Link
            href="/pacts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Створити угоду
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {pacts.map((pact) => {
            const style = statusStyles[pact.status] || statusStyles.Draft;
            return (
              <Link
                key={pact._id}
                href={`/pacts/${pact._id}`}
                className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-violet-200 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {pact.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Створено: {new Date(pact.createdAt).toLocaleDateString('uk-UA')}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
