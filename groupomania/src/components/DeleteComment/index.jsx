import React from "react"
import authAxios from "../Authorization/index.jsx"
import "./index.css"

export default function DeleteComment(props) {
  // const url = `http://localhost:3000/api/post/${props.postIdComment}/comment/${props.commentId}`

  function deleteComment() {
    authAxios
      .delete(`/post/${props.postIdComment}/comment/${props.commentId}`)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err, "Erreur a la suppression"))
  }

  const handleDeleteComment = () => {
    deleteComment()
    window.location.reload()
  }

  return (
    <div>
      <button className="supprimerComment" onClick={handleDeleteComment}>
        Supprimer
      </button>
    </div>
  )
}
