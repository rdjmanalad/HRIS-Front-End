import React, { useState, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export const DropSelect = ({ options, placeholder, onChange }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const typeaheadRef = useRef();

  //   const handleChange = (selected) => {
  //     setSelectedOption(selected);
  //     onChange(selected);
  //   };
  const handleChange = (selected) => {
    setSelectedOption(selected);
    const selectedValue = selected.length > 0 ? selected[0].label : "";
    // alert(selected);
    onChange(selected);
  };

  const handleInputClick = () => {
    typeaheadRef.current?.clear();
    setSelectedOption("");
  };

  return (
    <div>
      <Typeahead
        style={{
          marginTop: "6px",
          height: "22px",
          backgroundColor: "lightgray",
          borderRadius: "2px",
          fontWeight: "500",
        }}
        id="my-typeahead"
        onChange={handleChange}
        options={options}
        selected={selectedOption}
        placeholder={placeholder}
        ref={typeaheadRef}
        onFocus={handleInputClick}
      />
    </div>
  );
};
