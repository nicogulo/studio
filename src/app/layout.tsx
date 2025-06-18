import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Forever & Always | Nico ❤️ Trio Wedding',
  description: 'Join Nico and Trio as they celebrate their wedding. Find all the details and RSVP here.',
  openGraph: {
    title: 'Forever & Always | Nico ❤️ Trio Wedding',
    description: 'Join Nico and Trio as they celebrate their wedding. Find all the details and RSVP here.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }], // Placeholder, suggest creating an actual OG image
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
