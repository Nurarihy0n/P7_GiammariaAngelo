import React, { useState } from "react"
import Modal from "react-modal"
import "./index.css"
import Axios from "axios"

Modal.setAppElement("#root")
function CreatePost() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [userId, setUserId] = useState("")

  async function axiosPost() {
    const url = "http://localhost:3000/api/post/"
    Axios.post(url, {
      title: title,
      content: content,
      imageUrl: imageUrl,
      userId: userId,
    }).then((response) => {
      console.log(response)
    })
  }

  let userIdLocalStorage = localStorage.getItem("userId")

  const submitPost = (e) => {
    e.preventDefault()
    setUserId(userIdLocalStorage)
    axiosPost()
  }

  return (
    <div className="modalDiv">
      <button className="btn-add-post" onClick={() => setModalIsOpen(true)}>
        +
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
        <button
          className="closeModalButton"
          onClick={() => setModalIsOpen(false)}
        >
          x
        </button>
        <div className="createPost">
          <form>
            <label>
              <input
                className="inputTitle"
                type="text"
                name="title"
                placeholder="Titre"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <br />
              <input
                className="inputContent"
                type="text"
                name="content"
                placeholder="Votre contenue"
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              />
              <br />
              <input
                className="inputImage"
                type="file"
                accept="image/*"
                name="imageUrl"
                onChange={(e) => {
                  setImageUrl(e.target.value)
                }}
              />
            </label>
            <button className="button-45" onClick={submitPost}>
              Post
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default CreatePost
