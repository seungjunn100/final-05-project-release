import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
      weight: '45 920',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});
