import React, { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import axios from "axios";
import { CollapsibleSectionWithTitle } from "../common/CollapsibleSection";
import { SuccessMessage } from "../../pages/AdminPage";
import { StyledInput } from "../common/Styles";
import styled from "styled-components";

export const CreateProduct: React.FC = () => {
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File>();

  return (
    <CollapsibleSectionWithTitle
      title="Create product"
      textOnOpen="Close product creation"
      textOnClosed="Open product creation"
    >
      <ProductCreationDiv>
        <label>
          Category:
          <StyledInput
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Name:
          <StyledInput
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <StyledInput
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Price:
          <StyledInput
            type="number"
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Image
          <div>
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <DefaultButton
                  onClick={() => setSelectedImage(undefined)}
                  text="Remove image"
                />
              </div>
            )}
            <br />
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event?.target?.files?.[0]);
                setSelectedImage(event?.target?.files?.[0]!);
              }}
            />
          </div>
        </label>
      </ProductCreationDiv>
      <DefaultButton
        styles={{ root: { margin: 6 } }}
        disabled={
          !category || !name || !description || !price || !selectedImage
        }
        text="Create product"
        onClick={() => {
          axios
            .post(
              "http://localhost:8080/products",
              {
                name: name,
                description: description,
                price: price,
                category: category,
                uploadImage: selectedImage,
              },
              { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((s) => {
              setIsProductCreated(true);
              console.log(s);
            })
            .catch((x) => console.log(x));
        }}
      />
      {isProductCreated && (
        <SuccessMessage>Product created successfully!</SuccessMessage>
      )}
    </CollapsibleSectionWithTitle>
  );
};

export const ProductCreationDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 10px;
  flex-direction: column;
  min-width: 100px;
  max-width: 600px;
  margin: 6px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 600;
`;
