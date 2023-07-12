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

// export interface Order {
//   id: number;
//   orderDate: Date;
//   userName: string;
//   totalSum: number;
//   address: string;
// }

export interface User {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // "user" or "admin"
  const [users, setUsers] = useState<User[]>([]);

  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const addUser = (e) => {
    e.preventDefault();
    const newUser = {
      //   id: Date.now(),
      userName,
      password,
      firstName,
      lastName,
      phone,
      address,
      isAdmin,
    };
    setUsers([...users, newUser]);
    // Clear the form inputs
    setUserName("");
    setPassword("lk");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    setIsAdmin("");
    setIsCreatingUser(false);
  };

  const fetchUser = () => {
    axios
      .get("http://localhost:8080/users")
      .then((s) => {
        setUserType(s.data);
        console.log(s);
      })
      .catch((x) => console.log(x));
  };

  const handleLogin = () => {
    // Perform login logic here, such as making API requests to authenticate the user/admin
    // You can use the email, password, and userType state variables for the login process
    // You can also redirect the user to a different page after successful login
    console.log("Login button clicked");
    console.log("User Type:", userType);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSavedSuccess}
        <form onSubmit={addUser}>
          <Border>
            {/* <Title>GeliX</Title> */}
            <SubTitle>Sing in</SubTitle>
            <ProductCategory
              style={{
                flexWrap: "wrap",
                display: "flex",
                flexDirection: "column",
                fontWeight: 600,
                justifyContent: "spaceBetween",
                alignItems: "selfEnd",
                flexGrow: 10,
                marginTop: "10px",
                minWidth: "80px",
                maxWidth: "600px",
                flex: "auto",
                width: "100%",
                margin: "5px",
              }}
            >
              <label>
                Email or user name:
                <StyledInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                Password:
                <StyledInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </ProductCategory>
            <DefaultButton
              styles={{
                root: {
                  marginTop: "10px",
                  minWidth: "80px",
                  maxWidth: "600px",
                  flex: "auto",
                  width: "100%",
                  margin: "5px",
                  fontWeight: 600,
                },
              }}
              onClick={handleLogin}
            >
              Login{" "}
            </DefaultButton>

            <Discription>New customer? Start here</Discription>
            <DefaultButton
              styles={{
                root: {
                  marginTop: "10px",
                  minWidth: "80px",
                  maxWidth: "600px",
                  flex: "auto",
                  width: "100%",
                  margin: "5px",
                  fontWeight: 600,
                },
              }}
              onClick={() => setIsCreatingUser(true)}
            >
              Create your Gelix account{" "}
            </DefaultButton>
          </Border>
          {isCreatingUser && (
            <Border1>
              <ProductCategory
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: 600,
                  justifyContent: "spaceBetween",
                  alignItems: "selfEnd",
                  flexGrow: 10,
                  marginTop: "10px",
                  minWidth: "80px",
                  maxWidth: "600px",
                  flex: "auto",
                  width: "100%",
                  margin: "5px",
                }}
              >
                <SubTitle>Create account</SubTitle>
                <label>
                  User Name:
                  <StyledInput
                    type="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>
                <label>
                  Password:
                  <StyledInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label>
                  First Name:
                  <StyledInput
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label>
                  Last Name:
                  <StyledInput
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label>
                  Phone:
                  <StyledInput
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <label>
                  Address:
                  <StyledInput
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <DefaultButton
                  styles={{ root: { marginTop: "10px" } }}
                  text="Create new user"
                  onClick={() => {
                    axios
                      .post(
                        "http://localhost:8080/users",
                        {
                          userName: userName,
                          firstName: firstName,
                          lastName: lastName,
                          phone: phone,
                          address: address,
                        },
                        { headers: { "Content-Type": "application/json" } }
                      )
                      .then((s) => {
                        setIsSavedSuccess(true);
                        setIsUserCreated(true);
                        setIsCreatingUser(false);
                        console.log(s);
                      })
                      .catch((x) => console.log(x));
                  }}
                />
              </ProductCategory>
            </Border1>
          )}
          {isUserCreated && (
            <SuccessMessage>New user created successfully!</SuccessMessage>
          )}
        </form>
      </div>
      <MyFooter />
    </>
  );
};

const Border = styled.h1`
  border: 2px solid lightgrey;
  width: 400px;
  height: auto;
  padding: 50px;
  margin: 5px;
  border-radius: 8px;
`;
const Border1 = styled.h1`
  border: 2px solid lightgrey;
  width: 400px;
  height: auto;
  padding: 50px;
  margin: 5px;
  border-radius: 8px;
`;
const Discription = styled.div`
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 600;
  padding-top: 20px;
  color: blue;
`;
