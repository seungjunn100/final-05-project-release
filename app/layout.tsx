import './globals.css';
import { pretendard } from './fonts';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://final-05-project.vercel.app/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="min-w-90">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
