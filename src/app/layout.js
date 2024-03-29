import Nav from "./Components/Nav";
import { AuthProvider } from "../../context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Generated by create next app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
