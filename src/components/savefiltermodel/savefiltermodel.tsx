import React, {useState, Fragment, useEffect, useRef} from 'react';
import { Formik } from 'formik';
import CrossLogo from '../../assets/images/cross.svg';
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
} from 'pixel-kit';
import {
  FilterColumnProps,
  ApiResponse,
  UserListProps,
  SubmitFilterProps,
} from 'src/services/schema/schema';
import {triggerApi} from 'src/services/api-services';
import EndpointUrl from 'src/core/apiEndpoints/endPoints';
import {profileSchema} from 'src/modules/contacts/validation/contactValidation';
import {FilterFormFields} from 'src/components/savefiltermodel/savefiltermodel.component';
import {CloseButton} from '../adminaddrowmodel/adminaddrowmodel.component';
import { PopupHeaderDiv } from '../fileuploadModel/fileuploadModel.component';

type Props = {
  data: boolean;
  onChildClick: (e: SubmitFilterProps) => {};
};

export default function SaveFilterModel({ data, onChildClick }: Props) {
  const [openModel, setOpenModel] = useState(false);
  // console.log(data);
  // console.log(userList);
  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  useEffect(() => {
    setOpenModel(true);
  }, []);

  const formik = useRef<any>(null);
  // console.log(formik);
  const initialValues = {
    filter_name: '',
    user_ids: [],
  };
  function handleSubmit(data: SubmitFilterProps) {
    console.log(data);

    let filterNames: Array<any> = [];
    if (data.user_ids.length) {
      filterNames = data.user_ids.map((obj: UserListProps) => {
        return obj.value;
      });
    }

    // console.log(data.user_ids);
    // console.log(filterNames, data);
    // delete data.user_ids;
    data = {
      filter_name: data.filter_name,
      user_ids: filterNames,
    };
    onChildClick(data);
  }
  function handleRef(e: any) {
    console.log(e);

    formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    let data = {
      filter_name: '',
      user_ids: [],
    };
    onChildClick(data);
  }
  return (
    <Fragment>
      <PiModal isOpen={openModel}>
        <PiModalHeader>
          <PopupHeaderDiv>
          {/* <HeaderText> */}
            {
              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                {' '}
                <img src={CrossLogo} alt="loading"></img>{' '}
              </CloseButton>
            }
            <PiTypography component="h4">Save View</PiTypography>
            <hr />
          {/* </HeaderText> */}
          </PopupHeaderDiv>
        </PiModalHeader>
        <PiModalBody>
          {/* <PiForm
            initialValues={initialValues}
            validationSchema={null}
            handleSubmit={handleSubmit}
            component={FilterForm}
            handleRef={handleRef}
          ></PiForm> */}

          <Formik
            validationSchema={profileSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            innerRef={handleRef}
          >
            {({ ...formik }: any) => {
              return (
                <>
                  <FilterForm />
                  <PiModalFooter>
                    <PiButton
                      appearance="secondary"
                      label="Cancel"
                      onClick={closeModel}
                    />
                    <PiButton
                      appearance="primary"
                      label="Create"
                      onClick={formik.handleSubmit}
                    />
                  </PiModalFooter>
                </>
              );
            }}
          </Formik>
        </PiModalBody>
      </PiModal>
    </Fragment>
  );
}

const FilterForm = () => {
  // console.log(onChildClick);

  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  // console.log(userList);
  let [usersList, setusersList] = useState([]);
  //let [userlistResponse, setUserlistResponse] = useState([]);

  useEffect(() => {
    getFilterData();
  }, []);
  function getFilterData() {
    let arr = [];
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.filterDataApi}?name=contacts`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let list = response.result.data.users;
          console.log(list);
          // if (list.length) {
          //   list.unshift({ id: "all", name: "Select All" });
          // }
          //setUserlistResponse(list);
          arr = list.map((item: FilterColumnProps) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          // arr = usersList;
          setusersList(arr);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  return (
    <FilterFormFields>
      <PiInputForm
        name="filter_name"
        label="Filter Name"
        libraryType="atalskit"
        type="text"
        placeholder="Filter Name"
      />

      <PiSelectForm
        name="user_ids"
        label="Assign To"
        placeholder="Select"
        isMulti={true}
        options={usersList}
      />
    </FilterFormFields>
  );
};
