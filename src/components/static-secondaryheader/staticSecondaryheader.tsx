import {PiTypography, PiSearch, PiButton} from 'pixel-kit';
import {Fragment, useState, useEffect} from 'react';
import React from 'react';
import {
  SecondaryHeaderContainer,
  LeftContent,
  RightContent,
  SaveViewDiv,

} from './staticSecondaryHeader.component';

import {AddProps, PageProps, RowDataProps} from 'src/services/schema/schema';
import {triggerApi} from 'src/services/api-services';

import AddRowModel from 'src/components/adminaddrowmodel';

import {
  ApiResponse,
} from 'src/services/schema/schema';
import Snackbar from 'src/components/Snackbar/snackbar';

type Props = {
  logo: string;
  data: string;
  searchEvent: (e: string) => {};
  props: PageProps;
  gridData: any;
};

export default function StaticSecondaryHeader({
  logo,
  data,
  searchEvent,
  props,
  gridData,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  let [pageLabel, setPageLabel] = useState(data);
  let [openModel, setOpenModel] = useState(false);
  let [Api, setApi] = useState('');
  let [rowData, setRowData] = useState<Array<RowDataProps>>([]);
  let toastProps = {
    appearance: 'error',
    message: '',
  };
  let showToast = false;

  function getFilterData() {
    if (props.pageLabel === 'Account_Types') {
      Api = `v1/AccountTypes`;
      setApi(Api);
    } else if (props.pageLabel === 'Classifications') {
      Api = `v1/Classifications`;
      setApi(Api);
    } else if (props.pageLabel === 'Industry') {
      Api = `/v1/Industry`;
      setApi(Api);
    } else if (props.pageLabel === 'Sales_Potential') {
      Api = `/v1/SalesPotential`;
      setApi(Api);
    } else if (props.pageLabel === 'Contact_Types') {
      Api = `/v1/ContactTypes`;
      setApi(Api);
    } else if (props.pageLabel === 'PO_Min_Qty') {
      Api = `/v1/Quantity`;
      setApi(Api);
    }
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: Api,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          rowData = response.result.data.list;
          setRowData(rowData);
          // gridEvent.api.refreshCells(rowData)

        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function onAdd() {
    setOpenModel(true);
  }

  async function getModelEvent(e: AddProps) {
    // console.log(e);
    if (Object.keys(e).length) {
      // setTimeout(() => {
      //   getFilterData()
      // }, 500);
      setOpenModel(false);
      // onChildClick(e);
    } else {
      setOpenModel(false);
    }
  }


  function valueChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    let keyword = e.target.value;

    // setSearchValue(e.target.value);

    setTimeout(() => {
      searchEvent(keyword);
    }, 100);
  }
  function clearSearch() {
    setSearchValue('');
    searchEvent('');
  }
  // console.log(props);

  useEffect(() => {
    // setSearchValue(searchkey);
    getFilterData();
    if (
      data === 'Account_Types' ||
      data === 'Classifications' ||
      data === 'Contact_Types' ||
      data === 'Industry' ||
      data === 'PO_Min_Qty' ||
      data === 'Sales_Potential'
    ) {
      pageLabel = 'Admin';
      setPageLabel(pageLabel);
    } else {
      pageLabel = data;
      setPageLabel(pageLabel);
    }
  }, []);

  return (
    <Fragment>
      <SecondaryHeaderContainer>
        <LeftContent>
          <img src={logo} alt='loading'/>
          <PiTypography component='h1'>{pageLabel}</PiTypography>
        </LeftContent>
        <RightContent>
          <PiSearch
            libraryType='atalskit'
            onClear={clearSearch}
            onValueChange={e => valueChanged(e)}
            placeholder='Search'
            value={searchValue}
          />

          <PiButton
            appearance='primary'
            label='Add'
            libraryType='atalskit'
            onClick={onAdd}
            className='save-view'
          />
          <SaveViewDiv>
            {openModel && (
              <AddRowModel
                data={openModel}
                // userList={userList}
                onChildClick={getModelEvent}
                gridData={(data: Array<AddProps>) => gridData(data)}
                props={props} 
               {...showToast && <Snackbar {...toastProps}></Snackbar>}
              ></AddRowModel>
              
            )}
            
          </SaveViewDiv>
        </RightContent>
      </SecondaryHeaderContainer>
    </Fragment>
  );
}