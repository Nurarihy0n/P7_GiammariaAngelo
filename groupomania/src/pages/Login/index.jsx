import React, { useState } from "react"
import HeaderLogo from "../../components/HeaderLogo/index"
import NavBarConnection from "../../components/NavBarConnection/index"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const navigate = useNavigate()

  async function axiosPost() {
    const url = "http://localhost:3000/api/auth/login/"
    Axios.post(url, { email: userEmail, password: userPassword })
      .then((response) => {
        const accesToken = response.data.token
        const userId = response.data.userId
        const admin = response.data.admin
        localStorage.setItem("accesToken", accesToken)
        localStorage.setItem("userId", userId)
        localStorage.setItem("admin", admin)
        return navigate("/Home")
      })
      .catch((err) => console.log(err, "err login page" + userEmail))
  }

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
