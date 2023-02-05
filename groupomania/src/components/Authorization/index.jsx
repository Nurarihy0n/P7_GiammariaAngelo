const CheckAuth = ({ children }) => {
  let ifAuth = false
  let token = localStorage.getItem("accesToken")

  if (token) {
    ifAuth = true
  } else {
    console.log("Attention, on touche pas au affaires des autres !")
  }

  return ifAuth ? children : alert("HoldUp, on touche rien")
}

export default CheckAuth
