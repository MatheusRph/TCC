'use client'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import style from './page.module.css'


export default function MyInput({
  title,
  name,
  value,
  onChange,
  isValid,
  feedback = 'Campo preenchido',
  ...rest
}) {
  return (
    <Form.Group
      as={Col}
      md="4"
      controlId={`validationFormik${name}`}
      className={`w-75 ${style.form}`}
    >
      <Form.Label className="">{title}</Form.Label>
      <Form.Control
        className=""
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        isValid={isValid}
        {...rest}
      />
      <Form.Control.Feedback>{feedback}</Form.Control.Feedback>
    </Form.Group>
  );
}
