import React from "react"
import Axios from "axios"

export class CreateComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "",
      content: "",
      postIdData: this.props,
    }
  }
  // Envoi data vers serveurs
  axiosPostComment = () => {
    const postId = localStorage.getItem("postId")
    const url = `http://localhost:3000/api/post/${postId}/comment`
    Axios.post(url, {
      userId: localStorage.getItem("userId"),
      content: this.setState.content,
    }).then((response) => console.log(response))
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
