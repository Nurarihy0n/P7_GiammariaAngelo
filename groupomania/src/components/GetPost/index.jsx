import Axios from "axios"
import React, { useEffect, useState } from "react"
import "./index.css"
import "../DeletePost/index"
import { Link } from "react-router-dom"
import DeletePost from "../DeletePost/index"

export default function GetPost() {
  const [apiData, setApiData] = useState([])

  const url = "http://localhost:3000/api/post"
  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        setApiData(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const setPostId = (postId) => {
    console.log(postId)
    localStorage.setItem("postId", postId)
  }

  return (
    <div>
      {apiData.map((data, id) => {
        return (
          <div className="cardPost">
            <h2 className="titlePostHome" key={data.id}>
              {data.title}
            </h2>
            <div className="contentPostHome" key={data.id}>
              {data.content}
            </div>
            <div className="imgPostHome">
              <img src={data.image} alt={"img du post"} />
            </div>
            <button
              className="modifierPost"
              onClick={() => {
                setPostId(data.postId)
              }}
            >
              <Link to="/UpdatePost/">Modifier</Link>
            </button>
            <DeletePost />
            <button className="signalerPost">Signaler</button>
          </div>
        )
      })}
    </div>
  )
}
