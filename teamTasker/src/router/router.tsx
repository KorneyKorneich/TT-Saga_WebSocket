import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "src/shared/Loader/Loader.tsx";
import App from "src/App/App.tsx";

// const App = lazy(() => import("src/App/App.tsx"));
const LandingPage = lazy(() => import("src/pages/LandingPage/LandingPage"));
const ProjectsPage = lazy(() => import("src/pages/ProjectsPage/ProjectsPage"));
const Project = lazy(() => import("src/entities/Project/ui/Project.tsx"));
const ProtectedRoute = lazy(() => import("src/shared/ProtectedRoute/ProtectedRoute.tsx"));
const Login = lazy(() => import("src/entities/User/ui/Login/Login.tsx"));
const SingUp = lazy(() => import("src/entities/User/ui/SingUp/SingUp.tsx"));
const ProjectCreatePage = lazy(() => import("src/pages/ProjectsPage/ProjectCreatePage"));


export const getRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element:
                <App/>,
            children: [
                {
                    path: "auth",
                    children: [
                        {
                            path: "login",
                            element: <Suspense fallback={<Loader/>}><Login/></Suspense>
                        },
                        {
                            path: "singUp",
                            element: <Suspense fallback={<Loader/>}><SingUp/></Suspense>
                        },
                    ]
                },
                {
                    path: "hello",
                    element: <Suspense fallback={<Loader/>}><LandingPage/></Suspense>
                },
                {
                    path: "newProject",
                    element:
                        <ProtectedRoute>
                            <Suspense fallback={<Loader/>}><ProjectCreatePage/></Suspense>
                        </ProtectedRoute>
                },
                {
                    path: "workspace",
                    element:
                        <ProtectedRoute>
                            <Suspense fallback={<Loader/>}><ProjectsPage/></Suspense>
                        </ProtectedRoute>
                },
                {
                    path: "workspace/:projectId",
                    element:
                        <ProtectedRoute>
                            <Suspense fallback={<Loader/>}><Project/></Suspense>
                        </ProtectedRoute>
                }
            ]
        },
    ])
}
