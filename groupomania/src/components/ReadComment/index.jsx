import authAxios from "../Authorization/index"
import React, { useEffect, useState } from "react"
import "./index.css"
import ModifyComment from "../UpdateComment/index"
import DeleteComment from "../DeleteComment/index"

export default function ReadComment(props) {
  const [dataComment, setDataComment] = useState([])

  //Recuperation data des commentaires
  useEffect(() => {
    authAxios
      .get(`/post/${props.dataPostId}/comment`)
      .then((response) => {
        setDataComment(response.data)
      })
      .catch((err) => console.log(err, "erreur recuperation des commentaires"))
  }, [])

  let userIdConnect = localStorage.getItem("userId")

  return (
    <div>
      {dataComment.map((data) => {
        return (
          <div key={data.comId}>
            <div id="divToTransform" className="commentSection">
              {data.content}
            </div>
            {data.userId == userIdConnect ? (
              <div className="container_modifiaction_comment">
                <button className="modify_btn">
                  <ModifyComment postId={data.postId} commentId={data.comId} />
                </button>
                <div className="delete_btn">
                  <DeleteComment
                    postIdComment={data.postId}
                    commentId={data.comId}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )
      })}
    </div>
  )
}
