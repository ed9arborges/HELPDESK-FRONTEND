
import { Header } from './components/Header'
import {Authentication} from "./components/Authentication"
import './App.css'
import { StrictMode } from 'react'
import Icon from "./components/icon"
import SpinnerIcon from "./assets/icons/spinner.svg?react"

function App() {
 

  return (
    <StrictMode>
      <Header/>
      <Authentication/>
      <Icon svg={SpinnerIcon} className="fill-feedback-done" animate/>
    </StrictMode>    
  )
}

export default App
