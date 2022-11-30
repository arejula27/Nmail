import { RouterProvider } from "react-router-dom";

import { UIProvider } from "./core/UI/service/UIProvider";
import { MailProvider } from "./ui/hooks/mail/MailProvider";
import { RelayProvider } from "./ui/hooks/relays/Relay";
import { router } from "./router";
import { ProfileProvider } from "./ui/hooks/profile/ProfileProvider";

function App() {
  return (
    <>
      <UIProvider>
        <ProfileProvider>
          <RelayProvider>
            <MailProvider>
              <RouterProvider router={router} />
            </MailProvider>
          </RelayProvider>
        </ProfileProvider>
      </UIProvider>
    </>
  );
}

export default App;
