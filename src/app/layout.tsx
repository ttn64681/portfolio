import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ReactLenis from 'lenis/react';
import JsonLd from '@/components/seo/JsonLd';
import { createPageMetadata } from '@/lib/metadata';
import { getSiteUrl, siteConfig } from '@/lib/site';
import './globals.css';

const pixelify = localFont({
  variable: '--font-pixelify',
  src: '../../public/fonts/PixelifySans-VariableFont_wght.ttf',
  display: 'swap',
  preload: true,
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
  metadataBase: new URL(getSiteUrl()),
  ...createPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
  }),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  authors: [{ name: siteConfig.author, url: siteConfig.links.github }],
  creator: siteConfig.author,
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  // Readonly so can't mutate props
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${pixelify.variable} ${pixelMono.variable} ${pixelRetron.variable} ${pixelTerminal.variable} ${pixelHeadline.variable} antialiased`}
      >
        <JsonLd />
        <ReactLenis root options={{ lerp: 0.4 }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
