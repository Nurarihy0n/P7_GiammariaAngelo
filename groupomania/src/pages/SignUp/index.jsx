import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBarConnection from "../../components/NavBarConnection/index"
import HeaderLogo from "../../components/HeaderLogo/index"
import Axios from "axios"

/* 1. Faire une appelle Fetch */
/* 2. Controle mes input de mon formulaire */
/* 3. Envoyer le formulaire vers la BDD */

function SignUp() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const navigate = useNavigate()

  const url = "http://localhost:3000/api/auth/signUp/"

  async function axiosPost() {
    Axios.post(url, { email: userEmail, password: userPassword })
      .then(() => {
        alert(
          "L'equipe Groupomania vous remerci pour votre inscription. Vous allez etre redirigez vers la page de connexion, Merci !"
        )
        return navigate("/Login")
      })
      .catch((err) => console.log(err))
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
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
