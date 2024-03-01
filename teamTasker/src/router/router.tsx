import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const App = lazy(() => import("src/App/App.tsx"));
const LandingPage = lazy(() => import("src/pages/LandingPage/LandingPage"));
const ProjectsPage = lazy(() => import("src/pages/ProjectsPage/ProjectsPage"));
const Project = lazy(() => import("src/entities/Project/ui/Project.tsx"));
const ProtectedRoute = lazy(() => import("src/shared/ProtectedRoute/ProtectedRoute.tsx"));
const Login = lazy(() => import("src/entities/User/ui/Login/Login.tsx"));
const SingIn = lazy(() => import("src/entities/User/ui/SingIn/SingIn.tsx"));
const ProjectCreatePage = lazy(() => import("src/pages/ProjectsPage/ProjectCreatePage"));


export const getRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element:
                <Suspense fallback={<>Loading...</>}>
                    <App/>
                </Suspense>,
            children: [
                {
                    path: "authorization",
                    children: [
                        {
                            path: "login",
                            element: <Suspense fallback={<>Loading...</>}><Login/></Suspense>
                        },
                        {
                            path: "singIn",
                            element: <Suspense fallback={<>Loading...</>}><SingIn/></Suspense>
                        },
                    ]
                },
                {
                    path: "hello",
                    element: <Suspense fallback={<>Loading...</>}><LandingPage/></Suspense>
                },
                {
                    path: "newProject",
                    element:
                        <ProtectedRoute>
                            <Suspense fallback={<>Loading...</>}><ProjectCreatePage/></Suspense>
                        </ProtectedRoute>
                },
                {
                    path: "workspace",
                    element:
                        <ProtectedRoute>
                            <Suspense fallback={<>Loading...</>}><ProjectsPage/></Suspense>
                        </ProtectedRoute>
                },
                {
                    path: "workspace/:projectId",
                    element:
                        <ProtectedRoute>
                            <Suspense fallback={<>Loading...</>}><Project/></Suspense>
                        </ProtectedRoute>
                }
            ]
        },
    ])
}
