import Axios from "axios"
import React, { useEffect, useState } from "react"
import "./index.css"
import "../DeletePost/index"
import { Link } from "react-router-dom"
import DeletePost from "../DeletePost/index"
import SignalerPost from "../SignalerPost/index"
import { CreateComment } from "../CreateComment/index"
import ReadComment from "../ReadComment/index"

export default function GetPost() {
  const [apiData, setApiData] = useState([])

  //Requete pour recuperation data post
  const url = "http://localhost:3000/api/post"
  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        setApiData(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const setPostId = (postId) => {
    localStorage.setItem("postId", postId)
  }
  const setDeletePostId = (postId) => {
    localStorage.setItem("postIdDelete", postId)
  }

  return (
    <div>
      {apiData.map((data) => {
        return (
          <div className="cardPost" key={data.postId}>
            <h2 className="titlePostHome">{data.title}</h2>
            <div className="contentPostHome">{data.content}</div>
            <div className="imgPostHome">
              <img src={data.image} alt={"img du post"} />
            </div>
            <div className="divBtnUDS">
              <button
                className="updateBtn"
                onClick={() => {
                  setPostId(data.postId)
                }}
              >
                <Link to="/UpdatePost/">Modifier</Link>
              </button>
              <button
                className="deleteBtn"
                onClick={() => {
                  setDeletePostId(data.postId)
                }}
              >
                <DeletePost />
              </button>
              <button
                className="signalerBtn"
                onClick={() => setPostId(data.postId)}
              >
                <SignalerPost postId={data.postId} />
              </button>
            </div>
            <div onClick={() => localStorage.setItem("postId", data.postId)}>
              <CreateComment dataPostId={data.postId} />
            </div>
            <div>
              <ReadComment dataPostId={data.postId} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
