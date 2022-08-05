import Axios from "axios"
import { useState, useEffect } from "react"

function GetPost() {
  const url = "http://localhost:3000/api/auth"
  useEffect(() => {
    Axios.get(url)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div
      style={{
        borderRadius: "solid 1px black",
      }}
    >
      <div className="titlePostHome"></div>
      <div className="contentPostHome"></div>
      <div className="imgPostHome"></div>
    </div>
  )
}

export default GetPost
