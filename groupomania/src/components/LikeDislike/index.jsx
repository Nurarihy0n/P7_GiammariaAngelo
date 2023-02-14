import authAxios from "../Authorization"
import React, { useState, useEffect } from "react"
import "./index.css"

export default function LikeDislike(props) {
  const [like, setLike] = useState("")
  const [likeCount, setLikeCount] = useState([0])
  const [dislikeCount, setDislikeCount] = useState([0])
  const [activeBtn, setActiveBtn] = useState("none")

  //Requete Axios pour l'envoi des like par l'user vers la bdd
  function axiosPostLike() {
    authAxios
      .post(`/post/${props.postId}/like`, {
        userId: localStorage.getItem("userId"),
        liked: like,
      })
      .then((response) => {
        console.log(response, "Like/Dislike send")
      })
      .catch((err) => err, "Err like/Dislike")
  }

  //Requete Axios pour recuperation des like
  useEffect(() => {
    authAxios
      .get(`/post/${props.postId}/like`)
      .then((response) => {
        let data = response.data
        const totalLike = data.reduce((acc, cur) => acc + cur.liked, 0)
        setLikeCount(totalLike)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLike(+1)
      axiosPostLike()
      setLikeCount(likeCount + 1)
      setActiveBtn("like")
      return
    }
    if (activeBtn === "like") {
      setLike(-1)
      axiosPostLike()
      setLikeCount(likeCount - 1)
      setActiveBtn("none")
      return
    }
  }

  const handleDislikeClick = () => {
    if (activeBtn === "none") {
      setLike(-1)
      axiosPostLike()
      setDislikeCount(dislikeCount + 1)
      setActiveBtn("dislike")
      return
    }

    if (activeBtn === "dislike") {
      setLike(+1)
      axiosPostLike()
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
            Dislike {/*dislikeCount*/}
          </button>
        </div>
      </div>
    </div>
  )
}
