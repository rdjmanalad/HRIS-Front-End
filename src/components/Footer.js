import React from "react";

import {Navbar, Container, Col} from 'react-bootstrap';

class Footer extends React.Component{
    render(){
        let year = new Date().getFullYear();
        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col className="text-center text-muted">
                        <div>{year} All Rights Reserved by CompanyName</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}

export default Footer;