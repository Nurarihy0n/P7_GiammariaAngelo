// import React, { useEffect, useState } from "react"
// import Axios from "axios"
import ImgProgress from "../../assets/workOnProgress.jpeg"

export default function ControlReport() {
  // const [dataReport, setDataReport] = useState("")

  // //Recuperation des signalement
  // const urlReportBDD = "http://localhost:3000/api/post/1/report"
  // useEffect(() => {
  //   Axios.get(urlReportBDD)
  //     .then((response) => {
  //       setDataReport(response.data)
  //       console.log(dataReport)
  //     })
  //     .catch((err) => console.log(err, "err get report from bd"))
  // }, [])

  return (
    <div>
      {/* {dataReport.map((data) => {
        return (
          <div>
            <table>
              <tr>
                <th>ID</th>
                <th>Report</th>
                <th>Ras</th>
                <th>Supprimer Post</th>
              </tr>
              <tr>
                <td>{data.reportId}</td>
                <td>{data.content}</td>
                <td>
                  <button>R.A.S</button>
                </td>
                <td>
                  <button>Supprimer post</button>
                </td>
              </tr>
            </table>
          </div>
        )
      })} */}
      <img src={ImgProgress} alt="en travaux" />
    </div>
  )
}
