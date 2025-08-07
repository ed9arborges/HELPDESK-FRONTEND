
import { Header } from './components/Header'
import {Authentication} from "./components/Authentication"
import './App.css'
import { StrictMode } from 'react'

function App() {
 

  return (
    <StrictMode>
      <Header/>
      <Authentication/>
    </StrictMode>    
  )
}

export default App
