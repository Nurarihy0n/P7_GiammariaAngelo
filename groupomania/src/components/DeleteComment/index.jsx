import Axios from "axios"

export default function DeleteComment(props) {
  const url = `http://localhost:3000/api/post/${props.postIdComment}/comment/${props.commentId}`

  //Authorisation
  // let accesToken = localStorage.getItem("accesToken")
  // let config = {
  //   headers: {
  //     Authorization: `Bearer ${accesToken}`,
  //   },
  // }

  function deleteComment() {
    Axios.delete(url)
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
