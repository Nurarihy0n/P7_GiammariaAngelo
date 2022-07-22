import React from "react"
import { Link } from "react-router-dom"

const NavBarHome = () => {
  return (
    <div>
      <Link to="/Home">Home</Link> |{" "}
      <Link to="/">Deconnexion( a initialiser)</Link>
    </div>
  )
}

export default NavBarHome
