// src/app.routes.jsx --> (Routes Mapping)(Root & Routing Layer)
// Role: app.routes.jsx defines the path map (/login, /register, /). App.jsx wraps <RouterProvider> with <AuthProvider> so every route has access to the authentication state.

import { createBrowserRouter } from "react-router";                                  // React Router ka modern routing engine import kiya.
import Login from "./features/auth/pages/Login";                                            // Login page component laye.
import Register from "./features/auth/pages/Register";                                        // Register page component laye.
import Protected from "./features/auth/components/Protected";                                              // Wrapper component import kiya jo bina login kiye page access nahi karne deta.
import Home from "./features/interview/pages/Home";                                        // Dashboard view pages import kiye.
import Interview from "./features/interview/pages/interview";                                // interview view pages import kiye.
// import Home from "./pages/Home"; // ensure path matches your project structure
// import InterviewReport from "./features/interview/pages/InterviewReport";

export const router = createBrowserRouter([                   // Saare paths aur unke screens ki list define kardi.
    {
        path: "/Login",                          // URL me /Login aane par Login screen load hogi.
        element:<Login />
    },
    {
        path: "/register",
        element:<Register/>
    },
    {
        path: "/",                                        // Root path / ko Protected se wrap kiya, taaki sirf logged-in user hi Home dekh sake.
        element:<Protected><Home/></Protected>
    },
    {
        path: "/interview/:interviewId",                                       // : Dynamic interview screen jisme URL me interview ki unique id aayegi.
        element:<Protected><Interview/></Protected>
    }
])
