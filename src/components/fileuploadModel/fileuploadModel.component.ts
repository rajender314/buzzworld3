import styled from "styled-components";

export const UploadModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        cursor: pointer;
    }
`;

export const ButtonDivTag = styled.div`
display: flex;
`;
export const TextEle = styled.div`
font-family: Inter
`;

export const ImgTag = styled.img`
display: flex;
cursor: pointer;
text-decoration: none;

// width: 36px;
// height: 36px;
// background: transparent;
// border: 2px solid #11508e;
// box-sizing: border-box;
// display: flex;
// align-items: center;
// justify-content: center;
// border-radius: 4px;
// margin-right: 4%;
}
`;

export const UploadImgDiv = styled.img`
cursor: pointer;
    // float: right;
    // position: relative;
    // bottom: 32px;
    // cursor: pointer;
`;

export const UploadNote = styled.small`
// font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 20px;

display: flex;
align-items: center;
text-align: center;
justify-content: center;

margin: 20px 0px;
color: #8E99B2;
`;


export const DragSection = styled.div`
font-family: Inter;
padding: 11px 21px;
border: 1px solid #6D7992;
margin-top: 11px;
.file-type-label {
    font-family: "Inter",sans-serif;
    font-style: normal;
    color: #6D7992;
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    margin: 0;
}
.branch-valid-msg {
    color: red;
    font-family: inter;
}

   
`;

export const UploadIcon = styled.img`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
   
`;
export const UploadIconNext = styled.img`
    position: absolute;
    top: 62px;
    left: 50%;
    transform: translateX(-50%);
   
`;

export const UploadDiv = styled.div`
font-family: Inter;
   position: relative;
   .invalid-file-error {
    text-align: center;
    color: #AF1515;
   }
   .valid-file {
    text-align: center;
    color: #068f06;
    margin: 2px 0;

   }
`;

export const ImportPopupContainer = styled.div`
font-family: 'Inter';
.branch{
    padding: 0px 10px;
    margin-left: 15px;
    display: flex;
    justify-content: flex-end;
}
.select-container{
    width: 300px;
    padding: 11px 21px;
    border: 1px solid #6D7992;
    display: flex;
}
.branch-label-container{
    display: flex;
    justify-content: flex-start;
    width: 100px;
    align-items: center;
}
.branch-label-container .label-text{
font-size: 14px;
font-weight: 700;
}
`;

export const RowContainer = styled.div`
   width: 100%;
   display: flex;
   padding: 24px;
   margin: 0 -16px;
   &>div{
       width: calc(100%/2 - 32px);
       margin: 0 16px;
   }
`

export const BrowseBtn = styled.label`
.browse-text {
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    margin: 0;

}
    width: 100%;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 8px;
    background: #134C85;
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
`;

export const InputEle = styled.input`

display: none;
`;
export const ProgressPercent = styled.p`

// font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0px;
color: #19836A;

`;
// f2f3f4
export const ErrorlogPanel = styled.div`
background: white;
border-radius: 8px;
// padding: 12px;
// margin-top: 16px;
&:last-of-type{
    margin-bottom: 16px;
}
.error-logs {
    color: red;
    padding: 10px 36px;
}
.prod-label {
     font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    color: #6D7992;
    margin: 0;
}
.error-list-table {
    display: flex;
    .error-name {
        padding: 10px;
        border: 1px solid;
        height: 34px;
        align-items: center;
        // display: flex;
    }
    .error-mismatch {
        background: #F8DBD9 ;
        padding: 10px;
        border: 0px;
        height: 34px;
        align-items: center;
        // display: flex;
        color: #DC4B43;
    }
}
.format-label {
    margin: 0;
    margin-bottom: 5px;
    color: #6D7992;
    font-weight: 600;
    font-size: 16px;
    font-family: "Inter"
}
.overflow-table{
    max-width: 100%;
    overflow-y: hidden !important;
    overflow: auto;
    margin-bottom: 16px;
    .error-list-table {
        width: 100%;
        border-collapse: collapse;
        height: 40px;
        font-family: "Inter";
        font-size: 14px;
        
        .error-name {
            padding: 8px;
            border: 1px solid #eaeaea;
            font-weight: 600;
            align-items: center;
            color: #6D7992;
            height: auto;
        }
        .error-mismatch {
            background: #F8DBD9 ;
            padding: 10px;
            border: 0px;
            height: 34px;
            align-items: center;
            // display: flex;
            color: #DC4B43;
            height: auto;
        }
    }
    thead {
        background: #f2f3f4;
    }

    tr {
        display: flex;
        height: 40px;
        background-color: white;
    }
}
.grid-div {
    margin: 10px 0;
    .model-ag-grid {
        span.ag-icon.ag-icon-menu {
            display: none !important;
        }
    }
}
`;

export const InsideHeaderLabel = styled.div`
color: violet;
margin-bottom: 16px;
.label-text{
    font-weight: 600;
    font-size: 14px;
    font-family: Inter
}
.description{
    font-weight: normal;
    font-size: 14px;
    font-family: Inter
}
`;

export const InsideHeaderLabelTwo = styled.div`
.label-text{
    font-weight: 600;
    font-size: 14px;
    font-family: Inter;
}
.description{
    font-weight: normal;
    font-size: 14px;
    font-family: Inter;
}
`;

export const ErrorLogDiv = styled.div`
display: flex;
&.error-msg {
    color: #DC4B43 !important;
    padding: 13px 5px;
    border: 1px solid #eaeaea;
    background: #F8DBD9 !important;
    border-radius: 3px;
    margin-bottom: 16px;
}
margin-top: 8px;
.log-status-text{
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #068f06;;
}
.viewerror-text {
    color: blue;
    padding: 2px 3px;
    text-decoration: underline;
    cursor: pointer;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}
.error-log-text {
    color: #DC4B43;
    padding: 2px 12px;
}

`;
export const FooterBtn = styled.div`
padding: 10px;

`;
export const ProductsListDiv = styled.div`
max-height: 200px;
    overflow-y: scroll;
`;
export const SpinnerDiv = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    min-height: 102px;
    // min-height: px;
    flex-direction: column;
`;
export const DatePickerDiv = styled.div`
display: flex;
margin: 0 -8px;
&>div{
    width: calc(100%/2 - 16px);
    margin: 0 8px !important;
}
.css-1g807k0 {
    margin-left: 4px;
}
`;
export const ServerValidation = styled.p`
    color: red;
`

export const DateStyles = styled.div`
small {
    margin: 8px;
    color: red;
    font-family: inter;
}
  
`
export const CodeMismatchError = styled.div`
    div {
        display: flex;
    }
`

export const PiLabelName = styled.div`
    p {
       margin: 0 !important;
    }
`;

export const PopupHeaderDiv = styled.div`
width: 100%;
text-align: center;
hr{
    margin:0;
}
`;
