import { getPactByInviteToken } from '@/lib/actions/pact';
import { auth } from '@/auth';
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
      <div className="max-w-sm mx-auto py-12 px-4">
        <div className="border rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-red-600">Запрошення недійсне</h2>
          <p className="text-gray-500 text-center mt-4">
            Це запрошення більше не дійсне або було використано.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/" className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg">
              На головну
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (pact.status !== 'Pending') {
    return (
      <div className="max-w-sm mx-auto py-12 px-4">
        <div className="border rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-red-600">Угода недоступна</h2>
          <p className="text-gray-500 text-center mt-4">
            Ця угода більше не приймає нових учасників (статус: {pact.status})
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/" className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg">
              На головну
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <InviteClient pact={pact} token={params.token} />;
}
