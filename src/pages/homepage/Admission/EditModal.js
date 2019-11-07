import React from "react";
import InfoForm from "./InfoForm";

const EditInterface = props => {
  const { type, companyKey: key } = props;
  const handleEdit = userInfo => {
    console.log(userInfo);
  };
  return (
    <InfoForm
      companyKey={type === "edit" ? key : ""}
      onSaveEdition={handleEdit}
    />
  );
};
export default EditInterface;
