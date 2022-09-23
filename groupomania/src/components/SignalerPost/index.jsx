import React from "react"
import Axios from "axios"

//Envoi de l'id du post signaler a la bdd
export default function SignalerPost() {
  let postId = localStorage.getItem("postId")
  let userId = localStorage.getItem("userId")
  let url = `http://localhost/3000/api/post/${postId}/report`
  function sendReport() {
    Axios.post(url, { userId })
      .then((response) => console.log(response, "Post signaler"))
      .catch((err) => console.log(err, "Erreur lors du signalement"))
  }

  return (
    <div>
      <div onClick={() => sendReport()}>Signaler</div>
    </div>
  )
}
