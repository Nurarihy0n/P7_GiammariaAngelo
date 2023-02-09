import Axios from "axios"
import React, { useState /*, useEffect*/ } from "react"
import "./index.css"

export default function LikeDislike(props) {
  const [like, setLike] = useState("")
  const [likeCount, setLikeCount] = useState([0])
  const [dislikeCount, setDislikeCount] = useState([0])
  const [activeBtn, setActiveBtn] = useState("none")

  const url = `http://localhost:3000/api/post/${props.postId}/like`

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

  //Requete Axiso pour recuperation des like
  // useEffect(() => {
  //   Axios.get(url)
  //     .then((response) => {
  //       let data = response.data
  //       console.log(data)
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

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
