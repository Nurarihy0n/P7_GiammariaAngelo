import Axios from "axios"
import React, { useEffect, useState } from "react"
import "./index.css"
import { Link } from "react-router-dom"

const GetPost = () => {
  const [apiData, setApiData] = useState([])

  const url = "http://localhost:3000/api/post"
  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        console.log(response.data)
        setApiData(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const setId = (postId) => {
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
                setId(data.postId)
              }}
            >
              <Link to="/UpdatePost">Modifier</Link>
            </button>
            <button className="supprimerPost">Supprimer</button>
            <button className="signalerPost">Signaler</button>
          </div>
        )
      })}
    </div>
  )
}

export default GetPost
