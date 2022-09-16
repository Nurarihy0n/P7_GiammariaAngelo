import Axios from "axios"
import "./index.css"
import { useState } from "react"
import Modal from "react-modal"

Modal.setAppElement("#root")
export default function DeletePost() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const url = "http://localhost:3000/api/post/"

  function deletePost() {
    Axios.delete(url + localStorage.getItem("postIdDelete"))
      .then((response) => console.log(response, "Post Supprime"))
      .catch((err) => console.log(err, "Delete post failed"))
  }

  const handleDelete = () => {
    setModalIsOpen(false)
    deletePost()
    window.location.reload()
    alert("Votre Post a ete supprime !")
  }

  return (
    <div>
      <div
        className="supprimerPost"
        onClick={() => {
          setModalIsOpen(true)
        }}
      >
        Supprimer
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            borderRadius: "20px",
            border: "1px solid #4E5166",
          },
        }}
      >
        <div className="ValidationSuppression">
          <h2>Voulez-vous vraiment supprimer ce post ?</h2>
          <button onClick={() => handleDelete()}>Oui</button>
          <button onClick={() => setModalIsOpen(false)}>Annulez</button>
        </div>
      </Modal>
    </div>
  )
}
