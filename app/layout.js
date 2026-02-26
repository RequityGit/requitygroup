import './globals.css';

export const metadata = {
  title: 'Requity Group | Private Real Estate Investments',
  description: 'Requity is a vertically integrated real estate investment company that applies operational expertise to small-cap real estate. Over $150M in AUM.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
