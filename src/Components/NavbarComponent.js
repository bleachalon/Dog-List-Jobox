import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * Render Navigation bar with title and breed filter
 * @param breeds list of breeds
 * @param keywords user's choice of breeds to filter
 * @param Onchange change keywrod to user's choice
 * @returns {*}
 * @constructor
 */
const NavbarComponent =({breeds, keywords, Onchange}) =>
    <div>
        <Navbar className="bg-light justify-content-between" fixed={"top"}>
            <Navbar.Brand href="#home">Dog List</Navbar.Brand>
            <Form inline>
                <Form.Group controlId="formGridState">
                    <Form.Label style={{marginRight:"1rem"}}>Breed</Form.Label>
                    <Form.Control value={keywords} as="select" onChange={(e)=>Onchange(e)}>
                        <option>Choose...</option>
                        {breeds.map( (breed) =>
                            <option key={breed} value={breed}>{breed}</option> )}
                    </Form.Control>
                </Form.Group>
                <a href={`/${keywords}`}><Button>Search</Button></a>
            </Form>
        </Navbar>
    </div>



export default NavbarComponent;
