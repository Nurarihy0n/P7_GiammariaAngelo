import Axios from "axios"
import React, { useEffect, useState } from "react"
import "./index.css"
// import ModifyComment from "../UpdateComment/index"
import DeleteComment from "../DeleteComment/index"

export default function ReadComment(props) {
  const [dataComment, setDataComment] = useState([])

  //Recuperation data des commentaires
  useEffect(() => {
    console.log(props.dataPostId)
    const url = `http://localhost:3000/api/post/${props.dataPostId}/comment`
    Axios.get(url)
      .then((response) => {
        setDataComment(response.data)
      })
      .catch((err) => console.log(err, "erreur recuperation des commentaires"))
  }, [])

  return (
    <div>
      {dataComment.map((data) => {
        return (
          <div>
            <div className="commentSection" key={data.comId}>
              {data.content}
            </div>
            <div className="container_modifiaction_comment">
              {/* <div className="modify_btn">
                <ModifyComment />
        </div>*/}
              <div className="delete_btn">
                <DeleteComment
                  postIdComment={data.postId}
                  commentId={data.comId}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
