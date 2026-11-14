import "./globals.css";
import "@/styles/reset.css";
import "@/styles/variables.css";

export const metadata = {
  title: "판다마켓",
  description: "일상의 모든 물건을 거래해보세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
