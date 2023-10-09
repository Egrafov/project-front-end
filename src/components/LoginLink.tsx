import { NavLink } from "react-router-dom";
import { ImUser } from "react-icons/im";
import { StyledLink } from "../components/common/Styles";

export const LoginLink = () => (
  <StyledLink>
    <NavLink to="/login">Login/Register</NavLink>
    <ImUser style={{ marginTop: 2, fontSize: 20 }} />
  </StyledLink>
);
