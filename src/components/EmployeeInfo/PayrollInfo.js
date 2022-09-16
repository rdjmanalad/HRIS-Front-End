import React from "react";
import {
  Card,
  Form,
  FormGroup,
  Row,
  Col,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import ModalPromoTransferHist from "./ModalPromoTransferHist";

class PayrollInfo extends React.Component {
  render() {
    const empData = this.props.empData;
    return (
      <Card className={" border-dark bg-dark text-white"}>
        <Card.Body>
          <Form as={Row}>
            <FormGroup as={Row}>
              <FormGroup as={Col}>
                <label className="asHeader">Original Company</label>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Group Code
                  </FormLabel>
                  <Col>
                    <FormSelect className="inpHeightXs"></FormSelect>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Company Code
                  </FormLabel>
                  <Col>
                    <FormSelect className="inpHeightXs"></FormSelect>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Branch Code
                  </FormLabel>
                  <Col>
                    <FormSelect className="inpHeightXs"></FormSelect>
                  </Col>
                </FormGroup>
              </FormGroup>
              <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                <label className="asHeader">Actual Company</label>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Group Code
                  </FormLabel>
                  <Col>
                    <FormSelect className="inpHeightXs"></FormSelect>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Company Code
                  </FormLabel>
                  <Col>
                    <FormSelect className="inpHeightXs"></FormSelect>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Branch Code
                  </FormLabel>
                  <Col>
                    <FormSelect className="inpHeightXs"></FormSelect>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
            <FormGroup as={Row}>
              <label
                className="asHeader"
                style={{
                  "margin-top": "5px",
                  "margin-left": "6px",
                  "padding-right": "0px",
                }}
              >
                Present Payroll Information
              </label>
              <FormGroup as={Col}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Prepare Date
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.schedIn}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Date Effect
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.schedOut}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Rank/Level
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.rank}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Tax Code
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.taxCode}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Exemption
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.exemption}
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
              {/* new column   ################################## */}
              <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Basic Pay
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.basicPay}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    E-COLA
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.cola}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Allow1-Meal
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.allowance1}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Allow2-Night
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.allowance2}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Coop Contr.
                  </FormLabel>
                  <Col>
                    <FormControl className="inpHeightXs"></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
              {/* new column   ################################## */}
              <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Job Position
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.phone}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Act. Nature
                  </FormLabel>
                  <Col>
                    <FormControl className="inpHeightXs"></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Remarks
                  </FormLabel>
                  <Col>
                    <FormControl
                      as="textarea"
                      rows={2}
                      className="inpHeightXs"
                      style={{ height: "60px" }}
                      value={empData.remarks}
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
            <Col column sm="4">
              <ModalPromoTransferHist />
            </Col>
            <Col />
            <Col />
            <Col column sm="2">
              <button
                type="submit"
                className="btn btn-success btn-sm float-right"
                style={{ width: "80px", "margin-top": "5px" }}
              >
                Save
              </button>
            </Col>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default PayrollInfo;
