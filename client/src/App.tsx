import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/users/auth/LoginPage";
import { useAuth } from "./context/UserContext";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminMiddleware from "./middleware/AdminMiddleware";
import UploadCsvFile from "./pages/admin/dashboard/UploadCsvFile";
import Customer from "./pages/admin/dashboard/Customer";

function App() {
  const [auth] = useAuth();
  
  const admiMiddle  = auth?.user?.role =='admin';
  
  return (
    <div>
      <ToastContainer aria-label="notification" />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <AdminMiddleware isAdmin={admiMiddle}>
               < Dashboard/>
            </AdminMiddleware>} />
            <Route path="/dashboard/customers" element={
              <AdminMiddleware isAdmin={admiMiddle}>
               < Customer/>
            </AdminMiddleware>} />
            <Route path="/dashboard/upload/csv_file" element={
              <AdminMiddleware isAdmin={admiMiddle}>
               < UploadCsvFile/>
            </AdminMiddleware>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
