import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ViewPage from "./pages/ViewPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { RingLoader } from "react-spinners";
import { AppContextProvider, useAuthContext } from "./context/AppContext";
import { BasicLayOut } from "./pages/BasicLayOut";

const AppContent = () => {
  const { appLoading, isLoggedIn } = useAuthContext();

  if (appLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RingLoader size={80} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
          <Route element={<BasicLayOut />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/view/:productId" element={<ViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          </>
        ) : (
          <>
          <Route element={<BasicLayOut />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/view/:productId" element={<ViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
};

export default App;
