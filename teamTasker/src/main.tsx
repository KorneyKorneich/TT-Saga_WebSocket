import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './styles/index.scss'
import ThemeProvider from "src/App/providers/ThemeProvider/ui/ThemeProvider.tsx";
import {Provider} from "react-redux";
import {store} from "src/App/providers/storeProvider/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider>
              <App />
          </ThemeProvider>
      </Provider>

  </React.StrictMode>,
)
