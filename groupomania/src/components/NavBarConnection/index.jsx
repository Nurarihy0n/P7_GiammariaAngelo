import React from "react"
import { Link } from "react-router-dom"

const NavBarConnection = () => {
  return (
    <div>
      <Link to="/SignUp">S'inscrire</Link> |{" "}
      <Link to="/Login">Se connecter</Link>
    </div>
  )
}

export default NavBarConnection
