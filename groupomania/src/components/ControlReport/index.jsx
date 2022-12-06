import { useEffect } from "react"
import Axios from "axios"

export default function ControlReport() {
  const urlReportBDD = "http://localhost:3000/api/post/report"
  useEffect(() => {
    Axios.get(urlReportBDD).then((response) => console.log(response))
  }, [])

  return (
    <div>
      <h1>Controle par le moderateur des posts signale</h1>
      <ul>
        <li>Recuperation des posts signaler</li>
        <li>Affchage des posts dans un tableau</li>
        <li>Creation d'un bouton de suppression</li>
      </ul>
      <div></div>
    </div>
  )
}
