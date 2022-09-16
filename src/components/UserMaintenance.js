import React from "react";
import { Row } from "react-bootstrap";
import "../css/userMaintenance.css";

class UserMaintenance extends React.Component{
    render(){
        return(
            <div className="formDiv">
                <form>
                    <Row>
                        <h2>USERS DATA</h2>
                    </Row>
                    <div>
                        <label>Last Name</label>
                        <input type="text" className="inputLong"></input>
                        <br></br>
                        <label>First Name</label>
                        <input type="text" className="inputLong"></input>
                        <br></br>
                        <label>Middle Name</label>
                        <input type="text" className="inputLong"></input>
                    </div>
                    <br></br>
                    <div>
                        <label>E-mail</label>
                        <input type="text" className="inputLong"></input>
                        <br></br>
                        <label>Username</label>
                        <input type="text" className="inputLong"></input>
                        <br></br>
                        <label>Password</label>
                        <input type="text" className="inputLong"></input>
                    </div>
                    <tr>
                        <td>
                        <label>Password</label>
                        <input type="text" className="inputLong"></input>
                        </td>
                        <td>
                        <label>Password</label>
                        <input type="text" className="inputLong"></input>
                        </td>
                    </tr>
                    <div>
                        <label>Birthday</label>
                        <input type="date"></input>
                    </div>
                </form>
            </div>
        )
    }

}

export default UserMaintenance;