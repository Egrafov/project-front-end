import React, { useContext } from "react";
import { ImUser, ImBin, ImHeart } from "react-icons/im";
import { FaSearch, FaFacebook, FaInstagram } from "react-icons/fa";
import { useId } from "@fluentui/react-hooks";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./styles.css";
import { Title } from "./pages/AdminPage";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import styled from "styled-components";
import { MyFooter } from "./components/MyFooter";
import { UserContext } from "./Routes";
initializeIcons();

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles = {
  root: { display: "inline-block" },
};

const Header = () => {
  // axios.get("http://127.0.0.1:8080/products").then((s) => console.log(s));
  const loggedInUser = useContext(UserContext);
  console.log("products loggedInUser");
  console.log(loggedInUser);
  return (
    <header
      style={{
        backgroundColor: "#f3d3d8",
        padding: "10px",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",

          alignItems: "center",
        }}
      >
        <Title>GeliX</Title>
        <SearchBar />
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            justifyContent: "flex-end",
            alignItems: "right",
            color: "#d69987",
            marginLeft: "20px",
            position: "relative",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {loggedInUser ? (
            <div>
              Hello {loggedInUser.firstName}
              {loggedInUser && loggedInUser.isAdmin && " You're ADMIN !!!"}
            </div>
          ) : (
            <>
              <NavLink to="/login" color="#886863">
                Login/Signup
              </NavLink>
              <ImUser />
            </>
          )}
          {/* <NavLink to="/products" title="Wishlist" color="#886863" />
          <a
            href="/login"
            style={{
              color: "#d69987",
            }}
          >
            <ImHeart />
          </a>
          <NavLink to="/bag" title="Items in Bag" color="#886863" />
          <a
            href="/login"
            style={{
              color: "#d69987",
            }}
          >
            <ImBin />
          </a> */}
        </ul>
      </div>
      <SecondaryNav />
    </header>
  );
};

export const SearchBar = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexGrow: "1" }}>
      <input
        type="text"
        placeholder="Search by id or name"
        style={{
          marginRight: "10px",
          marginLeft: "20px",
          padding: "5px",
          color: "#886863",
        }}
      />
      <FaSearch style={{ color: "#886863" }} />
    </div>
  );
};

const SecondaryNav = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#886863",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            alignItems: "center",

            padding: "0",
            margin: "0",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontWeight: "600",
            color: "#886863",
          }}
        >
          <NavLink to={"/products"} style={{ color: "#886863" }}>
            Products
          </NavLink>
          <NavLink to={"/aboutUs"} style={{ color: "#886863" }}>
            About us
          </NavLink>
          <NavLink
            to="/contactUs"
            title="Contact Us"
            style={{ color: "#886863" }}
          >
            Contact us
          </NavLink>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/tanya.grafova"
          >
            <FaFacebook style={{ color: "blue" }} />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://instagram.com/tetiana.grafova?igshid=MzRlODBiNWFlZA=="
          >
            <FaInstagram />
          </a>
        </ul>
      </nav>
    </div>
  );
};

const MainSection = () => {
  return (
    <div
      style={{
        minHeight: "400px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "#bbccdc",
          paddingTop: "30px",
        }}
      >
        Free shipping from 100${" "}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src="pictures/9.jpg" alt="picture" />
        <Image src="pictures/N.jpg" alt="picture" />
        <Image src="pictures/5.jpeg" alt="picture" />
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          color: "lightblue",
          paddingBottom: "30px",
        }}
      >
        Popular Categories
      </div>

      <div
        className="collectionList"
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="picture and label">
          <div className="CollectionImage">
            <CategoriesImage src="pictures/12.jpeg" alt="picture" />
          </div>

          <Link
            to="/products/moshe"
            style={{
              display: "block",
              textAlign: "center",
              color: "#886863",
              cursor: "pointer",
            }}
          >
            Acrilic Nails
          </Link>
        </div>
        <div className="picture and label">
          <div
            className="CollectionImage"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CategoriesImage src="pictures/15.jpeg" alt="picture" />
          </div>
          <Link
            to="/products/moshe"
            style={{
              display: "block",
              textAlign: "center",
              color: "#886863",
              cursor: "pointer",
            }}
          >
            Manicure
          </Link>
        </div>
        <div className="picture and label">
          <div
            className="CollectionImage"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CategoriesImage src="pictures/6.jpeg" alt="picture" />
          </div>
          <Link
            to="/products/moshe"
            style={{
              display: "block",
              textAlign: "center",
              color: "#886863",
              cursor: "pointer",
            }}
          >
            Pedicure
          </Link>
        </div>
        <div className="picture and label">
          <div
            className="CollectionImage"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CategoriesImage src="pictures/14.jpeg" alt="picture" />
          </div>
          <Link
            to="/products/moshe"
            style={{
              display: "block",
              textAlign: "center",
              color: "#886863",
              cursor: "pointer",
            }}
          >
            Nail Art
          </Link>
        </div>
      </div>
    </div>
  );
};

interface ImageProps {
  src: string;
  alt: string;
  style?: any;
}
const Image: React.FC<ImageProps> = ({ src, alt, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "300px", height: "300px", padding: 30, ...style }}
    />
  );
};

const CategoriesImage: React.FC<ImageProps> = ({ src, alt, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "400px",
        height: "300px",
        padding: "20px",
        margin: "30px",
        ...style,
      }}
    />
  );
};

function openNewPage() {
  //Replace "https://example.com" with the desired URL
  window.open("http://localhost:3000/", "blank");
}

export const MyComponent = () => {
  const tooltipId = useId("tooltip");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* <TooltipHost
        content={"This is the tooltip content"}
        // This id is used on the tooltip itself, not the host
        // (so an element with this id only exists when the tooltip is shown)
        id={tooltipId}
        // calloutProps={calloutProps}
        // styles={hostStyles}
      >
        <div>Test</div>
      </TooltipHost> */}

      <div style={{ flex: 1 }}>
        <Header />
        <MainSection />
      </div>
      <MyFooter />
    </div>
  );
};

export const Logo = styled.div`
  font-size: 50;
  color: "#cb502e";
  font-family: "Chilanka";
  margin-right: "auto";
  margin-left: 40;
  display: "flex";
  flex-grow: 10;
  gap: "20px";
`;
