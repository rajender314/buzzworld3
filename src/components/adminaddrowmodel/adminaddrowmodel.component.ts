import styled from "styled-components";



export const TableListContainer = styled.div`
    display: flex;
    width: 100%;
   
`;

export const SideMenuContainer = styled.div`
width: 280px;
`;

export const SideMenuList = styled.div`
    .active_item {
        color: blue
    }
}
`;
export const TableContainer = styled.div`
width: 100%;

`;
export const PageConatiner = styled.div`
width: 100%;
`;
export const FilterFormFields = styled.div`
width: 100%;
height: inherit;

// align-items: center;
// text-align: -webkit-center;
// display: flex;
`;
export const ButtonsBody = styled.div`
width: inherit;
gap: inherit;
.Secondary{
    line-height: 2rem;
}
.Primary{
    margin-left:10px;
}
`;

export const InnerBody = styled.div`
width: 80%;
// display: flex;
flex-direction: column;
height: 250px;
justify-content: space-between;
display: flex;
`;

export const InnerBodyQuantity = styled.div`
width: 80%;
// display: flex;
flex-direction: column;
// height: 250px;
justify-content: space-between;
display: flex;
`;

export const HeaderText = styled.div`
text-align: center;
// display: none
`;

export const CloseButton = styled.span`
position: absolute;
right: 4%;
color: red;
cursor: pointer;
.Hover{
    color: red;
    cursor: pointer;
}
@media only screen and (min-width: 1440px){
    position: absolute;
    right: 4%;
    color: red;
    cursor: pointer;
    .Hover{
        color: red;
        cursor: pointer;
    }
}
@media only screen and (max-width: 1366px){
    position: absolute;
right: 4%;
color: red;
cursor: pointer;
.Hover{
    color: red;
    cursor: pointer;
}
}
`;
export const ShowMessage = styled.span`
font-size: 10px;
height: 40px;
right: 100% !important;
padding: 1%;
width: fit-content;
// background-color: white;
.css-cni8ru-SectionMessage{
    padding: 0px !important;
    position: relative !important;
}
@media only screen and (min-width: 1440px){
    font-size: 10px;
    height: 40px;
    right: 100% !important;
    padding: 1%;
    width: fit-content;
    // background-color: white;
    .css-cni8ru-SectionMessage{
        padding: 0px !important;
        position: relative !important;
        top: 0px;
    }
}
@media only screen and (max-width: 1366px){
    font-size: 10px;
    height: 40px;
    right: 100% !important;
    padding: 1%;
    width: fit-content;
    // background-color: white;
    .css-cni8ru-SectionMessage{
        padding: 0px !important;
        position: relative !important;
        top: 0px;
    }
}
`;
export const ErrorMessage = styled.span`
font-size: 10px;
width: max-content;
position: absolute;
top: 75px;
.css-clvj82{
    // transition: ease-in;
    height: auto;
    // padding: 5%;
    position: inherit;
    width: max-content;
    // top: 0px;
    line-height:20px;
}
line-height: 20px;
.css-cni8ru-SectionMessage{
    padding: 0px !important;
    // position: relative;
    // top:0px;
}
@media only screen and (min-width: 1440px){
    font-size: 10px;
    width: max-content;
    position: absolute !important;
    top: 0px;
    .css-clvj82{
        // transition: ease-in;
        height: auto;
        // padding: 5%;
        position: inherit;
        width: max-content;
        // top: 0px;
        line-height:20px;
    }
    line-height: 20px;
    .css-cni8ru-SectionMessage{
        padding: 0px !important;
        // position: relative;
        // top: 0px;
    }
}
@media only screen and (max-width: 1366px){
    font-size: 10px;
    width: max-content;
    position: absolute;
    top: 0px;
    .css-clvj82{
        // transition: ease-in;
        height: auto;
        // padding: 5%;
        position: inherit;
        width: max-content;
        // top: 0px;
        line-height:20px;
    }
    line-height: 20px;
    .css-cni8ru-SectionMessage{
        padding: 0px !important;
        position: relative;
        // top: 0px;
    }
}
@media only screen and (max-width: 768px){
top: 85px;
right: 89px;
}
`;
export const Popup = styled.div`
top: 30%;
height: 100%
`;