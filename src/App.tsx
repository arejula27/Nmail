import {
  createBrowserRouter,
  Navigate,
  Route,
  RouteObject,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { MailProvider } from "./context/mail";
import { UIProvider } from "./context/UI/service/UIProvider";
import InboxPage from "./ui/pages/inbox";
import DraftPage from "./ui/pages/drafts/index";
import ContactsPage from "./ui/pages/contacts";
import SentPage from "./ui/pages/sent/index";
import { RelayProvider } from "./context/relays/services/Relay";
import SettingsPage from "./ui/pages/settings/index";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="inbox" replace />,
  },
  {
    path: "/inbox",
    element: <InboxPage />,
  },
  {
    path: "/drafts",
    element: <DraftPage />,
  },
  {
    path: "/sent",
    element: <SentPage />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

const router = createBrowserRouter(
  routes.map(({ path, element }, i) => {
    return { path, element };
  })
);
function App() {
  return (
    <>
      <UIProvider>
        <RelayProvider>
          <MailProvider>
            <RouterProvider router={router} />
          </MailProvider>
        </RelayProvider>
      </UIProvider>
    </>
  );
}

export default App;
