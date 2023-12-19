import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './styles/index.scss'
import ThemeProvider from "src/App/providers/ThemeProvider/ui/ThemeProvider.tsx";
import {Provider} from "react-redux";
import {store} from "src/App/providers/storeProvider/store.ts";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Login, SingIn} from "src/pages";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: 'singIn',
        element: <SingIn />
    }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <Provider store={store}>
              <ThemeProvider>
                  <RouterProvider router={router}/>
              </ThemeProvider>
          </Provider>
  </React.StrictMode>
)

