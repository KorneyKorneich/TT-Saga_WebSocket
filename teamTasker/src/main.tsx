import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App/App.tsx"
import "./styles/index.scss"
import ThemeProvider from "src/App/providers/ThemeProvider/ui/ThemeProvider.tsx";
import {Provider} from "react-redux";
import {store} from "src/App/providers/storeProvider/store.ts";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {LandingPage, Login, ProjectCreatePage, SingIn, TaskCreatePage} from "src/pages";
import {ProjectsPage} from "src/pages/ProjectsPage/ProjectsPage.tsx";
import {Project} from "src/entities/Project/ui/Project.tsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "authorization",
                children:[
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "singIn",
                        element: <SingIn />
                    },
                ]
            },
            {
                path: "hello",
                element: <LandingPage />
            },
            {
                path: "newProject",
                element: <ProjectCreatePage />
            },
            {
                path: "addTasksToProject/:projectId",
                element: <TaskCreatePage />
            },
            {
                path: "workspace",
                element: <ProjectsPage/>
            },
            {
                path: "workspace/:projectId",
                element: <Project />
            }


            // {
            //     path: "projects",
            //     element:
            // }
            // {
            //     path: "";
            // }
        ]
    },



])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
          <Provider store={store}>
              <ThemeProvider>
                  <RouterProvider router={router}/>
              </ThemeProvider>
          </Provider>
  </React.StrictMode>
)

