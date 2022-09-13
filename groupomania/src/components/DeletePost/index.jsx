// import Axios from "axios"
import "./index.css"
import { useState } from "react"
import Modal from "react-modal"

Modal.setAppElement("#root")
export default function DeletePost() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const [postId, setPostId] = useState("")

  // useEffect(() => {
  //   localStorage.getItem(setPostId("postId"))
  // }, [])

  return (
    <div>
      <button
        className="supprimerPost"
        onClick={() => {
          setModalIsOpen(true)
        }}
      >
        Supprimer
      </button>
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
          {/* <button onClick={() => handleDeletePost}>Oui</button> */}
          <button onClick={() => setModalIsOpen(false)}>Annulez</button>
        </div>
      </Modal>
    </div>
  )
}
