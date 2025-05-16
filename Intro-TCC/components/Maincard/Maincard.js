'use client'

import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'

export default function Maincard({src, children, alt, buttonText}) {
    return (
        <>
            <Card className='retangulo border-0 rounded-4 justify-content-center align-items-center'>
                <Container className='bloco w-75 mt-3 justify-content-center align-items-center'>
                    <Image width={120} height={10} layout='intrinsic' alt={alt} variant="top" src={src}></Image>
                </Container>
                <Card.Body className='w-100 text-reset'>
                    <Card.Text className='text-center fs-5 descript'>
                        {children}
                    </Card.Text>
                    <div className='d-flex justify-content-center align-items-center'> 
                    <Button className='rounded-5 w-50 button'>{buttonText}</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}