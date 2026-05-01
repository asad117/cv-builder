import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
// export const metadata = {
//   title: 'CV.AI | Smart Resume Builder',
//   description: 'The minimalist AI tool for professional resume formatting.',
//   icons: {
//     icon: '/favicon.ico', // We will set this up next
//     apple: '/apple-touch-icon.png',
//   },
// };
export const metadata = {
  title: 'CV.AI | Smart Resume Builder',
  description: 'The minimalist AI tool for professional resume formatting.',
  icons: {
    icon: '/favicon.svg', 
    apple: '/logo.svg',  
  },
};