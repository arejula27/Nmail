import { FC, PropsWithChildren } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ContactsPage from "./ui/pages/contacts";
import DraftPage from "./ui/pages/drafts";
import InboxPage from "./ui/pages/inbox";
import SentPage from "./ui/pages/sent";
import SettingsPage from "./ui/pages/settings";
import { LoginPage } from "./ui/pages/login/index";
import { ProfileProvider } from "./ui/hooks/profile/ProfileProvider";
import { useProfile } from "./ui/hooks/profile/ProfileContext";

const publicRoutes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Navigate to="inbox" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const protectedRoutes: RouteObject[] = [
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

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { privateKey, publicKey } = useProfile();

  if (null === privateKey || null === publicKey) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const routes = publicRoutes.concat(
  protectedRoutes.map((route) => {
    return {
      path: route.path,
      element: <ProtectedRoute children={route.element} />,
    };
  })
);

const router = createBrowserRouter(routes);

export { router };
