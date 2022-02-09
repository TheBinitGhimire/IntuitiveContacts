import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import MyProfilePage from "./pages/MyProfile";
import MyContactsPage from "./pages/MyContacts";
import MyContactProfilePage from "./pages/MyContactsProfile";
import CreateNewContactPage from "./pages/CreateNewContact";
import ModifyExistingContactPage from "./pages/ModifyExistingContact";
import DeleteExistingContactPage from "./pages/DeleteExistingContact";
import LogoutPage from "./pages/Logout";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./components/reusable/RequireAuth";

function App() {
  useEffect(() => {
    document.title = "IntuitiveContacts";
    document.body.classList.add("text-gray-200");
    document.body.classList.add("bg-gray-900");
  }, []);

  return (
    <Provider store={store}>
      <div className="flex items-center">
        <div className="h-screen w-full flex antialiased">
          <div className="flex-1 flex flex-col">
            <main>
              <Routes>
                <Route element={<Outlet />}>
                  <Route path="/" element={<SignInPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                  <Route
                    path="profile"
                    element={
                      <RequireAuth>
                        <MyProfilePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="contacts"
                    element={
                      <RequireAuth>
                        <MyContactsPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="contacts/:id"
                    element={
                      <RequireAuth>
                        <MyContactProfilePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="contacts/create"
                    element={
                      <RequireAuth>
                        <CreateNewContactPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="contacts/modify/:id"
                    element={
                      <RequireAuth>
                        <ModifyExistingContactPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="contacts/delete/:id"
                    element={
                      <RequireAuth>
                        <DeleteExistingContactPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="logout"
                    element={
                      <RequireAuth>
                        <LogoutPage />
                      </RequireAuth>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
