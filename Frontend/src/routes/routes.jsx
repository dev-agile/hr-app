import React, { useState } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../scenes/login";
import AddTeam from "../scenes/team/addTeam";
import Contacts from "../scenes/contacts";
import Invoices from "../scenes/invoices";
import Form from "../scenes/form";
import Bar from "../scenes/bar";
import Pie from "../scenes/pie";
import Line from "../scenes/line";
import FAQ from "../scenes/faq";
import Calendar from "../scenes/calendar/calendar";
import Geography from "../scenes/geography";
import Dashboard from "../scenes/dashboard";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

const ProtectedRoute = ({ element }) => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const getAccessToken = () => localStorage.getItem("access_token");
  const isAuthenticated = !!getAccessToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            {element}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const RootRoute = () => {
  const getAccessToken = () => localStorage.getItem("access_token");
  const isAuthenticated = !!getAccessToken();
  if (isAuthenticated) {
    return <ProtectedRoute element={<Dashboard />} />;
  } else {
    return <Login />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/team",
    children: [
      { path: "addTeam", element: <ProtectedRoute element={<AddTeam />} /> },
      { path: "viewTeam", element: <ProtectedRoute element={<Form />} /> },
    ],
  },
  {
    path: "/contacts",
    element: <ProtectedRoute element={<Contacts />} />,
  },
  {
    path: "/invoices",
    element: <ProtectedRoute element={<Invoices />} />,
  },
  {
    path: "/form",
    element: <ProtectedRoute element={<Form />} />,
  },
  {
    path: "/bar",
    element: <ProtectedRoute element={<Bar />} />,
  },
  {
    path: "/pie",
    element: <ProtectedRoute element={<Pie />} />,
  },
  {
    path: "/line",
    element: <ProtectedRoute element={<Line />} />,
  },
  {
    path: "/faq",
    element: <ProtectedRoute element={<FAQ />} />,
  },
  {
    path: "/calendar",
    element: <ProtectedRoute element={<Calendar />} />,
  },
  {
    path: "/geography",
    element: <ProtectedRoute element={<Geography />} />,
  },
]);

export default router;
