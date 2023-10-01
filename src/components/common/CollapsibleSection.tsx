import React, { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { SubTitle } from "../../pages/AdminPage";

export const CollapsibleSectionWithTitle: React.FC<{
  textOnClosed: string;
  children: any;
  textOnOpen: string;
  title: string;
}> = ({ children, textOnOpen, textOnClosed, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [iconName, setIconName] = useState<string>("ChevronDown");

  const toggleState = () => {
    setIsOpen(!isOpen);
    setIconName(isOpen ? "ChevronDown" : "ChevronUp");
  };

  return (
    <div>
      <SubTitle>{title}</SubTitle>
      <DefaultButton
        iconProps={{ iconName: iconName }}
        styles={{
          root: {
            marginTop: "10px",
            minWidth: "80px",
            maxWidth: "600px",
            flex: "auto",
            width: "100%",
            margin: "5px",
          },
        }}
        text={isOpen ? textOnOpen : textOnClosed}
        onClick={toggleState}
      />
      {isOpen && children}
    </div>
  );
};
