import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Link,
} from "@fluentui/react";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ProductCategory,
  StyledInput,
  SubTitle,
  SuccessMessage,
  Title,
} from "./AdminPage";
import axios from "axios";
import { Logo } from "../App";
import { MyFooter } from "../components/MyFooter";
export const AboutUsPage = () => {
  return (
    <>
      <Title> Gelix</Title>
      <SubTitle> About us</SubTitle>
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "50vh",
      //   flexDirection: "row",
      // }}
      >
        {/* <div style={{ width: "100%", textAlign: "center", margin: "20px" }}> */}
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
            src="pictures/1.png"
            alt="picture"
            style={{ marginBottom: "20px", width: "20%", margin: "20px" }}
          />
          <div>
            <Text>
              At Gelix Store online, you will find an amazing resource for high
              quality nail art supplies to support your business. We provide a
              variety of cutting-edge nail salon supplies and accessories for
              both classic looks and the latest trends. Find everything you need
              to expand your product line, or start up a new salon. Some of our
              best-selling products include those from our Skylux line, the
              world's first LED gel system, and those from our Nail de Dance
              line, the #1 selling acrylic system in Ukraine. Our products are
              tested and curated for performance and ease-of-use.{" "}
            </Text>
            <Text>
              We are always looking to improve our company and welcome feedback
              from you, our valued customers -- the best way for us to meet your
              needs is to know specifically what you want, so please don’t
              hesitate to leave your comments or questions.
            </Text>
          </div>
        </div>
      </div>
      <MyFooter />
    </>
  );
};
export const Text = styled.div`
  color: rgb;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: auto;
  flex-wrap: wrap;
  /* min-width: 100px;
  max-width: 600px; */
  display: flex;
  padding: 30px;
  margin: 50px;
  /* justify-content: spaceEvenly;
  align-items: selfEnd; */
  /* flex-grow: 10; */
  margin: 5px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  font-weight: 600;
`;
