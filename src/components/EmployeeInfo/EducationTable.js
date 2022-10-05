import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";

function EducationTable(empNo) {
  const [eduList, setEduList] = useState([]);

  function getData() {
    axios
      .get("http://localhost:8080/api/att/attainmentEDU/" + empNo, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setEduList(data);
      })
      .catch((message) => {
        alert(message);
      });
  }

  useEffect(() => {
    getData();
  }, [empNo]);

  return (
    <div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        Table-sm
        style={{ height: "10rem" }}
      >
        <thead>
          <tr>
            <th>From Date</th>
            <th>To Date</th>
            <th>School</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {eduList.length === 0 ? (
            <tr align="center">
              <td colSpan={"5"}>No School Found</td>
            </tr>
          ) : (
            eduList.map((school) => (
              <tr key={school.id}>
                <td>{school.from}</td>
                <td>{school.to}</td>
                <td>{school.schoolName}</td>
                <td>{school.course}</td>
                <td>
                  <ButtonGroup>
                    <Button size="sm" variant="primary">
                      Edit
                    </Button>
                    {"  "}
                    <Button size="sm" variant="outline-danger">
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default EducationTable;
