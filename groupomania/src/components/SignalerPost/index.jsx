import React from "react"
import Axios from "axios"

//Envoi de l'id du post signaler a la bdd
export default function SignalerPost(props) {
  let userId = localStorage.getItem("userId")
  let url = `http://localhost:3000/api/post/${props.postId}/report`

  function sendReport() {
    Axios.post(url, { userId })
      .then(() => alert("Post Signale"))
      .catch(() => alert("Vous avez deja signaler ce post"))
  }

  return (
    <div>
      <div onClick={() => sendReport()}>Signaler</div>
    </div>
  )
}
