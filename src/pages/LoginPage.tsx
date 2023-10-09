import { DefaultButton, IButtonStyles } from "@fluentui/react";
import React, { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, SubTitle, SuccessMessage } from "./AdminPage";
import axios from "axios";
import { MyFooter } from "../components/MyFooter";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../Routes";
import { StyledInput } from "../components/common/Styles";
import { MainTitle } from "../components/MainTitle";

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
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginFailure, setIsLoginFailure] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexFlow: "column", minHeight: "100vh" }}>
      <MainTitle />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          fontWeight: 600,
        }}
      >
        <form>
          <Border>
            <SubTitle>Sign in</SubTitle>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label style={{ paddingTop: 5 }}>
                Email or user name:
                <StyledInput
                  type="text"
                  value={userNameLogin}
                  onChange={(e: any) => setUserNameLogin(e.target.value)}
                />
              </label>

              <label style={{ paddingTop: 5, paddingBottom: 15 }}>
                Password:
                <StyledInput
                  type="password"
                  value={passwordLogin}
                  onChange={(e: any) => setPasswordLogin(e.target.value)}
                />
              </label>
            </div>
            <DefaultButton
              styles={buttonStyle}
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
              Login
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
              styles={buttonStyle}
              onClick={() => setIsCreatingUser(true)}
            >
              Create your Gelix account
            </DefaultButton>
          </Border>
          {isCreatingUser && (
            <Border>
              <div
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <SubTitle>Create account</SubTitle>
                <label style={{ paddingTop: 5 }}>
                  User Name:
                  <StyledInput
                    type="text"
                    value={userName}
                    onChange={(e: any) => setUserName(e.target.value)}
                  />
                </label>
                <label style={{ paddingTop: 5 }}>
                  Password:
                  <StyledInput
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </label>
                <label style={{ paddingTop: 5 }}>
                  First Name:
                  <StyledInput
                    type="text"
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                  />
                </label>
                <label style={{ paddingTop: 5 }}>
                  Last Name:
                  <StyledInput
                    type="text"
                    value={lastName}
                    onChange={(e: any) => setLastName(e.target.value)}
                  />
                </label>
                <label style={{ paddingTop: 5 }}>
                  Phone:
                  <StyledInput
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                  />
                </label>
                <label style={{ paddingTop: 5, paddingBottom: 15 }}>
                  Address:
                  <StyledInput
                    value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                  />
                </label>
                <DefaultButton
                  styles={buttonStyle}
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
              </div>
            </Border>
          )}
          {isUserCreated && (
            <SuccessMessage>New user created successfully!</SuccessMessage>
          )}
        </form>
      </div>
      <MyFooter />
    </div>
  );
};

const buttonStyle: IButtonStyles = {
  root: {
    width: "100%",
    fontWeight: 600,
  },
};

const Border = styled.div`
  border: 2px solid lightgrey;
  width: 400px;
  padding: 50px;
  margin: 5px;
  border-radius: 8px;
`;

const Discription = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 3px;
  color: blue;
`;
