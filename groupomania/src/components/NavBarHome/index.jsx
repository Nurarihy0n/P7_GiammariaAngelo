import React from "react"
import { Link } from "react-router-dom"
import logoHome from "../../assets/icon-left-font-monochrome-white.svg"
import "./index.css"
import { IoIosLogOut } from "react-icons/io"

export default function NavBarHome() {
  const clearLocalStorage = () => {
    localStorage.clear()
  }

  return (
    <div className="div-link">
      <Link className="link-img-logo" to="/Home">
        <img className="imgLogo" src={logoHome} alt="groupomania_logo" />
      </Link>
      <Link onClick={clearLocalStorage} className="link-disconnect" to="/Login">
        <IoIosLogOut />
      </Link>
    </div>
  )
}
