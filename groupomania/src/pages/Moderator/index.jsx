import React from "react"
import NavBarHome from "../../components/NavBarHome/index"
import ControlReport from "../../components/ControlReport/index"

export default function Moderator() {
  return (
    <div>
      <React.StrictMode>
        <NavBarHome />
        <ControlReport />
      </React.StrictMode>
    </div>
  )
}
