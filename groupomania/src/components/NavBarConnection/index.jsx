import React from "react"
import { Link } from "react-router-dom"
import "./index.css"

const NavBarConnection = () => {
  return (
    <div>
      <Link to="/SignUp">S'inscrire</Link>
      <span style={{ fontSize: "20px" }}> | </span>
      <Link to="/Login">Se connecter</Link>
    </div>
  )
}

export default NavBarConnection
