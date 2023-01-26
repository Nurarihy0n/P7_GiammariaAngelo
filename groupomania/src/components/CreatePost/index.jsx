import React, { useState } from "react"
import Modal from "react-modal"
import "./index.css"
import axios from "axios"

Modal.setAppElement("#root")
function CreatePost() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")

  //Envoi des fichiers formater vers le serveur
  async function axiosPost() {
    const fd = new FormData()
    fd.append("image", image, image.name)
    fd.append("title", title)
    fd.append("content", content)
    fd.append("userId", localStorage.getItem("userId"))
    const url = "http://localhost:3000/api/post/"
    axios
      .post(url, fd)
      .then(() => {
        alert("Votre post a bien ete creez !")
        window.location.reload()
      })
      .catch((err) =>
        console.log(err, "Err lors de la creation d'un post sur react")
      )
  }

  //Bonton d'envoi vers le serveur cote client
  const submitPost = (e) => {
    e.preventDefault()
    setModalIsOpen(false)
    axiosPost()
  }

  return (
    //Initialisation du Modal
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
        {" "}
        <div className="openedModalDiv">
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}
          >
            x
          </button>
          {/* Formulaire d'envoi avec titre, contenue et image */}
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
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0])
                  }}
                />
              </label>
              <button className="button-45" onClick={submitPost}>
                Post
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreatePost
