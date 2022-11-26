import { MailProvider } from "./context/mail";
import { RelayProvider } from "./context/relays/services/Relay";
import { UIProvider } from "./context/UI/service";
import InboxPage from "./ui/pages/inbox";

function App() {
  return (
    <>
      <UIProvider>
        <MailProvider>
          <InboxPage />
        </MailProvider>
      </UIProvider>
    </>
  );
}

export default App;
