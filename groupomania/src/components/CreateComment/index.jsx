import React from "react"
import authAxios from "../Authorization/index.jsx"
import "./index.css"

export class CreateComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: "",
      postIdData: this.props,
    }
  }

  // Envoi data vers serveurs
  axiosPostComment = () => {
    const postId = localStorage.getItem("postId")
    authAxios
      .post(`/post/${postId}/comment`, {
        content: this.setState.content,
        userId: localStorage.getItem("userId"),
      })
      .then(() => window.location.reload())
      .catch((err) => console.log(err))
  }

  //Initialisation du content
  handlerContent = (e) => {
    this.setState = { content: e.target.value }
  }

  submitBtn = (e) => {
    e.preventDefault()
    this.axiosPostComment()
  }

  render() {
    return (
      <div>
        <div className="CreateCommentSection">
          <form onSubmit={this.submitBtn}>
            <label>
              <input
                className="InputComment"
                type="text"
                name="comment"
                placeholder="Ici votre commentaire"
                value={this.state.content.id}
                onChange={this.handlerContent}
              />
              <button>Commenter</button>
            </label>
          </form>
        </div>
      </div>
    )
  }
}
