import { cookies } from 'next/headers';
import HeaderInner from './HeaderInner';

export default async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('accessToken');

  return <HeaderInner isLoggedIn={isLoggedIn} />;
}
