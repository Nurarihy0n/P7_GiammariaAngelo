import React, { useState, useEffect } from "react"
import Axios from "axios"
import NavBarHome from "../NavBarHome/index"
import "./index.css"

export default function UpdatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [userId, setUserId] = useState("")
  const [apiDataPostId, setApiDataPostId] = useState([])

  const url = "http://localhost:3000/api/post/"

  //Je recupere la data de mon post stocker dans le localStorage
  useEffect(() => {
    const postIdLocalStorage = localStorage.getItem("postId")
    Axios.get(url + postIdLocalStorage)
      .then((response) => {
        setApiDataPostId(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  async function axiosPut() {
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    const fd = new FormData()
    fd.append("image", image, image.name)
    fd.append("title", title)
    fd.append("content", content)
    fd.append("userId", userId)
    Axios.put(config, url + localStorage.getItem("postId"), fd).then(
      (response) => {
        alert("Votre post a bien ete modifie !")
      }
    )
  }

  let userIdLocalStorage = localStorage.getItem("userId")

  const submitPost = (e) => {
    e.preventDefault()
    setUserId(userIdLocalStorage)
    axiosPut()
  }

  return (
    <div>
      <NavBarHome />
      <div className="modifyCardDiv">
        <div className="modifyPost">
          <form>
            <label>
              <input
                className="inputTitle"
                type="text"
                name="title"
                defaultValue={apiDataPostId.title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <br />
              <input
                className="modifyContent"
                type="text"
                name="content"
                defaultValue={apiDataPostId.content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
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
                onChange={(e) => {
                  setImage(e.target.files[0])
                }}
              />
            </label>
            <button className="button-45" onClick={submitPost}>
              Modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
