import styled from "styled-components";

const PreviewContainer = styled.div`
  position: relative;
  max-width: 600px;
  .preview-image {
    height: 100%;
    max-width: 100%;
  }
  .cross-img {
    height: 24px;
    position: absolute;
    right: 0;
    background: #ffffff;
    cursor: pointer;
    border: 1px solid #cccccc;
  }
`;
export default PreviewContainer;
