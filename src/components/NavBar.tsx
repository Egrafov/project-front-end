import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { StyledLink } from "./common/Styles";

export const NavBar = () => (
  <StyledLink>
    <NavLink to={"/aboutUs"}>About us</NavLink>
    <NavLink
      rel="noreferrer"
      target="_blank"
      to="https://www.facebook.com/tanya.grafova"
    >
      <FaFacebook style={{ color: "blue", marginTop: 6, fontSize: 20 }} />
    </NavLink>
    <NavLink
      rel="noreferrer"
      target="_blank"
      to="https://instagram.com/tetiana.grafova?igshid=MzRlODBiNWFlZA=="
    >
      <FaInstagram style={{ color: "#962fbf", marginTop: 6, fontSize: 20 }} />
    </NavLink>
  </StyledLink>
);
