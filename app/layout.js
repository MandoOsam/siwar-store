import '@/styles/globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/ThemeContext';
import { StoreProvider } from '@/lib/StoreContext';
import { ToastProvider } from '@/lib/ToastContext';

export const metadata = {
  title: 'SIWAR | سِوار',
  description: 'إكسسوارات نسائية أنيقة - أساور، خواتم، وسلاسل',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
