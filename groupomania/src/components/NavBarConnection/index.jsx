import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const NavBarConnection = () => {
  const StyledLink = styled(Link)`
    color: #4e5166;
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
  `

  return (
    <div>
      <StyledLink to="/SignUp">S'inscrire</StyledLink>
      <span style={{ fontSize: "20px" }}> | </span>
      <StyledLink to="/Login">Se connecter</StyledLink>
    </div>
  )
}

export default NavBarConnection
