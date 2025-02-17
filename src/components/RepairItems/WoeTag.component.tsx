import styled from "styled-components";

const WoeTagBody = styled.div`
  width: 240px;
  height: 444px;
  padding: 19px;
  /* border: 1px solid; */

  @media print {
    .header {
      -webkit-print-color-adjust: exact;
      background-color: #000;
      color: #fff;
      /* padding: 6px; */
      padding: 2px 6px;

      font-size: 16px;

      text-align: left;
      line-height: 24px;
      font-weight: 700;
    }
    .body {
      /* background: #fff; */
      color: #000;
      font-size: 16px;
      font-weight: 400;
      /* padding: 6px; */
      /* background-color: yellow; */
      padding: 4px 6px;

      line-height: 15px;
      text-transform: capitalize;

      display: flex;
      flex-direction: column;
      .body_description:not(:last-child) {
        margin-bottom: 4px;
      }
      .body_descriptions:not(:last-child) {
        margin-bottom: 6px;
      }

      .body_description,
      .body_descriptions {
        display: flex;
        text-align: left;
        line-height: 15px;

        text-transform: capitalize;
        /* margin-bottom: 8px; */

        div:first-child {
          width: 30%;
        }
      }
    }
  }
  .data {
    display: flex;
    flex-direction: column;
    p {
      margin: 0px;
    }
  }
  .qr {
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    /* filter: contrast(200%) brightness(100%);
    filter: grayscale(0); */

    filter: blur(0);
    -webkit-filter: blur(0);
    transform: translateZ(0);
    -webkit-transform: translateZ(0);

    /* Safari seems to support, but seems deprecated and does the same thing as the others. */
    image-rendering: -webkit-optimize-contrast;
  }
`;

export default WoeTagBody;
