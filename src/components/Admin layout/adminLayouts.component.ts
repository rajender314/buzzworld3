import styled from "styled-components";



export const TableListContainer = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    overflow:auto;
`;

export const SideMenuContainer = styled.div`
width: 280px;
background: #F9FBFF;
font-family: Inter;
.css-1n0f7c5 .menu-option .menu-item-single{
    background-color: #F9FBFF;
}
.css-1n0f7c5 .menu-option .menu-item-single.active{
    background-color: #E3EAF6;
    color: #1976D2;

}
.menu-list{
    color: #1976D2;
}
@media only screen and (max-width: 1366px){
    width: 280px;
    background: #F9FBFF;
    font-family: Inter;
    .css-1n0f7c5 .menu-option .menu-item-single{
        background-color: #F9FBFF;
    }
    .css-1n0f7c5 .menu-option .menu-item-single.active{
        background-color: #E3EAF6;
        color: #1976D2;
    
    }
    .menu-list{
        color: #1976D2;
    }   
}
`;

export const SideMenuList = styled.div`
    .active{
        color: blue
    }
    font-family: Inter;
}
`;
export const TableContainer = styled.div`
flex: 1;

.ag-header-cell-text{
    color:#6D7992;
}
.css-p150kv-ButtonBase{
    width: 100%;
}
.ag-theme-alpine .ag-header{
    // border: none;
}
.ag-root-wrapper-body{
    // border: none;
}
.ag-theme-alpine .ag-pinned-left-header{
    // border: none;
}
.ag-header-cell{
    display: inline-flex;
    align-items: center;
    position: absolute;
    height: 100%;
    overflow: hidden;
    transition: 0s !important;
    text-align: left !important;
    transition-timing-function: ease !important;
    padding: 5px;
}
.ag-header-cell-label {
    justify-content: left !important;
    color: #F7FAFF;
}
.ag-theme-alpine .ag-row{
    // border: none;
    // border-bottom-style: solid;
    // border-color:#F2F7FF;
    // height: 49px !important;
}
.css-7bttev-ButtonBase{
    width: 100%;
}
.ag-cell {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    // transition: 0.3s !important;
    transition-timing-function: ease !important;
    // text-align: left !important;
    font-family: Inter;
    line-height: 2;
    padding: 5px;
    border: 0px;
    // height: 32px;
}
.css-1h65th5-ButtonBase{
    width: 100%;
}
.css-152ppnk-ButtonBase{
    width: 100%;
}
.ag-style{
    padding: 24px;
}
.ag-theme-alpine .ag-paging-panel{
    // border-color: transparent !important;
}
// .ag-theme-alpine .ag-root-wrapper .ag-ltr .ag-layout-normal{
//     border: none !important;
// }
// .ag-theme-alpine .ag-root-wrapper{
//     border: none;
// }
.ag-theme-alpine{
    // height: 628px !important;
    // width: 954px !important;
    // border-color: transparent !important;
    // border: none !important;
}
::-webkit-scrollbar {
    width: 6px;
    height: 100px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(0, 0, 0, 0.4);
    border-radius: 6px;
  }
@media only screen and (min-width: 1440px){
    flex: 1;

    .ag-header-cell-text{
        color:#6D7992;
    }
    .css-p150kv-ButtonBase{
        width: 100%;
    }
    // .ag-theme-alpine .ag-header{
    //     border: none;
    // }
    // .ag-root-wrapper-body{
    //     border: none;
    // }
    // .ag-theme-alpine .ag-pinned-left-header{
    //     border: none;
    // }
    .ag-header-cell{
        display: inline-flex;
        align-items: center;
        position: absolute;
        height: 100%;
        overflow: hidden;
        transition: 0s !important;
        text-align: left !important;
        transition-timing-function: ease !important;
        padding: 5px;
    }
    .ag-header-cell-label {
        justify-content: left !important;
        color: #F7FAFF;
    }
    .ag-theme-alpine .ag-row{
        // border: none;
        // border-bottom-style: solid;
        // border-color:#F2F7FF;
        // height: 49px !important;
    }
    .css-7bttev-ButtonBase{
        width: 100%;
    }
    .ag-cell {
        display: inline-block;
        position: absolute;
        white-space: nowrap;
        // transition: 0.3s !important;
        transition-timing-function: ease !important;
        // text-align: left !important;
        font-family: Inter;
        line-height: 2;
        padding: 5px;
        border: 0px;
        // height: 32px;
    }
    .css-1h65th5-ButtonBase{
        width: 100%;
    }
    .css-152ppnk-ButtonBase{
        width: 100%;
    }
    .ag-style{
        padding: 24px;
    }
    .ag-theme-alpine .ag-paging-panel{
        // border-color: transparent !important;
    }
    .ag-theme-alpine .ag-root-wrapper .ag-ltr .ag-layout-normal{
        // border: none !important;
    }
    .ag-theme-alpine .ag-root-wrapper{
        // border: none;
    }
    .ag-theme-alpine{
        // height: 628px !important;
        // width: 954px !important;
        // border-color: transparent !important;
        // border: none !important;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 100px;
      }
      ::-webkit-scrollbar-track {
        border-radius: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background: rgb(0, 0, 0, 0.4);
        border-radius: 6px;
      }
  }
