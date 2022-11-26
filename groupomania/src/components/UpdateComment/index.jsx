import React, { useState } from "react"
import Axios from "axios"

export default function UpdateComment(props) {
  const [content, setContent] = useState("")

  const url = `http://localhost:3000/api/post/${props.postId}/comment/${props.commentId}`

  // //Recuperation data commentaires
  function getSpecificComment() {
    Axios.get(url)
      .then((response) => {
        let data = response.data
        setContent(data.content)
        console.log(content)
      })
      .catch((err) => console.log(err, "Error get comment from update"))
  }

  //Requete Put Axios
  async function axiosPutComment() {
    Axios.put(
      url +
        {
          content: content,
        }
    )
      .then((response) => console.log(response))
      .catch((err) => console.log(err, "Erreur lors de l'update du comment"))
  }

  const handleModifyBtn = (e) => {
    e.preventDefault()
    getSpecificComment()
  }

  return (
    <div>
      <button onClick={handleModifyBtn}>Modifier</button>
    </div>
  )
}
