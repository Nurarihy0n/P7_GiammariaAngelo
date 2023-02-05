import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  let isAuthenticated = false
  let token = localStorage.getItem("accesToken")

  if (token) {
    isAuthenticated = true
  } else {
    alert("Vous n'etes pas connecte au site. Veuillez d'abord vous connecter !")
  }

  return isAuthenticated ? children : <Navigate to="/Login" />
}

export default PrivateRoute
