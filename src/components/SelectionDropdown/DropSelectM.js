import React, { useState, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export const DropSelectM = ({ options, placeholder, onChange, typeId }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const typeaheadRef = useRef();

  const handleChange = (selected) => {
    // setSelectedOption(selected);
    var selectedValue = "";
    var selecttedName = "";
    if (typeId === "region") {
      selectedValue = selected.length > 0 ? selected[0].region_id : "";
      selecttedName = selected.length > 0 ? selected[0].name : "";
    } else if (typeId === "province") {
      selectedValue = selected.length > 0 ? selected[0].province_id : "";
    }
    onChange(selectedValue + "#" + selecttedName);
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
        labelKey={(option) => `${option.name}`}
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
