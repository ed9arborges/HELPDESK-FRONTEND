
import { Header } from './components/Header'
import {Authentication} from "./components/Authentication"
import './App.css'
import { StrictMode } from 'react'
import Icon from "./components/icon"
import SpinnerIcon from "./assets/icons/spinner.svg?react"
import TrashIcon from "./assets/icons/trash.svg?react"
import CircleIcon from "./assets/icons/circle-check.svg?react"
import Tag from "./components/tag"

function App() {
 

  return (
    <StrictMode>
      
      <div>
        <Header/>       
        <Icon svg={SpinnerIcon} className="fill-feedback-done" animate/>
        <Icon svg={TrashIcon} className="fill-feedback-done" />
        <div>
          <Tag variant="new" iconAdd={SpinnerIcon}>
         
          Aberto</Tag>

          <Tag variant="danger" iconAdd={TrashIcon}></Tag>
          <Tag variant="success" iconAdd={TrashIcon}>Encerrado</Tag>
        </div>
        <Authentication/>
      </div>
    </StrictMode>    
  )
}

export default App
