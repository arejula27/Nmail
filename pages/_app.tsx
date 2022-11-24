import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MailProvider } from "../context/mail";
import { UIProvider } from "../context/UI";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <MailProvider>
        <Component {...pageProps} />
      </MailProvider>
    </UIProvider>
  );
}
