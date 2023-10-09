import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListOfProductsPage } from "./pages/ListOfProductsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminPage } from "./pages/AdminPage";
import { createContext, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { initializeIcons } from "@fluentui/react";
initializeIcons();

export const UserContext = createContext<LoggedUser | null>(null);

export interface LoggedUser {
  isAdmin: boolean;
  firstName: String;
  address: String;
}

export const MainRoutes = () => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  return (
    <UserContext.Provider value={loggedUser}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ListOfProductsPage onLogOut={() => setLoggedUser(null)} />
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSucces={(user: LoggedUser | null) => {
                  setLoggedUser(user);
                }}
              />
            }
          />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
