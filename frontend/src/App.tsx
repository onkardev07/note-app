import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import Dashboard from "./_root/pages/Dashboard";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      {/* <Toaster /> */}
    </main>
  );
};

export default App;
