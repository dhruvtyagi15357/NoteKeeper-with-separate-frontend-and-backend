import React from "react";

const capitalize = (word) => {
  word = word.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};

function Alert(props) {
  return (
    props.alert && (
      <></>
    )
  );
}

export default Alert;
