import React, { useState, useEffect } from "react"
import authAxios from "../Authorization"
import NavBarHome from "../NavBarHome/index"
import "./index.css"

export default function UpdatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [userId, setUserId] = useState("")
  const [apiDataPostId, setApiDataPostId] = useState([])

  const url = "http://localhost:3000/api/post/"

  //Recuperation post data (localStorage)
  useEffect(() => {
    const postIdLocalStorage = localStorage.getItem("postId")
    authAxios
      .get("/post/" + postIdLocalStorage)
      .then((response) => {
        let data = response.data
        setApiDataPostId(data)
        setTitle(data.title)
        setContent(data.content)
        setImage(data.image)
        setUserId(data.userId)
      })
      .catch((err) => console.log(err))
  }, [])

  //Requete Axios
  async function axiosPut() {
    const fd = new FormData()
    fd.append("title", title)
    fd.append("content", content)
    fd.append("userId", userId)
    fd.append("image", image)
    authAxios
      .put("/post/" + localStorage.getItem("postId"), fd)
      .then((response) => {
        console.log(response, "Post Updated")
      })
  }

  const submitPost = (e) => {
    e.preventDefault()
    axiosPut()
    alert("Votre post a bien ete modifie !")
  }

  //Initialisation: Champs du formulaire
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }
  const handleChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      <NavBarHome />
      <div className="modifyCardDiv">
        <form>
          <label>
            <input
              className="updateTitle"
              type="text"
              name="title"
              defaultValue={apiDataPostId.title}
              onChange={handleChangeTitle}
            />
            <br />
            <input
              className="updateContent"
              type="text"
              name="content"
              defaultValue={apiDataPostId.content}
              onChange={handleChangeContent}
            />
            <br />
            <div style={{ maxWidth: "300px" }}>
              <img src={apiDataPostId.image} alt="img actuel" />
            </div>
            <input
              className="modifyImage"
              type="file"
              accept="image/*"
              name="image"
              defaultValue={apiDataPostId.image}
              onChange={handleChangeImage}
            />
          </label>
          <button className="forUpdateButton" onClick={submitPost}>
            Modifier
          </button>
        </form>
      </div>
    </div>
  )
}
