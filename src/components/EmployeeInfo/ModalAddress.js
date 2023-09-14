import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Col,
  FormGroup,
  Row,
  FormLabel,
  FormControl,
} from "react-bootstrap";
// import { DropSelectM } from "../SelectionDropdown/DropSelectM";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import PopUpMsg from "../ModalAlerts/PopUpMsg";

function ModalAddress({ closeAddress, address, setAddr }) {
  const [regions, setRegions] = useState("");
  const [provinces, setProvinces] = useState("");
  const [cities, setCities] = useState("");
  const [barangays, setBarangays] = useState("");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const baseURL = localStorage.getItem("baseURL");

  const [name, setRegName] = useState("");

  const [selectedReg, setSelectedReg] = useState("");
  const regRef = useRef();

  const [selectedProv, setSelectedProv] = useState("");
  const provRef = useRef();

  const [selectedMun, setSelectedMun] = useState("");
  const munRef = useRef();

  const [selectedBrgy, setSelectedBrgy] = useState("");
  const brgyRef = useRef();

  const [selectedOd, setSelectedOd] = useState("");
  const odRef = useRef();

  var [regV, setRegV] = useState("");
  var [proV, setProV] = useState("");
  var [munV, setMunV] = useState("");
  var [brgV, setBrgV] = useState("");

  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");

  // const [selectedReg, setSelectedOptio] = useState([]);

  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {
    if (regions) {
      getProvinces();
    }
  }, [region]);

  useEffect(() => {
    if (provinces) {
      getCities();
    }
  }, [province]);

  useEffect(() => {
    if (cities) {
      getBarangays();
    }
  }, [city]);

  const getRegions = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/address/regions").then((response) => {
      setRegions(response.data);
      console.log("REGIONS::" + response.data);
    });
  };

  const getProvinces = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios.get(baseURL + "/api/address/provinces/" + region).then((response) => {
      setProvinces(response.data);
      console.log(response.data);
    });
  };
  const getCities = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/address/cities/" + province).then((response) => {
      setCities(response.data);
      console.log(response.data);
    });
  };
  const getBarangays = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/address/barangays/" + city).then((response) => {
      setBarangays(response.data);
      console.log(response.data);
    });
  };

  const regChange = (selected) => {
    if (selected.length > 0) {
      setRegion(selected[0].region_id);
      setRegV(selected[0].name);
    }
    setSelectedReg(selected);
    provClick();
    munClick();
    brgyClick();
  };

  const regClick = () => {
    regRef.current?.clear();
    setSelectedReg("");
  };

  const provChange = (selected) => {
    if (selected.length > 0) {
      setProvince(selected[0].province_id);
      setProV(selected[0].name);
    }
    setSelectedProv(selected);
    munClick();
    brgyClick();
  };

  const provClick = () => {
    provRef.current?.clear();
    setSelectedProv("");
  };

  const munChange = (selected) => {
    if (selected.length > 0) {
      setCity(selected[0].city_id);
      setMunV(selected[0].name);
    }
    setSelectedMun(selected);
    brgyClick();
  };

  const munClick = () => {
    munRef.current?.clear();
    setSelectedMun("");
  };

  const brgyChange = (selected) => {
    if (selected.length > 0) {
      setCity(selected[0].barangay_id);
      setBrgV(selected[0].name);
    }
    setSelectedBrgy(selected);
  };

  const brgyClick = () => {
    brgyRef.current?.clear();
    setSelectedBrgy("");
  };

  const putAddress = () => {
    if (regV === "" || proV === "" || munV === "") {
      setMessage("Region, Province, City/Municipality is Required.");
      setShowMsg(true);
    } else {
      var add =
        odRef.current.value + " " + brgV + " " + munV + " " + proV + " " + regV;
      address = add;
      setAddr(add.toUpperCase().trim());
      closeAddress(false);
    }
  };

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Modal
        show={true}
        onHide={() => closeAddress(false)}
        variant="dark"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Input Address</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-dark bg-dark text-white">
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Region
            </FormLabel>
            <Col>
              <Typeahead
                style={{ textTransform: "uppercase" }}
                className="dropDownList"
                labelKey={(option) => `${option.name}`.toUpperCase()}
                id="regionId"
                onChange={regChange}
                options={!regions ? [] : regions}
                selected={selectedReg}
                placeholder={"Choose a Region..."}
                ref={regRef}
                onFocus={regClick}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Province
            </FormLabel>
            <Col>
              <Typeahead
                style={{ textTransform: "uppercase" }}
                className="dropDownList"
                labelKey={(option) => `${option.name}`.toUpperCase()}
                id="provinceId"
                onChange={provChange}
                options={
                  !provinces
                    ? [{ id: 0, name: "Choose Region First!" }]
                    : provinces
                }
                selected={selectedProv}
                placeholder={"Choose a Province..."}
                ref={provRef}
                onFocus={provClick}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              City/Municipality
            </FormLabel>
            <Col>
              <Typeahead
                style={{ textTransform: "uppercase" }}
                className="dropDownList"
                labelKey={(option) => `${option.name}`.toUpperCase()}
                id="cityId"
                onChange={munChange}
                options={
                  !cities ? [{ id: 0, name: "Choose Province First!" }] : cities
                }
                selected={selectedMun}
                placeholder={"Choose a City/Mun..."}
                ref={munRef}
                onFocus={munClick}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Barangay
            </FormLabel>
            <Col>
              <Typeahead
                style={{ textTransform: "uppercase" }}
                className="dropDownList"
                labelKey={(option) => `${option.name}`.toUpperCase()}
                id="barangayId"
                onChange={brgyChange}
                options={
                  !barangays
                    ? [{ id: 0, name: "Choose City/Mun. First!" }]
                    : barangays
                }
                selected={selectedBrgy}
                placeholder={"Choose a Barangay..."}
                ref={brgyRef}
                onFocus={brgyClick}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              House No./Street/Building...
            </FormLabel>
            <Col>
              <textarea
                type="textarea"
                ref={odRef}
                className="dropDownList"
                style={{
                  padding: "0px 0px 0px 5px",
                  width: "292px",
                  height: "50px",
                  textTransform: "uppercase",
                }}
                // onChange={(event) => (user.role = event.target.value)}
              ></textarea>
            </Col>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer className="border-dark bg-dark text-white">
          {/* <Button variant="primary" onClick={() => closeAddress(false)}>
            Close
          </Button> */}
          <div style={{ display: "flex" }}>
            <button
              type="submit"
              className="btn btn-secondary btn-md buttonRight"
              style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
              onClick={() => closeAddress(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-md "
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => putAddress()}
            >
              Ok
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
    </div>
  );
}

export default ModalAddress;
