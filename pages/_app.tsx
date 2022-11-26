import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MailProvider } from "../context/mail";
import { UIProvider } from "../context/UI/service";
import { RelayProvider } from "../context/relays/services/Relay";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <RelayProvider>
        <MailProvider>
          <Component {...pageProps} />
        </MailProvider>
      </RelayProvider>
    </UIProvider>
  );
}
