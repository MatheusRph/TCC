'use client'

import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


export function MyNavbar() {
    return (
        <>
            <Navbar className="mynav">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image alt='logo' layout="intrinsic" width={120} height={120} src={"/logo.png"}></Image>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <h1>COND TRACK</h1>                   
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}