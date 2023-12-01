import styled from "styled-components";
import { SubTitle } from "./AdminPage";
import { MyFooter } from "../components/MyFooter";
import { MainTitle } from "../components/MainTitle";
import { NavLink } from "react-router-dom";
import { StyledLink } from "../components/common/Styles";

export const AboutUsPage = () => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <MainTitle />
    <SubTitle>About us</SubTitle>
    <StyledLink>
      <NavLink to={"/"}> Home page</NavLink>
    </StyledLink>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "row",
      }}
    >
      <img
        src="pictures/9.jpg"
        alt=""
        style={{ marginBottom: "20px", width: "30%", margin: "20px" }}
      />
      <Text>
        At Gelix Store online, you will find an amazing resource for high
        quality nail art supplies to support your business. We provide a variety
        of cutting-edge nail salon supplies and accessories for both classic
        looks and the latest trends. Find everything you need to expand your
        product line, or start up a new salon. Some of our best-selling products
        include those from our Skylux line, the world's first LED gel system,
        and those from our Nail de Dance line, the #1 selling acrylic system in
        Ukraine.
        <br />
        Our products are tested and curated for performance and ease-of-use.
        <br />
        We are always looking to improve our company and welcome feedback from
        you, our valued customers, the best way for us to meet your needs is to
        know specifically what you want, so please don't hesitate to leave your
        comments or questions.
      </Text>
    </div>
    <MyFooter />
  </div>
);

export const Text = styled.div`
  color: rgb;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: auto;
  flex-wrap: wrap;
  display: flex;
  padding: 30px;
  margin: 50px;
  margin: 5px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  font-weight: 600;
`;
