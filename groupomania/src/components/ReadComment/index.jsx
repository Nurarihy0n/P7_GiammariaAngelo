import Axios from "axios"
import React, { useEffect, useState } from "react"
import "./index.css"
import ModifyComment from "../UpdateComment/index"
import DeleteComment from "../DeleteComment/index"

export default function ReadComment(props) {
  const [dataComment, setDataComment] = useState([])

  //Authorisation
  let accesToken = localStorage.getItem("accesToken")
  let config = {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  }

  //Recuperation data des commentaires
  useEffect(() => {
    const url = `http://localhost:3000/api/post/${props.dataPostId}/comment`
    Axios.get(url, config)
      .then((response) => {
        setDataComment(response.data)
      })
      .catch((err) => console.log(err, "erreur recuperation des commentaires"))
  }, [])

  return (
    <div>
      {dataComment.map((data) => {
        return (
          <div key={data.comId}>
            <div id="divToTransform" className="commentSection">
              {data.content}
            </div>
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
          </div>
        )
      })}
    </div>
  )
}
