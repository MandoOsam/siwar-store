import '@/styles/globals.css';
import { Playfair_Display, Aref_Ruqaa, Tajawal, Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/ThemeContext';
import { StoreProvider } from '@/lib/StoreContext';
import { ToastProvider } from '@/lib/ToastContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-en-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  variable: '--font-ar-heading',
  weight: ['400', '700'],
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-ar-body',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-en-body',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'SIWAR | سِوار',
  description: 'إكسسوارات نسائية أنيقة - أساور، خواتم، وسلاسل',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${playfair.variable} ${arefRuqaa.variable} ${tajawal.variable} ${inter.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <StoreProvider>
              <ToastProvider>{children}</ToastProvider>
            </StoreProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
