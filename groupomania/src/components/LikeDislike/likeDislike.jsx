// import Axios from "axios"
// import React, { useState } from "react"

// export default function likeDislike(props) {
//   const [like, setLike] = useState("")
//   //Url des post
//   const url = `http://localhost:3000/api/post/${props.postId}/like`

//   // =========> Pour requete userId, postId et liked (INT)

//   //Requete Axios pour les like
//   Axios.post(url)

//   //Requete Axios pour les dislike

//   const handleLike = (e) => {
//     e.preventDefault()
//     setLike(1)
//   }

//   return (
//     <div>
//       <div onClick={() => handleLike}>J'aime</div>
//       {/*
//             Bouton de like se transform en dislike
//         */}
//       {/*
//             Bouton pour disliker
//         */}
//     </div>
//   )
// }
