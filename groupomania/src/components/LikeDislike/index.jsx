import authAxios from "../Authorization"
import React, { useState, useEffect } from "react"
import "./index.css"

export default function LikeDislike(props) {
  const [likeCount, setLikeCount] = useState([0])
  const [dislikeCount, setDislikeCount] = useState([0])
  const [activeBtn, setActiveBtn] = useState("none")

  //Requete Axios pour l'envoi des like par l'user vers la bdd
  async function axiosPostLike() {
    authAxios
      .post(`/post/${props.postId}/like`, {
        userId: localStorage.getItem("userId"),
        liked: 1,
      })
      .then((response) => {
        console.log(response, "Like sent")
      })
      .catch((err) => err, "Err like")
  }
  //Requete Axios pour l'envoi des dislike par l'user vers la bdd
  async function axiosPostDislike() {
    authAxios
      .post(`/post/${props.postId}/like`, {
        userId: localStorage.getItem("userId"),
        disliked: 1,
      })
      .then((response) => {
        console.log(response, "Dislike sent")
      })
      .catch((err) => err, "Err Dislike")
  }
  //Requete axios pour annuler like
  async function axiosPostRemoveLike() {
    authAxios
      .post(`/post/${props.postId}/like`, {
        userId: localStorage.getItem("userId"),
        liked: -1,
      })
      .then((response) => {
        console.log(response, "Like removed")
      })
      .catch((err) => err, "Err Dislike")
  }

  //pour annuler dislike
  async function axiosPostRemoveDislike() {
    authAxios
      .post(`/post/${props.postId}/like`, {
        userId: localStorage.getItem("userId"),
        disliked: -1,
      })
      .then((response) => {
        console.log(response, "Dislike removed")
      })
      .catch((err) => err, "Err Dislike")
  }
  //Requete Axios pour recuperation des like
  useEffect(() => {
    authAxios
      .get(`/post/${props.postId}/like`)
      .then((response) => {
        let data = response.data
        const totalLike = data.reduce((acc, cur) => acc + cur.liked, 0)
        setLikeCount(totalLike)
        const totalDislike = data.reduce((acc, cur) => acc + cur.disliked, 0)
        setDislikeCount(totalDislike)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      axiosPostLike()
      setLikeCount(likeCount + 1)
      setActiveBtn("like")
      return
    }
    if (activeBtn === "like") {
      axiosPostRemoveLike()
      setLikeCount(likeCount - 1)
      setActiveBtn("none")
      return
    }
  }

  const handleDislikeClick = () => {
    if (activeBtn === "none") {
      axiosPostDislike()
      setDislikeCount(dislikeCount + 1)
      setActiveBtn("dislike")
      return
    }

    if (activeBtn === "dislike") {
      axiosPostRemoveDislike()
      setDislikeCount(dislikeCount - 1)
      setActiveBtn("none")
      return
    }
  }

  return (
    <div>
      <div className="container">
        <div className="btn-container">
          <button
            onClick={handleLikeClick}
            className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
          >
            <span>↑</span>
            Like {likeCount}
          </button>

          <button
            onClick={handleDislikeClick}
            className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
          >
            <span>↓</span>
            Dislike {dislikeCount}
          </button>
        </div>
      </div>
    </div>
  )
}
