/* eslint-disable no-use-before-define */
import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
  PiSpinner,
} from "pixel-kit";
import {
  FilterColumnProps,
  ApiResponse,
  UserListProps,
  SubmitFilterProps,
} from "@app/services/schema/schema";
import { triggerApi } from "@app/services/api-services";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { profileSchema } from "@app/modules/contacts/validation/contactValidation";
import {
  AssinToContainer,
  FilterFormFields,
  PiModalBodyMainContainer,
  SaveFilterFieldContainer,
} from "@app/components/savefiltermodel/savefiltermodel.component";
import CrossLogo from "../../assets/images/cross.svg";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "../fileuploadModel/fileuploadModel.component";

type Props = {
  label: string;
  onChildClick: any;
};

export default function SaveFilterModel({ label, onChildClick }: Props) {
  const [openModel, setOpenModel] = useState(false);
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
    filter_name: "",
    user_ids: [],
  };
  function handleSubmit(data: SubmitFilterProps) {
    let filterNames: Array<any> = [];
    if (data.user_ids.length) {
      filterNames = data.user_ids.map((obj: UserListProps) => obj.value);
    }

    // console.log(data.user_ids);
    // console.log(filterNames, data);
    // delete data.user_ids;
    const obj = {
      filter_name: data.filter_name,
      user_ids: filterNames,
    };
    onChildClick(obj);
  }
  function handleRef(e: any) {
    formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    const data = {
      filter_name: "",
      user_ids: [],
    };
    onChildClick(data);
  }
  return (
    <PiModal isOpen={openModel}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">Save View</PiTypography>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              {" "}
              <img src={CrossLogo} alt="loading" />{" "}
            </CloseButton>
          </PopupHeaderDiv>
        </PiModalHeader>
        <hr />
      </PopupHeaderContentDiv>

      <Formik
        validationSchema={profileSchema}
        onSubmit={(e: any) => handleSubmit(e)}
        initialValues={initialValues}
        innerRef={(e: any) => handleRef(e)}
      >
        {({ ...formikProps }: any) => (
          <>
            <PiModalBodyMainContainer>
              <PiModalBody>
                <SaveFilterFieldContainer>
                  <FilterForm label={label} />
                </SaveFilterFieldContainer>
              </PiModalBody>
            </PiModalBodyMainContainer>

            <PiModalFooter>
              <PiButton
                appearance="secondary"
                label="Cancel"
                onClick={() => closeModel()}
              />
              <PiButton
                appearance="primary"
                label="Create"
                onClick={formikProps.handleSubmit}
              />
            </PiModalFooter>
          </>
        )}
      </Formik>
    </PiModal>
  );
}

function FilterForm({ label }: any) {
  const [loading, setloading] = useState(true);
  const [usersList, setusersList] = useState([]);
  function getFilterData() {
    let arr = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${label.toLowerCase()}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          const list = response.result.data.users;
          arr = list.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name || "No Name",
          }));
          setusersList(arr);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getFilterData();
  }, []);

  return (
    <FilterFormFields>
      {loading && (
        <SpinnerDiv>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      {!loading && (
        <>
          <PiInputForm
            name="filter_name"
            label="Filter Name"
            libraryType="atalskit"
            type="text"
            placeholder="Enter Filter Name"
            isMandatory
          />
          <AssinToContainer id="456">
            <PiSelectForm
              name="user_ids"
              label="Assign To"
              placeholder="Select"
              isMulti
              options={usersList}
              classNamePrefix="react-select"
            />
          </AssinToContainer>
        </>
      )}
    </FilterFormFields>
  );
}
