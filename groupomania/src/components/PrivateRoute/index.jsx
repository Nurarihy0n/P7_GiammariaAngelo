import { useNavigate } from "react-router-dom"

const useAuth = () => {
  const navigate = useNavigate()

  const user = localStorage.getItem("Token")
  if (user) {
    navigate("/Home")
  } else {
    navigate("/Login")
  }
}

export default useAuth