@media only screen and (max-width: 1366px){
    flex: 1;

    .ag-header-cell-text{
        color:#6D7992;
    }
    .css-p150kv-ButtonBase{
        width: 100%;
    }
    // .ag-theme-alpine .ag-header{
    //     border: none;
    // }
    // .ag-root-wrapper-body{
    //     border: none;
    // }
    // .ag-theme-alpine .ag-pinned-left-header{
    //     border: none;
    // }
    .ag-header-cell{
        display: inline-flex;
        align-items: center;
        position: absolute;
        height: 100%;
        overflow: hidden;
        transition: 0s !important;
        text-align: left !important;
        transition-timing-function: ease !important;
        
    }
    .ag-header-cell-label {
        justify-content: left !important;
        color: #F7FAFF;
    }
    .ag-theme-alpine .ag-row{
        // border: none;
        // border-bottom-style: solid;
        // border-color:#F2F7FF;
        // height: 49px !important;
    }
    .css-7bttev-ButtonBase{
        width: 100%;
    }
    .ag-cell {
        display: inline-block;
        position: absolute;
        white-space: nowrap;
        // transition: 0.3s !important;
        transition-timing-function: ease !important;
        // text-align: left !important;
        font-family: Inter;
        line-height: 2;
        padding: 5px;
        border: 0px;
        // height: 32px;
    }
    .css-1h65th5-ButtonBase{
        width: 100%;
    }
    .css-152ppnk-ButtonBase{
        width: 100%;
    }
    .ag-style{
        padding: 24px;
    }
    .ag-theme-alpine .ag-paging-panel{
        // border-color: transparent !important;
    }
    .ag-theme-alpine .ag-root-wrapper .ag-ltr .ag-layout-normal{
        // border: none !important;
    }
    .ag-theme-alpine .ag-root-wrapper{
        // border: none;
    }
    .ag-theme-alpine{
        // height: 628px !important;
        // width: 954px !important;
        // border-color: transparent !important;
        // border: none !important;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 100px;
      }
      ::-webkit-scrollbar-track {
        border-radius: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background: rgb(0, 0, 0, 0.4);
        border-radius: 6px;
      }
    }
`;

export const PageConatiner = styled.div`
width: 100%;
`;
export const NoItemContainer = styled.div`
width: 100%;
transform: translate(40%, 55%);

.no-items-found {
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 36px;
letter-spacing: 0px;
text-align: left;
color: #2E374A;

}
.max-size-note {
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
letter-spacing: 0px;
text-align: left;
color: #8E99B2;

}
@media only screen and (min-width: 1440px){
    width: 100%;
    transform: translate(40%, 55%);
    
    .no-items-found {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0px;
    text-align: left;
    color: #2E374A;
    
    }
    .max-size-note {
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #8E99B2;
    
    }
}
@media only screen and (max-width: 1366px){
    width: 100%;
transform: translate(40%, 55%);

.no-items-found {
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 36px;
letter-spacing: 0px;
text-align: left;
color: #2E374A;

}
.max-size-note {
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;
letter-spacing: 0px;
text-align: left;
color: #8E99B2;

}
}

`;
export const ButtonPi = styled.div`
text-align: end;
padding: 8px 2%!important;
justify-content: space-between;
align-items: center !important;
display: flex;
font-family: Inter;
.css-1h65th5-ButtonBase{
    margin-right: 16px;
}
.Disabled{
    background: #134C85!important;
    margin-right: 16px;
    opacity: 0.5;
}
@media only screen and (min-width: 1440px){
    text-align: end;
padding: 8px 2%!important;
justify-content: space-between;
align-items: center !important;
display: flex;
font-family: Inter;
.css-1h65th5-ButtonBase{
    margin-right: 16px;
}
.Disabled{
    background: #134C85!important;
    margin-right: 16px;
    opacity: 0.5;
}
}
@media only screen and (max-width: 1366px){
text-align: end;
padding: 8px 2%!important;
justify-content: space-between;
align-items: center !important;
display: flex;
font-family: Inter;
.css-1h65th5-ButtonBase{
    margin-right: 16px;
}
.Disabled{
    background: #134C85!important;
    margin-right: 16px;
    opacity: 0.5;
}
}
`;

export const Header = styled.div`
display: flex;
height: 84px;
justify-content: space-between;
border-bottom: 2px solid #eaeaea !important;
.krFIpQ {
    width: auto;
}
.tjRXE{
    padding-left: 0%;
}
.css-1ya7m8d{
    width : 30%;
    // margin-left: 8%;
}
.css-7no60z-ButtonBase{
    padding: inherit;
}
.css-clvj82{
    // transition: ease-in;
    height: auto;
    // padding: 5%;
    position: relative;
    width: max-content;
    top: 0px;
    line-height:20px;
}
@media only screen and (min-width: 1440px){
    display: flex;
    height: 84px;
    justify-content: space-between;
    border-bottom: 2px solid #eaeaea !important;
    .krFIpQ {
        width: auto;
    }
    .tjRXE{
        padding-left: 0%;
    }
    .css-1ya7m8d{
        width : 30%;
        // margin-left: 11.5%;
    }
    .css-7no60z-ButtonBase{
        padding: inherit;
    }
    .css-clvj82{
        // transition: ease-in;
        height: auto;
        // padding: 5%;
        position: relative;
        width: max-content;
        top: 0px;
        line-height:20px;
    }
}
@media only screen and (max-width: 1366px){
    display: flex;
height: 84px;
justify-content: space-between;
border-bottom: 2px solid #eaeaea !important;
.krFIpQ {
    width: auto;
}
.tjRXE{
    padding-left: 0%;
}
.css-1ya7m8d{
    width : 30%;
    // margin-left: 11.5%;
}
.css-7no60z-ButtonBase{
    padding: inherit;
}
.css-clvj82{
    // transition: ease-in;
    height: auto;
    // padding: 5%;
    position: relative;
    width: max-content;
    top: 0px;
    line-height:20px;
}
}
`;

export const ErrMsg = styled.p`
color: #AF1515;
padding: 1%;
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
@media only screen and (max-width: 1366px){
        color: #AF1515;
        padding: 1%;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
    }
`;


