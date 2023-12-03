import styles from './App.module.scss'
import { Sidebar} from "../shared";
import {useTheme} from "src/App/providers/ThemeProvider/lib/useTheme.ts";

function App() {
    const Theme = useTheme();

  return (
    <div className={`${styles.app} ${Theme.theme}`} >
      <Sidebar />
    </div>
  )
}

export default App
