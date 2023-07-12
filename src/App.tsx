import React from "react";
import { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";

import { ImUser, ImBin, ImHeart } from "react-icons/im";
import { FaSearch, FaFacebook, FaInstagram } from "react-icons/fa";
import { TooltipHost, ITooltipHostStyles } from "@fluentui/react/lib/Tooltip";
import { useId } from "@fluentui/react-hooks";
import axios from "axios";
import { Link } from "react-router-dom";
// import ProductCard from "./ProductCard";

import "./styles.css";
import { Title } from "./pages/AdminPage";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import styled from "styled-components";
import { MyFooter } from "./components/MyFooter";
initializeIcons();

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles = {
  root: { display: "inline-block" },
};

const Header = () => {
  // axios.get("http://127.0.0.1:8080/products").then((s) => console.log(s));
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
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#d69987",
          }}
        >
          <NavItem link="/login" label="Login/Signup" />
          <ImUser />
          <NavItem link="/products" label="Wishlist" />
          <ImHeart />
          <NavItem link="/bag" label="Count of Items in Bag" />
          {/* <IconWithCount initialValue={5} /> */}
          <ImBin />
        </ul>
      </div>
      <SecondaryNav />
    </header>
  );
};
// const IconWithCount = ({ initialValue }: { initialValue: number }) => {
//   const [count, setCount] = useState<number>(initialValue);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   const decrementCount = () => {
//     if (count > 0) {
//       setCount(count - 1);
//     }
//   };

// return (
//   <div style={{ position: "relative" }}>
//     <ImBin />
//     {count > 0 && (
//       <span
//         style={{
//           position: "absolute",
//           top: "-8px",
//           right: "-8px",
//           backgroundColor: "red",
//           color: "white",
//           borderRadius: "50%",
//           padding: "4px",
//           fontSize: "12px",
//         }}
//       >
//         {count}
//       </span>
//     )}
//     <button onClick={incrementCount}>+</button>
//     <button onClick={decrementCount}>-</button>
//   </div>
// );
// };
const SearchBar = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search by id or name"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <FaSearch />
    </div>
  );
};

const NavItem = ({ link, label }: { link: string; label: string }) => {
  return <a href={link}>{label}</a>;
};

const SecondaryNav = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            color: "#876863",
          }}
        >
          <NavItem link="/products/:category" label="Categories" />
          <NavItem link="/bestSellers" label="Best Sellers" />
          <NavItem link="/sales" label="Hot sales" />
          <NavItem link="/newIn" label="New In" />
          <NavItem link="/aboutUs" label="About Us" />
          <NavItem link="/contact" label="Contact Us" />
          <li>
            <a href="https://www.facebook.com/tanya.grafova">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/tetiana.grafova?igshid=MzRlODBiNWFlZA==">
              <FaInstagram />
            </a>
          </li>
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
        {/* <Image src="pictures/9.jpg" alt="picture" />
        <Image src="pictures/N.jpg" alt="picture" />
        <Image src="pictures/5.jpeg" alt="picture" /> */}
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
          // overflow: "inherit",
          // whiteSpace: "normal",
          flexWrap: "wrap",
          // listStyle: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="picture and label">
          <div className="CollectionImage">
            <CategoriesImage src="pictures/1.png" alt="picture" />
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
            <CategoriesImage src="pictures/1.png" alt="picture" />
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
            <CategoriesImage src="pictures/1.png" alt="picture" />
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
            <CategoriesImage src="pictures/1.png" alt="picture" />
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

const Image = ({ src, alt, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "300px", height: "300px", padding: 30, ...style }}
    />
  );
};
const CategoriesImage = ({ src, alt, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "300px", height: "200px", ...style }}
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
      <div>
        <TooltipHost
          content={"This is the tooltip content"}
          // This id is used on the tooltip itself, not the host
          // (so an element with this id only exists when the tooltip is shown)
          id={tooltipId}
          calloutProps={calloutProps}
          styles={hostStyles}
        ></TooltipHost>
      </div>

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
