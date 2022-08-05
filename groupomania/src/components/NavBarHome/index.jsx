import React from "react"
import { Link } from "react-router-dom"
import logoHome from "../../assets/icon-left-font-monochrome-white.svg"
import "./index.css"
import { IoIosLogOut } from "react-icons/io"

const NavBarHome = () => {
  return (
    <div className="div-link">
      <Link className="link-img-logo" to="/Home">
        <img className="imgLogo" src={logoHome} alt="groupomania_logo" />
      </Link>
      <Link className="link-disconnect" to="/">
        <IoIosLogOut />
      </Link>
    </div>
  )
}

export default NavBarHome
