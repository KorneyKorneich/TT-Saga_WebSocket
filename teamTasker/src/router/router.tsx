import { createBrowserRouter } from "react-router-dom";
import App from "src/App/App.tsx";
import { LandingPage, Login, ProjectCreatePage, SingIn } from "src/pages";
import { ProjectsPage } from "src/pages/ProjectsPage/ProjectsPage.tsx";
import { Project } from "src/entities/Project/ui/Project.tsx";
import { ProtectedRoute } from "src/shared/ProtectedRoute/ProtectedRoute.tsx";

export const getRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "authorization",
                    children: [
                        {
                            path: "login",
                            element: <Login/>
                        },
                        {
                            path: "singIn",
                            element: <SingIn/>
                        },
                    ]
                },
                {
                    path: "hello",
                    element: <LandingPage/>
                },
                {
                    path: "newProject",
                    element:
                        <ProtectedRoute>
                            <ProjectCreatePage/>
                        </ProtectedRoute>
                },
                {
                    path: "workspace",
                    element:
                        <ProtectedRoute>
                            <ProjectsPage/>
                        </ProtectedRoute>
                },
                {
                    path: "workspace/:projectId",
                    element:
                        <ProtectedRoute>
                            <Project/>
                        </ProtectedRoute>
                }
            ]
        },
    ])
}
