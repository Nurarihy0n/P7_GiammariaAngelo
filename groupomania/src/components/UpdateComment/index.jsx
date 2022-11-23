import React, { useState, useEffect } from "react"
import Axios from "axios"

export default function UpdateComment() {
  const [content, setContent] = useState("")

  // ** Props a initialiser =======>
  const url = `http://localhost:3000/api/post/{postId}/comment`

  //Recuperation data commentaires
  useEffect(() => {
    // ** Props a initialiser =======>
    Axios.get(url)
      .then((response) => {
        let data = response.data
        setContent(data.content)
      })
      .catch((err) => console.log(err, "Error get comment from update"))
  }, [])

  //Requete Put Axios
  async function axiosPutComment() {
    // ** Props a initialiser =======>
    Axios.put(url + "comId", {
      content: content,
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err, "Erreur lors de l'update du comment"))
  }

  return (
    <div>
      <button>Modifier</button>
    </div>
  )
}
