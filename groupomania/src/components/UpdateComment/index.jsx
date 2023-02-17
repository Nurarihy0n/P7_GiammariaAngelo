import React, { useState, useEffect } from "react"
import authAxios from "../Authorization/index"
import Modal from "react-modal"
import "./index.css"

Modal.setAppElement("#root")
export default function UpdateComment(props) {
  const [dataComment, setDataComment] = useState([])
  const [content, setContent] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // //Recuperation data commentaires
  useEffect(() => {
    authAxios
      .get(`/post/${props.postId}/comment/${props.commentId}`)
      .then((response) => {
        let data = response.data
        setDataComment(data)
        setContent(data.content)
      })
      .catch((err) => console.log(err, "Error get comment from update"))
  }, [])

  //Requete Put Axios
  async function axiosPutComment() {
    authAxios
      .put(`/post/${props.postId}/comment/${props.commentId}`, {
        content: content,
      })
      .then((response) => window.location.reload())
      .catch((err) => console.log(err, "Erreur lors de l'update du comment"))
  }

  const handleModify = (e) => {
    e.preventDefault()
    axiosPutComment()
    setModalIsOpen(false)
  }
  // Controle du champs content
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <div
        className="ModifyComment"
        onClick={() => {
          setModalIsOpen(true)
        }}
      >
        Modifier
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            borderRadius: "20px",
            border: "1px solid #4E5166",
            height: "20%",
          },
        }}
      >
        <div className="ValidationModificationComment">
          <form>
            <label>
              <input
                className="updateComment"
                type="text"
                name="content"
                defaultValue={dataComment.content}
                onChange={handleChangeContent}
              />
            </label>
            <div className="containerCommentBtn">
              <button className="saveCommentUpdate" onClick={handleModify}>
                Enregistrez
              </button>
              <button
                className="confirmDeleteComment"
                onClick={() => setModalIsOpen(false)}
              >
                Annulez
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
