

import { StrictMode } from "react"
import Icon from "../core-components/icon"
import { Button } from "../core-components//button"
import Tag from "@core-components/tag"
import TagTime from "../components/tag-time"
import InputText from "@core-components//input"
import InputSelect from "@core-components/input-select"
import Container from "@core-components/container"

import SpinnerIcon from "../assets/icons/spinner.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import CircleIcon from "../assets/icons/circle-check.svg?react"
import XIcon from "../assets/icons/x.svg?react"
import PenIcon from "../assets/icons/pen-line.svg?react"
import AlertIcon from "../assets/icons/circle-alert.svg?react"

export default function PageComponents() {
  return (
    <StrictMode>
      <Container className="grid gap-10 bg-gray-600 rounded-lg p-6">
        <div className="grid gap-10 bg-gray-600 rounded-lg p-6">
         
          <Icon svg={SpinnerIcon} className="fill-feedback-done" animate />
          <Icon svg={TrashIcon} className="fill-feedback-done" />
        </div>
        <div className="flex gap-6 m-5">
          <Tag variant="new" iconAdd={SpinnerIcon}>
            Aberto
          </Tag>
          <Tag variant="danger" iconAdd={TrashIcon}></Tag>
          <Tag variant="success" iconAdd={TrashIcon}>
            Encerrado
          </Tag>
        </div>
        <div className="flex flex-wrap gap-6 m-5 w-full">
          <Button icon={TrashIcon}>New Button</Button>
          <Button icon={PenIcon} size="sm">
            Label
          </Button>
          <Button icon={PenIcon} size="sm" />
          <Button icon={TrashIcon} variant="secondary" size="sm">
            New Button
          </Button>
          <Button icon={PenIcon} variant="secondary" size="md">
            Label
          </Button>
          <Button icon={TrashIcon} variant="link" size="linksm">
            New Button
          </Button>
          <Button icon={PenIcon} variant="link" size="linkmd">
            Label
          </Button>
        </div>
        <div className="flex gap-6 m-5">
          <TagTime>Label</TagTime>
          <TagTime variant="selected" iconAdd={XIcon}>
            Label
          </TagTime>
          <TagTime variant="read">Label</TagTime>
        </div>
        <div className="flex gap-6 m-5">
          <InputText
            placeholder="Your Text"
            helperText="Please enter a Text"
            error={false}
            label="label"
            helperIcon={AlertIcon}
          />
          <InputText
            placeholder="Your email"
            helperText="Please enter a valid email"
            error={true}
            label="label"
            helperIcon={AlertIcon}
          />
        </div>
        <div className="flex gap-6 m-5">
          <InputSelect
            helperText="Please select one"
            label="Label"
            helperIcon={AlertIcon}
          />
          <InputSelect
            helperText="Please select one valid option"
            error={true}
            label="Label"
            helperIcon={AlertIcon}
          />
        </div>
       
      </Container>
    </StrictMode>
  )
}
