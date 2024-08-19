import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Forms/BookStoreForm.css";
import { useAuth } from  "../context/AuthContext"
import { Navigate } from "react-router-dom";
export default function BookChapterForm({ BookChapterIn}) {
  const navigate = useNavigate();
  const {user} = useAuth()


  const [form, setForm] = useState({
    faculty_name: '',
    designation: '',
    title_of_chapter: '',
    name_of_book: '',
    citation_link: '',
    month_and_year: '',
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
    if (form.designation.trim().length === 0) {
      errors.designation = 'Designation is required';
    }
    if (form.title_of_chapter.trim().length === 0) {
      errors.title_of_chapter = 'Title is required';
    }
    if (form.name_of_book.trim().length === 0) {
      errors.name_of_book = 'Name of book is required';
    }
    if (form.citation_link.trim().length === 0) {
      errors.citation_link = 'Citation link is required';
    }
    if (form.month_and_year.trim().length === 0) {
      errors.month_and_year = 'Month and year are required';
    }
    if (form.doi.trim().length === 0) {
      errors.doi = 'DOI is required';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = runValidations();
    if (Object.keys(errors).length === 0) {
      try {
        const formData = {
          faculty_name: form.faculty_name,
          designation: form.designation,
          title_of_chapter: form.title_of_chapter,
          name_of_book: form.name_of_book,
          citation_link: form.citation_link,
          month_and_year: form.month_and_year,
          doi: form.doi,
        };
        const response = await axios.post('http://127.0.0.1:5000/api/book_chapter', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data);
        setForm({
          faculty_name: '',
          designation: '',
          title_of_chapter: '',
          name_of_book: '',
          citation_link: '',
          month_and_year: '',
          doi: '',
          serverErrors: null,
          clientErrors: {}
        });
        BookChapterIn()
        navigate('/bookChapters');
      } catch (error) {
        console.log(error);
        setForm({ ...form, serverErrors: error.response.data.message, clientErrors: {} });
      }
    } else {
      console.log(errors);
      setForm({ ...form, clientErrors: errors });
    }
  };

  return (
    <div className="book-chapter-form-container">
      <div className="book-chapter-form-card">
        <h2>Book Chapter Form</h2>
        {form.serverErrors && <p className="error-text">{form.serverErrors}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="faculty_name" className="form-label">Faculty Name</label>
          <input
            type="text"
            name="faculty_name"
            id="faculty_name"
            className={`form-control ${form.clientErrors.faculty_name ? 'is-invalid' : ''}`}
            value={form.faculty_name}
            placeholder="Faculty Name"
            onChange={handleChange}
          />
          {form.clientErrors.faculty_name && <div className="invalid-feedback">{form.clientErrors.faculty_name}</div>}

          <label htmlFor="designation" className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            id="designation"
            className={`form-control ${form.clientErrors.designation ? 'is-invalid' : ''}`}
            value={form.designation}
            placeholder="Designation"
            onChange={handleChange}
          />
          {form.clientErrors.designation && <div className="invalid-feedback">{form.clientErrors.designation}</div>}

          <label htmlFor="title_of_chapter" className="form-label">Title</label>
          <input
            type="text"
            name="title_of_chapter"
            id="title_of_chapter"
            className={`form-control ${form.clientErrors.title_of_chapter ? 'is-invalid' : ''}`}
            value={form.title_of_chapter}
            placeholder="Title"
            onChange={handleChange}
          />
          {form.clientErrors.title_of_chapter && <div className="invalid-feedback">{form.clientErrors.title_of_chapter}</div>}

          <label htmlFor="name_of_book" className="form-label">Name of Book</label>
          <input
            type="text"
            name="name_of_book"
            id="name_of_book"
            className={`form-control ${form.clientErrors.name_of_book ? 'is-invalid' : ''}`}
            value={form.name_of_book}
            placeholder="Name of Book"
            onChange={handleChange}
          />
          {form.clientErrors.name_of_book && <div className="invalid-feedback">{form.clientErrors.name_of_book}</div>}

          <label htmlFor="citation_link" className="form-label">Citation Link</label>
          <input
            type="text"
            name="citation_link"
            id="citation_link"
            className={`form-control ${form.clientErrors.citation_link ? 'is-invalid' : ''}`}
            value={form.citation_link}
            placeholder="Citation Link"
            onChange={handleChange}
          />
          {form.clientErrors.citation_link && <div className="invalid-feedback">{form.clientErrors.citation_link}</div>}

          <label htmlFor="month_and_year" className="form-label">Month and Year</label>
          <input
            type="text"
            name="month_and_year"
            id="month_and_year"
            className={`form-control ${form.clientErrors.month_and_year ? 'is-invalid' : ''}`}
            value={form.month_and_year}
            placeholder="Month and Year"
            onChange={handleChange}
          />
          {form.clientErrors.month_and_year && <div className="invalid-feedback">{form.clientErrors.month_and_year}</div>}

          <label htmlFor="doi" className="form-label">DOI</label>
          <input
            type="text"
            name="doi"
            id="doi"
            className={`form-control ${form.clientErrors.doi ? 'is-invalid' : ''}`}
            value={form.doi}
            placeholder="DOI"
            onChange={handleChange}
          />
          {form.clientErrors.doi && <div className="invalid-feedback">{form.clientErrors.doi}</div>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
