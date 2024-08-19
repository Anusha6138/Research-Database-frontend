import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

export default function AddForm() {
    const papers = [
        { name: 'Journal', value: 'journalForm' },
        { name: 'Conference', value: 'conferenceForm' },
        { name: 'BookChapter', value: 'bookChaptersForm' }
    ];

    const [selectedPaper, setSelectedPaper] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedPaper(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedPaper) {
            navigate(`/${selectedPaper}`);
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Add New Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPaperType" className="mb-3">
                    <Form.Label>Select Paper Type:</Form.Label>
                    <Form.Select value={selectedPaper} onChange={handleChange}>
                        <option value="" disabled>Select an option</option>
                        {papers.map((paper, index) => (
                            <option key={index} value={paper.value}>{paper.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!selectedPaper} className="d-block mx-auto">
                    Go
                </Button>
            </Form>
        </Container>
    );
}
