import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import './JournalForm.css';
import { useAuth } from  "../context/AuthContext"
import { Navigate } from "react-router-dom";
export default function JournalForm({ JournalIn}) {
    const navigate = useNavigate();
    const {user} = useAuth()

    const [form, setForm] = useState({
        faculty_name: '',
        title_of_paper: '',
        designation: '',
        citation_link: '',
        month_and_year: '',
        indexing: [],
        sjr_quartile: '',
        doi: '',
        serverErrors: null,
        clientErrors: {}
    });
    if(!user?.isLoggedIn){
        return <Navigate to = "/"/>
    }

    const runValidations = () => {
        const errors = {};
        if (form.faculty_name.trim().length === 0) {
            errors.faculty_name = 'Faculty name is required';
        }
        if (form.title_of_paper.trim().length === 0) {
            errors.title_of_paper = 'Title is required';
        }
        if (form.designation.trim().length === 0) {
            errors.designation = 'Designation is required';
        }
        if (form.citation_link.trim().length === 0) {
            errors.citation_link = 'Citation link is required';
        }
        if (form.month_and_year.trim().length === 0) {
            errors.month_and_year = 'Month and year are required';
        }
        if (form.indexing.length === 0) {
            errors.indexing = 'Indexing is required';
        }
        if (form.sjr_quartile.trim().length === 0) {
            errors.sjr_quartile = 'SJR quartile is required';
        }
        if (form.doi.trim().length === 0) {
            errors.doi = 'DOI is required';
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newValue = checked
                ? [...form.indexing, value]
                : form.indexing.filter((index) => index !== value);
            setForm({ ...form, [name]: newValue });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = runValidations();
        if (Object.keys(errors).length === 0) {
            try {
                const formData = {
                    faculty_name: form.faculty_name,
                    designation: form.designation,
                    title_of_paper: form.title_of_paper,
                    citation_link: form.citation_link,
                    month_and_year: form.month_and_year,
                    indexing: form.indexing,
                    sjr_quartile: form.sjr_quartile,
                    doi: form.doi,
                };
                const response = await axios.post('http://127.0.0.1:5000/api/journal', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                setForm({
                    faculty_name: '',
                    designation: '',
                    title_of_paper: '',
                    citation_link: '',
                    month_and_year: '',
                    indexing: [],
                    sjr_quartile: '',
                    doi: '',
                    serverErrors: null,
                    clientErrors: {}
                });
                console.log(form)
                JournalIn();
                navigate('/journal');
            } catch (error) {
                console.log(error);
                setForm({ ...form, serverErrors: error.response.data.message, clientErrors: {} });
            }
        } else {
            console.log(errors);
            setForm({ ...form, clientErrors: errors });
        }
    };

    const sjrQuartileOptions = [
        { name: 'Q1', value: 'Q1' },
        { name: 'Q2', value: 'Q2' },
        { name: 'Q3', value: 'Q3' }
    ];

    const indexingOptions = [
        { label: 'Scopus', value: 'Scopus' },
        { label: 'WoS', value: 'WoS' },
        { label: 'SCIE', value: 'SCIE' },
        { label: 'ESCI', value: 'ESCI' }
    ];

    return (
        <Container className="journal-form-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 journal-form-card">
                <h2 className="text-center mb-4">Journal Submission Form</h2>
                {form.serverErrors && <p style={{ color: 'red' }}>{form.serverErrors}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="faculty_name">
                        <Form.Label>Faculty Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculty_name"
                            value={form.faculty_name}
                            placeholder="Faculty Name"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['faculty_name']}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['faculty_name']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="title_of_paper">
                        <Form.Label>Title of Paper</Form.Label>
                        <Form.Control
                            type="text"
                            name="title_of_paper"
                            value={form.title_of_paper}
                            placeholder="Title"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['title_of_paper']}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['title_of_paper']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="designation">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                            type="text"
                            name="designation"
                            value={form.designation}
                            placeholder="Designation"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['designation']}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['designation']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="citation_link">
                        <Form.Label>Citation Link</Form.Label>
                        <Form.Control
                            type="text"
                            name="citation_link"
                            value={form.citation_link}
                            placeholder="Citation Link"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['citation_link']}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['citation_link']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="month_and_year">
                        <Form.Label>Month and Year</Form.Label>
                        <Form.Control
                            type="text"
                            name="month_and_year"
                            value={form.month_and_year}
                            placeholder="Month and Year"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['month_and_year']}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['month_and_year']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="indexing">
                        <Form.Label>Indexing</Form.Label><br />
                        {indexingOptions.map((option) => (
                            <Form.Check
                                inline
                                key={option.value}
                                label={option.label}
                                type="checkbox"
                                name="indexing"
                                value={option.value}
                                checked={form.indexing.includes(option.value)}
                                onChange={handleChange}
                                isInvalid={!!form.clientErrors['indexing']}
                            />
                        ))}
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['indexing']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="sjr_quartile">
                        <Form.Label>SJR Quartile</Form.Label>
                        <Form.Control
                            as="select"
                            name="sjr_quartile"
                            value={form.sjr_quartile}
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['sjr_quartile']}
                        >
                            <option value="">Select SJR Quartile</option>
                            {sjrQuartileOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['sjr_quartile']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="doi">
                        <Form.Label>DOI</Form.Label>
                        <Form.Control
                            type="text"
                            name="doi"
                            value={form.doi}
                            placeholder="DOI"
                            onChange={handleChange}
                            isInvalid={!!form.clientErrors['doi']}
                        />
                        <Form.Control.Feedback type="invalid">
                            {form.clientErrors['doi']}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button style={{ marginTop: '10px' }} variant="primary" type="submit" block>
                     Submit
                     </Button>
                </Form>
            </Card>
        </Container>
    );
}
