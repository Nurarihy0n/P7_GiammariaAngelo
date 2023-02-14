// import React from "react"

const ifAuthor = (props, { children }) => {
  let isAuthor = false
  let userId = localStorage.getItem("userId")
  //   let adminToken = localStorage.getItem("accesToken")

  if (userId === props.userIdFromPost) {
    isAuthor = true
  }

  return isAuthor ? children : ""
}

export default ifAuthor
