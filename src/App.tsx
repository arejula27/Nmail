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
        <MailProvider>
          <RouterProvider router={router} />
        </MailProvider>
      </UIProvider>
    </>
  );
}

export default App;
