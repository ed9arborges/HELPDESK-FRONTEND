
import { Header } from './components/Header'
import {Authentication} from "./components/Authentication"
import './App.css'
import { StrictMode } from 'react'
import Icon from "./components/icon"
import SpinnerIcon from "./assets/icons/spinner.svg?react"
import TrashIcon from "./assets/icons/trash.svg?react"
import CircleIcon from "./assets/icons/circle-check.svg?react"
import Badge from "./components/badge"

function App() {
 

  return (
    <StrictMode>
      
      <div>
        <Header/>       
        <Icon svg={SpinnerIcon} className="fill-feedback-done" animate/>
        <Icon svg={TrashIcon} className="fill-feedback-done" />
        <div>
          <Badge variant="secondary" iconAdd="done">
         
          Aberto</Badge>

          <Badge variant="primary" iconAdd="open">Encerrado</Badge>
        </div>
        <Authentication/>
      </div>
    </StrictMode>    
  )
}

export default App
