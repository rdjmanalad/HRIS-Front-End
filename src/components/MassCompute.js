import React, { useRef, useEffect } from "react";
import axios from "axios";

export const MassCompute = () => {
  const callMassCompute = () => {
    // alert(localStorage.getItem("PPFrom"));
    // alert(localStorage.getItem("FilterValue"));
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .post(
        "http://localhost:8080/api/massCompute/" +
          localStorage.getItem("userId") +
          "/" +
          localStorage.getItem("PPFrom") +
          "/" +
          localStorage.getItem("FilterValue")
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <button onClick={() => callMassCompute()}>Mass Compute</button>
    </div>
  );
};
