import { RouterProvider } from "react-router-dom";

import { UIProvider } from "./core/UI/service/UIProvider";
import { MailProvider } from "./ui/hooks/mail/MailProvider";
import { RelayProvider } from "./ui/hooks/relays/Relay";
import { router } from "./router";
import { AuthProvider } from "./ui/hooks/auth/AuthProvider";

function App() {
  return (
    <>
      <UIProvider>
        <AuthProvider>
          <RelayProvider>
            <MailProvider>
              <RouterProvider router={router} />
            </MailProvider>
          </RelayProvider>
        </AuthProvider>
      </UIProvider>
    </>
  );
}

export default App;
