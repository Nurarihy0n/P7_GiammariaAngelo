import React from "react"
import NavBarHome from "../../components/NavBarHome/index"
import CreatePost from "../../components/CreatePost/index"
import GetPost from "../../components/GetPost/index"

function Home() {
  return (
    <div>
      <React.StrictMode>
        <NavBarHome />
        <CreatePost />
        <GetPost />
      </React.StrictMode>
    </div>
  )
}

export default Home
