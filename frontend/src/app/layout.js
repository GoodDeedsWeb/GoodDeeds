import "./globals.css";

export const metadata = {
  title: "Good Deeds"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
