import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    phoneNo: '',
    education: ''
  });

  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log('Registration saved:', response.data);
      setFormData({
        name: '',
        rollNo: '',
        phoneNo: '',
        education: ''
      }); // Clear form data after successful submission
    } catch (error) {
      console.error('Error saving registration:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?name=${searchQuery}`);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <h3>Search Registration by Name</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="btn btn-primary" onClick={handleSearchSubmit}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-secondary" onClick={toggleFormVisibility}>
            {isFormVisible ? 'Hide Registration Form' : 'Add New User'}
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="row">
          <div className="col">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Roll No:</label>
                <input 
                  type="text" 
                  name="rollNo" 
                  className="form-control" 
                  value={formData.rollNo} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone No:</label>
                <input 
                  type="tel" 
                  name="phoneNo" 
                  className="form-control" 
                  value={formData.phoneNo} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Education:</label>
                <input 
                  type="text" 
                  name="education" 
                  className="form-control" 
                  value={formData.education} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-success">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
