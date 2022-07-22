import React, { useEffect, useState } from "react"
import HeaderLogo from "../../components/HeaderLogo/index"
import NavBarConnection from "../../components/NavBarConnection/index"
import Axios from "axios"

function Login() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  async function axiosPost() {
    const url = "http://localhost:3000/api/auth/login/"
    Axios.post(url, { email: userEmail, password: userPassword }).then(
      (response) => {
        const accesToken = response.data.token
        const userId = response.data.userId
        localStorage.setItem("accesToken", accesToken)
        localStorage.setItem("userId", userId)
      }
    )
  }

  useEffect(() => {
    axiosPost()
  })

  const handleFormSub = (e) => {
    e.preventDefault()
    axiosPost()
  }

  return (
    <div>
      <NavBarConnection />
      <HeaderLogo />
      <div className="connection">
        <form>
          <label>
            <div className="emailArea">
              @mail <br />
              <input
                className="inputEmail"
                type="email"
                name="email"
                onChange={(e) => {
                  setUserEmail(e.target.value)
                }}
              />
            </div>
            <div className="passwordArea">
              Mot de passe
              <br />
              <input
                className="inputMp"
                type="password"
                name="password"
                onChange={(e) => {
                  setUserPassword(e.target.value)
                }}
              />
            </div>
          </label>
          <button className="button-45" onClick={handleFormSub}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
