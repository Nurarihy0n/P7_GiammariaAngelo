import "./Connection.css"
import logoAccueil from "../../assets/icon-left-font-monochrome-black.svg"

function HeaderLogo() {
  return (
    <div>
      <img className="imgHeaderLogo" src={logoAccueil} alt="groupomania_logo" />
    </div>
  )
}

export default HeaderLogo
