import React, { useState, useEffect } from "react"
import axios from "axios"
import NavBarHome from "../NavBarHome/index"
import "./index.css"

export default function UpdatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [userId, setUserId] = useState("")
  const [postId, setPostId] = useState("")

  console.log(title)

  async function axiosPost() {
    const fd = new FormData()
    fd.append("image", image, image.name)
    fd.append("title", title)
    fd.append("content", content)
    fd.append("userId", userId)
    const url = `http://localhost:3000/api/post/${postId}`
    axios.put(url, fd).then((response) => {
      alert("Votre post a bien ete modifie !")
    })
  }

  let userIdLocalStorage = localStorage.getItem("userId")

  useEffect(() => {
    setTitle(localStorage.getItem("title"))
    setContent(localStorage.getItem("content"))
    setImage(localStorage.getItem("image"))
    setPostId(localStorage.getItem("postId"))
  }, [])

  const submitPost = (e) => {
    e.preventDefault()
    setUserId(userIdLocalStorage)
    axiosPost()
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
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <br />
              <input
                className="modifyContent"
                type="text"
                name="content"
                defaultValue={content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              />
              <br />
              <input
                className="modifyImage"
                type="file"
                accept="image/*"
                name="image"
                defaultValue={image}
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
