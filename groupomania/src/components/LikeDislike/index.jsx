import Axios from "axios"
import React, { useState, useEffect } from "react"
import "./index.css"

export default function LikeDislike(props) {
  const [like, setLike] = useState("")
  const [likeCount, setLikeCount] = useState([0])
  const [dislikeCount, setDislikeCount] = useState([0])
  const [activeBtn, setActiveBtn] = useState("none")

  const postId = localStorage.getItem("postId")
  const url = `http://localhost:3000/api/post/${postId}/like`

  //Requete Axios pour la recuperation et le compteur des likes par post
  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        let data = response.data
      })
      .catch((err) => console.log(err, "Error axios get like/dislike"))
  }, [])

  //Requete Axios pour l'envoi des like par l'user vers la bdd
  async function axiosPostLike() {
    Axios.post(url, {
      userId: localStorage.getItem("userId"),
      liked: like,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => err, "Err like/Dislike")
  }

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1)
      setLike(+1)
      axiosPostLike()
      setActiveBtn("like")
      return
    }
    if (activeBtn === "like") {
      setLikeCount(likeCount - 1)
      setLike(-1)
      axiosPostLike()
      setActiveBtn("none")
      return
    }
  }

  const handleDislikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1)
      setActiveBtn("dislike")
      setLike(-1)
      axiosPostLike()
      return
    }

    if (activeBtn === "dislike") {
      setDislikeCount(dislikeCount - 1)
      setActiveBtn("none")
      setLike(+1)
      axiosPostLike()
      return
    }
  }

  return (
    <div>
      <div className="container">
        <div className="btn-container">
          <button
            className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
            onClick={handleLikeClick}
          >
            <span>↑</span>
            Like {likeCount}
          </button>

          <button
            className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
            onClick={handleDislikeClick}
          >
            <span>↓</span>
            Dislike {dislikeCount}
          </button>
        </div>
      </div>
    </div>
  )
}
