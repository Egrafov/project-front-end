import { DefaultButton } from "@fluentui/react";
import React, { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, StyledDiv, SubTitle, SuccessMessage } from "./AdminPage";
import axios from "axios";
import { MyFooter } from "../components/MyFooter";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../Routes";
import { StyledInput } from "../components/common/Styles";

export interface User {
  password: string;
  userName: string;
  hashPassword: string;
  salt: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}

export const LoginPage: React.FC<{
  onLoginSucces: (user: LoggedUser | null) => void;
}> = ({ onLoginSucces }) => {
  const [password, setPassword] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginFailure, setIsLoginFailure] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState<string>("");

  const navigate = useNavigate();

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
        <form>
          <Border>
            <SubTitle>Sign in</SubTitle>
            <StyledDiv
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
                  type="text"
                  value={userNameLogin}
                  onChange={(e: any) => setUserNameLogin(e.target.value)}
                />
              </label>

              <label>
                Password:
                <StyledInput
                  type="password"
                  value={passwordLogin}
                  onChange={(e: any) => setPasswordLogin(e.target.value)}
                />
              </label>
            </StyledDiv>
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
              onClick={() => {
                axios
                  .post(
                    "http://localhost:8080/users/login",
                    {
                      userName: userNameLogin,
                      password: passwordLogin,
                    },
                    { headers: { "Content-Type": "application/json" } }
                  )
                  .then((s) => {
                    console.log("Success");
                    setIsLoginSuccess(true);
                    navigate("/");
                    console.log(s);
                    onLoginSucces(s.data);
                  })
                  .catch((x) => {
                    console.log("ERROR");
                    setIsLoginFailure(true);
                    console.log(x);
                  });
              }}
            >
              Login{" "}
            </DefaultButton>
            {isLoginSuccess && (
              <SuccessMessage>Login successfully!</SuccessMessage>
            )}
            {isLoginFailure && (
              <ErrorMessage>
                Wrong credentials for the user or the user does not exists,
                please register
              </ErrorMessage>
            )}
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
            <Border>
              <StyledDiv
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  flexDirection: "column",

                  width: "100%",
                }}
              >
                <SubTitle>Create account</SubTitle>
                <label>
                  User Name:
                  <StyledInput
                    type="text"
                    value={userName}
                    onChange={(e: any) => setUserName(e.target.value)}
                  />
                </label>
                <label>
                  Password:
                  <StyledInput
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </label>
                <label>
                  First Name:
                  <StyledInput
                    type="text"
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                  />
                </label>

                <label>
                  Last Name:
                  <StyledInput
                    type="text"
                    value={lastName}
                    onChange={(e: any) => setLastName(e.target.value)}
                  />
                </label>

                <label>
                  Phone:
                  <StyledInput
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                  />
                </label>
                <label>
                  Address:
                  <StyledInput
                    value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                  />
                </label>
                <DefaultButton
                  styles={{ root: { marginTop: "10px" } }}
                  text="Create new user"
                  onClick={async () => {
                    if (
                      !userName ||
                      !firstName ||
                      !lastName ||
                      !address ||
                      !password ||
                      !phone
                    ) {
                      setRegisterErrorMessage(
                        "All fields are needed for registeration"
                      );
                      return;
                    }
                    let salt = "";
                    let hashPassword = "";
                    try {
                      salt = await bcrypt.genSalt(10);
                      hashPassword = await bcrypt.hash(password, salt);
                      console.log("Hashed password:", hashPassword);
                    } catch (error) {
                      alert("Error hashing password: " + error);
                    }

                    axios
                      .post(
                        "http://localhost:8080/users",
                        {
                          userName: userName,
                          firstName: firstName,
                          lastName: lastName,
                          phone: phone,
                          address: address,
                          salt: salt,
                          hashPassword: hashPassword,
                        },
                        { headers: { "Content-Type": "application/json" } }
                      )
                      .then((s) => {
                        setIsSavedSuccess(true);
                        setIsUserCreated(true);
                        setIsCreatingUser(false);
                        setRegisterErrorMessage("");
                      })
                      .catch((x) => {
                        if (x.response.status === 409) {
                          setRegisterErrorMessage(
                            "User with this name already exists - choose different one"
                          );
                        }
                        console.log(x);
                      });
                  }}
                />
                {registerErrorMessage && (
                  <ErrorMessage>{registerErrorMessage}</ErrorMessage>
                )}
              </StyledDiv>
            </Border>
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

const Discription = styled.div`
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 600;
  padding-top: 20px;
  color: blue;
`;
