const Axios = require("axios")

const accesToken = localStorage.getItem("accesToken")

const authAxios = Axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${accesToken} `,
  },
})

export default authAxios
