import Axios from "axios"
import React, { useEffect, useState } from "react"
import "./index.css"

export default function ReadComment(props) {
  const [dataComment, setDataComment] = useState([])

  //Recuperation data des commentaires
  useEffect(() => {
    // const postId = localStorage.getItem("postId")
    console.log(props.dataPostId)
    const url = `http://localhost:3000/api/post/${props.dataPostId}/comment`
    Axios.get(url)
      .then((response) => {
        setDataComment(response.data)
        //console.log(response.data)
      })
      .catch((err) => console.log(err, "erreur recuperation des commentaires"))
  }, [])

  return (
    <div>
      {dataComment.map((data) => {
        return (
          <div className="commentSection" key={data.comId}>
            {data.content}
          </div>
        )
      })}
    </div>
  )
}
