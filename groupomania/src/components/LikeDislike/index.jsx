import Axios from "axios"
import React from "react"

export class LikeDislike extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      like: 0,
      userId: "",
      postId: this.props,
    }
  }

  //Requete Axios pour les like
  axiosPostLike = () => {
    const postId = localStorage.getItem("postId")
    const url = `http://localhost:3000/api/post/${postId}/like`
    Axios.post(url, {
      userId: (this.setState = { userId: localStorage.getItem("userId") }),
      liked: this.like,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => err, "Err like")
  }

  //Requete Axios pour les dislike
  axiosPostDislike = () => {
    const postId = localStorage.getItem("postId")
    const url = `http://localhost:3000/api/post/${postId}/like`
    Axios.post(url, {
      userId: localStorage.getItem("userId"),
      liked: this.like,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => err, "Err dislike")
  }

  handleLike = () => {
    this.setState = { like: this.state.like + 1 }
    this.axiosPostLike()
  }

  handleDislike = () => {
    this.setState = { like: this.state.like - 1 }
    this.axiosPostDislike()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLike}>👍</button>
        <button onClick={this.handleDislike}>👎</button>
      </div>
    )
  }
}
