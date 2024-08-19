import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Ensure to create and import your custom CSS file.

export default function Register({registerIn}) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        usernameErr: '',
        useremailErr: '',
        userpassErr: '',
        userErrRole: '',
        clientErrors: {}
    });

    const runValidations = () => {
        const errors = {};
        if (form.username.trim().length === 0) {
            errors.username = 'Username is required';
        }
        if (form.email.trim().length === 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(form.email)) {
            errors.email = 'Invalid email format';
        }
        if (form.password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'Password must be between 8 to 128 characters';
        }
        if (form.role.trim().length === 0) {
            errors.role = 'Role is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clientErrors = runValidations();
        setForm({ ...form, clientErrors });
        if (Object.keys(clientErrors).length === 0) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/register', form);
                console.log(response.data);
                registerIn()
                navigate('/login');
            } catch (err) {
                if (err.response && err.response.data && err.response.data.errors) {
                    const errors = err.response.data.errors;
                    const usernameError = errors.find((ele) => ele.path === 'username');
                    const userEmailError = errors.find((ele) => ele.path === 'email');
                    const userpassErr = errors.find((ele) => ele.path === 'password');
                    const roleErr = errors.find((ele) => ele.path === 'role');

                    setForm({
                        ...form,
                        usernameErr: usernameError ? usernameError.msg : '',
                        useremailErr: userEmailError ? userEmailError.msg : '',
                        userpassErr: userpassErr ? userpassErr.msg : '',
                        userErrRole: roleErr ? roleErr.msg : ''
                    });
                } else {
                    console.error(err);
                }
            }
        }
    };

    const userRoles = [
        { name: 'Admin', value: 'Admin' },
        { name: 'Candidate', value: 'Candidate' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <Container className="register-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 register-card">
                <h2 className="text-center mb-4">Register with us</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Enter username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={form.username}
                            placeholder="username"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['username'] || !!form.usernameErr}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['username'] || form.usernameErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Enter email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            placeholder="email"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['email'] || !!form.useremailErr}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['email'] || form.useremailErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={form.password}
                            placeholder="password"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['password'] || !!form.userpassErr}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['password'] || form.userpassErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="role">
                        <Form.Label>Select role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['role'] || !!form.userErrRole}
                        >
                            <option value="">Select a role</option>
                            {userRoles.map((role, index) => (
                                <option key={index} value={role.value}>
                                    {role.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['role'] || form.userErrRole}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
