import logo from "../../assets/NavHeader.svg"
import styles from "./styles.module.css"
import Text from "../text"

export function Authentication() {
  return (
    <div className={`${styles.background} h-screen`}>
      <img src={logo} alt="Logo HelpDesk" />
      <Text variant="text-xxs">Test Size</Text>
    </div>
  )
}

