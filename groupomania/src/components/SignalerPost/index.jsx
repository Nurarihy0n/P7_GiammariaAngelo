import React, { useState } from "react"
import Axios from "axios"
import Modal from "react-modal"

Modal.setAppElement("#root")
//Envoi de l'id du post signaler a la bdd
export default function SignalerPost(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [content, setContent] = useState("")
  let userId = localStorage.getItem("userId")
  let url = `http://localhost:3000/api/post/${props.postId}/report`

  function sendReport() {
    Axios.post(url, { userId, content })
      .then(() => alert("Contenu Signale"))
      .catch(() => alert("Vous avez deja signaler ce contenu"))
  }

  const handleReport = () => {
    setModalIsOpen(false)
    sendReport()
  }

  const handleContentReport = (e) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <div className="reportContent" onClick={() => setModalIsOpen(true)}>
        Signaler
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
        <div className="validationReport">
          <h2>Ajoutez un commentaire ?</h2>
          <form>
            <label>
              <input
                type="text"
                name="content"
                onChange={handleContentReport}
              />
            </label>
          </form>
          <button onClick={() => handleReport()}>Signaler</button>
          <button onClick={() => setModalIsOpen(false)}>Annulez</button>
        </div>
      </Modal>
    </div>
  )
}
