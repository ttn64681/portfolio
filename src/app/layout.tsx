import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import ReactLenis from 'lenis/react';
import './globals.css';

const pixelify = Pixelify_Sans({
  variable: '--font-pixelify', // generates a CSS variable named --font-pixelify
  subsets: ['latin'],
  display: 'swap', // Shows fallback font until custom font loads
  preload: true, // Preloads the font for better performance
  fallback: ['Lato', 'sans-serif'],
});

// Local fonts with optimized loading
const pixelMono = localFont({
  variable: '--font-pixel-mono',
  src: '../../public/fonts/VCR_OSD_MONO_1.001.ttf',
  display: 'swap',
  preload: false, // Preload critical fonts
  fallback: ['Lato', 'sans-serif'], // Fallback font
});

const pixelRetron = localFont({
  variable: '--font-pixel-retron',
  src: '../../public/fonts/Retron2000.ttf',
  display: 'swap',
  preload: true, // Don't preload non-critical fonts
  fallback: ['Lato', 'sans-serif'],
});

const pixelTerminal = localFont({
  variable: '--font-pixel-terminal',
  src: '../../public/fonts/terminal-grotesque.ttf',
  display: 'swap',
  preload: false, // Don't preload non-critical fonts
  fallback: ['Lato', 'sans-serif'],
});

const pixelHeadline = localFont({
  variable: '--font-pixel-headline',
  src: '../../public/fonts/AtlantisHeadline-Bold.ttf',
  display: 'swap',
  preload: true, // Preload headline font as it's used prominently
  fallback: ['Lato', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Thai Nguyen Portfolio',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${pixelify.variable} ${pixelMono.variable} ${pixelRetron.variable} ${pixelTerminal.variable} ${pixelHeadline.variable} antialiased`}
      >
        <ReactLenis root options={{ lerp: 0.4 }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
