import styled from "styled-components";


export const LabelNamesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border: 1px solid #E3EAF6;
    background: #F9FBFF;
    padding: 20px;
    margin-bottom: 24px;
    .div{
        display: flex;
    }
    .label-text{
        font-weight: 700;
        font-size: 14px;
        font-family: Inter;
        color: #4E586D;

    }
    .description{
        font-weight: normal;
        font-family: Inter;
    }
`;
export const ModelGridDiv = styled.div`
padding-bottom: 24px;
   .ag-theme-alpine {
    // height: 27vh !important;
   }
   .ag-cell {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    // transition: 0.3s !important;
    transition-timing-function: ease !important;
    text-align: right !important;
    font-family: Inter;
    line-height: 20px;
    padding: 5px;
    border: 0px;
    height: 32px;
}
.ag-header-cell-label{
    color: #6D7992;
}
`;


