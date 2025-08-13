import { Header } from "./components/Header"
import { Authentication } from "./components/Authentication"
import "./App.css"
import { StrictMode } from "react"
import Icon from "./components/icon"
import Button from "./components/button"
import Tag from "./components/tag"
import TagTime from "./components/tag-time"
import SpinnerIcon from "./assets/icons/spinner.svg?react"
import TrashIcon from "./assets/icons/trash.svg?react"
import CircleIcon from "./assets/icons/circle-check.svg?react"
import XIcon from "./assets/icons/x.svg?react"
import PenIcon from "./assets/icons/pen-line.svg?react"

function App() {
  return (
    <StrictMode>
      <div className="grid gap-10 bg-gray-600">
        <Header />
        <Icon svg={SpinnerIcon} className="fill-feedback-done" animate />
        <Icon svg={TrashIcon} className="fill-feedback-done" />
        <div className="flex gap-6 m-5">
          <Tag variant="new" iconAdd={SpinnerIcon}>
            Aberto
          </Tag>

          <Tag variant="danger" iconAdd={TrashIcon}></Tag>
          <Tag variant="success" iconAdd={TrashIcon}>
            Encerrado
          </Tag>
        </div>
        <div className="flex gap-6 m-5">
          <Button icon={TrashIcon}>New Button</Button>
          <Button icon={PenIcon} size="sm">Label</Button>
          <Button icon={PenIcon} size="sm"/>
          <Button icon={TrashIcon} variant="secundary" size="sm">New Button</Button>
          <Button icon={PenIcon} variant="secundary" size="md">Label</Button>
          <Button icon={TrashIcon} variant="link" size="linksm">New Button</Button>
          <Button icon={PenIcon} variant="link" size="linkmd">Label</Button>
        </div>

         <div className="flex gap-6 m-5">
          <TagTime >Label</TagTime>
          <TagTime variant="selected" iconAdd={XIcon}>Label</TagTime>
          <TagTime variant="read">Label</TagTime>
          
        </div>

        <Authentication />
      </div>
    </StrictMode>
  )
}

export default App
