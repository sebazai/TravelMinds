'use client';
import localFont from 'next/font/local';
import './globals.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { NavBar } from '@/components/NavBar/NavBar';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const metadata = {
  title: 'TravelMind',
  description: 'A travel app that helps you find the best places to visit',
};
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const colorTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      main: '#2C2B28',
    },
    darkGrey: {
      main: '#272623',
    },
    lightGrey: {
      main: '#272623',
    },
    orange: {
      main: '#A3512B',
    },
    text: {
      primary: '#E5E5E2',
      secondary: '#7B6DBB',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={colorTheme}>
        <CssBaseline />
        <html lang="en">
          <body
            style={{ height: '100vh' }}
            className={`${geistSans.variable} ${geistMono.variable}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              {children}
              <NavBar />
            </div>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
