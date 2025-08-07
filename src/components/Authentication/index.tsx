import logo from "../../assets/NavHeader.svg"
import styles from "./styles.module.css"

export function Authentication() {
  return (
    <div className={`${styles.background} h-screen`}>
      <img src={logo} alt="Logo HelpDesk" />
    </div>
  )
}

