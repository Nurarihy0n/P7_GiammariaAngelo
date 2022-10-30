import React from "react"
// import Axios from "axios"

export class CreateComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: "",
      content: "",
      postIdData: this.props,
    }
  }

  handlerContent = (e) => {
    this.setState = { content: e.target.value }
  }

  getPostIdData = (e) => {
    e.preventDefault()
    console.log(this.postIdData)
  }

  render() {
    return (
      <div>
        <div className="CreateCommentSection">
          <form>
            <label>
              <input
                className="InputComment"
                type="text"
                name="comment"
                placeholder="Ici votre commentaire"
                value={this.state.content}
                onChange={this.handlerContent}
              />
            </label>
            <button onChange={this.getPostIdData}>Commenter</button>
          </form>
        </div>
      </div>
    )
  }
}

// const [content, setContent] = useState("")
// const [userId, setUserId] = useState("")
// const [postId, setPostId] = useState("")

// async function sendDataComment() {
//   const fd = new FormData()
//   fd.append("content", content)
//   fd.append("userId", userId)
//   console.log(fd)
//   Axios.post(`http://localhost:3000/api/${postId}/comment`, fd)
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err))
// }
// function getPostIdData() {
//   Axios.get("http://localhost:3000/api/post").then((response) => {
//     let data = response.data.postId
//     console.log(data)
//     submitComment()
//   })
// }

// const submitComment = (e) => {
//   e.preventDefault()
//   setUserId(localStorage.getItem("userId"))
//   setPostId(localStorage.getItem("postId"))
//   sendDataComment()
// }
