import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import {
  Card,
  FormControl,
  FormLabel,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

export const GroupList = () => {
  const groupCodeRef = useRef();
  const groupNameRef = useRef();
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/groups").then((response) => {
      setGroups(response.data);
      console.log(response.data);
    });
  };

  function setRowGroup(row) {
    setGroup(row);
    groupCodeRef.current.value = row.new;
    groupNameRef.current.value = row.f4;
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowGroup(row);
      // setId(row.employeeNo);
      return true;
    },
    style: { width: "20px" },
  };
  const columns = [
    {
      // dataField: "username",
      dataField: "new",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group list",
      }),
      style: { width: "100px", textAlign: "center" },
    },
    {
      // dataField: "currentGroup",
      dataField: "f4",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group name",
      }),
      style: { paddingLeft: "10px" },
    },
  ];

  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body style={{ paddingTop: "0px" }}>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Group Information
          </label>
          <FormGroup
            as={Row}
            style={{ paddingRight: "0px", justifyContent: "center" }}
          >
            <FormGroup as={Row}>
              <FormLabel column sm="1" className="noWrapText">
                Group Code
              </FormLabel>
              <Col sm="2">
                <FormControl
                  ref={groupCodeRef}
                  className="inpHeightXs"
                  // onChange={(event) =>
                  //   (empData.paddress = event.target.value)
                  // }
                ></FormControl>
              </Col>
              <FormLabel column sm="1" className="noWrapText">
                Group Name
              </FormLabel>
              <Col>
                <FormControl
                  ref={groupNameRef}
                  className="inpHeightXs"
                  onChange={(event) => (group.paddress = event.target.value)}
                ></FormControl>
              </Col>
            </FormGroup>
          </FormGroup>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Group List
          </label>
          <Container>
            <BootstrapTable
              id="bsTable"
              // keyField="userId"
              keyField="new"
              data={groups}
              columns={columns}
              striped
              hover
              condensed
              pagination={paginationFactory({
                paginationSize: 3,
                hideSizePerPage: true,
                withFirstAndLast: true,
                sizePerPageList: [
                  {
                    text: "12",
                    value: 12,
                  },
                  {
                    text: "15",
                    value: 5,
                  },
                ],
              })}
              filter={filterFactory()}
              rowStyle={{ padding: "1px" }}
              rowClasses="empTableRow"
              headerClasses="empTableHeader"
              selectRow={selectRowProp}
              // rowEvents={ rowEvents }
            ></BootstrapTable>
          </Container>
          {/* <Card
            className={" border-dark bg-dark text-white"}
            style={{ height: "500px" }}
          >
            <Form id="addUserId">
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th style={{ width: "260px" }}>Group Code</th>
                      <th>Group Name</th>
                      <th style={{ width: "120px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.length === 0 ? (
                      <tr align="center">
                        <td colSpan={"2"}>No Groups Found</td>
                      </tr>
                    ) : (
                      groups.map((group) => (
                        <tr key={group?.id}>
                          <td>{group?.new}</td>
                          <td>{group?.f4}</td>
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
              </Card.Body>
            </Form>
          </Card> */}
        </Card.Body>
      </Card>
    </div>
  );
};
