import React, { useState, useEffect } from "react"
import Axios from "axios"
import Modal from "react-modal"

Modal.setAppElement("#root")
export default function UpdateComment(props) {
  const [dataComment, setDataComment] = useState([])
  const [content, setContent] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const url = `http://localhost:3000/api/post/${props.postId}/comment/${props.commentId}`

  // //Recuperation data commentaires
  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        let data = response.data
        setDataComment(data)
        setContent(data.content)
      })
      .catch((err) => console.log(err, "Error get comment from update"))
  }, [])

  //Requete Put Axios
  async function axiosPutComment() {
    Axios.put(url, {
      content: content,
    })
      .then((response) => console.log(response))
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
            <button onClick={handleModify}>Enregistrez</button>
            <button onClick={() => setModalIsOpen(false)}>Annulez</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
