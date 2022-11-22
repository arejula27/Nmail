import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MailProvider } from "../context/mail";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MailProvider>
      <Component {...pageProps} />
    </MailProvider>
  );
}
