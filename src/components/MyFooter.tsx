import React from "react";
import styled from "styled-components";

export const MyFooter: React.FC = () => (
  <StyledDCopyrightFooter>
    © 2023 Gelix Ltd. All rights reserved.
  </StyledDCopyrightFooter>
);

const StyledDCopyrightFooter = styled.div`
  color: #886863;
  background-color: #f3d3d8;
  padding: 10px;
  text-align: center;
`;
