import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.scss"
import ThemeProvider from "src/App/providers/ThemeProvider/ui/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { store } from "src/App/providers/storeProvider/store.ts";
import {
    RouterProvider,
} from "react-router-dom";
import { getRouter } from "src/router/router.tsx";


const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)

