import { useContext } from "react";
import styled from "styled-components";
import { Orders } from "../components/admin-page/Orders";
import { Inventory } from "../components/admin-page/Inventory";
import { CreateProduct } from "../components/admin-page/CreateProduct";
import { NavLink } from "react-router-dom";
import { MainTitle } from "../components/MainTitle";
import { UserContext } from "../Routes";
import { LoginLink } from "../components/LoginLink";
import { StyledLink } from "../components/common/Styles";

export const AdminPage = () => {
  const loggedInUser = useContext(UserContext);
  const userHasAccess = loggedInUser?.isAdmin;

  return (
    <div>
      <TitleWrapper>
        <MainTitle />
        <StyledLink>
          <NavLink to={"/"}>Shopping</NavLink>
        </StyledLink>
        {userHasAccess ? <></> : <LoginLink />}
      </TitleWrapper>
      {userHasAccess ? (
        <>
          <CreateProduct />
          <Inventory />
          <Orders />
        </>
      ) : (
        <ErrorMessage style={{ fontSize: 25 }}>
          You don't have access to this page
        </ErrorMessage>
      )}
    </div>
  );
};

const TitleWrapper = styled.section`
  padding: 1em;
  background: #f4f6f7;
`;

export const SubTitle = styled.div`
  padding: 1em;
  color: #886863;
  font-family: Chilanka;
  font-weight: bold;
  font-size: 20px;
  background: #f3d3d8;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
`;

export const SuccessMessage = styled(Message)`
  color: green;
`;

export const ErrorMessage = styled(Message)`
  color: red;
`;
