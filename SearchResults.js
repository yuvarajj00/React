import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // Import the CSS file

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('name') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get(`http://localhost:5000/search?name=${searchQuery}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error searching for names:', error);
        }
      }
    };
    fetchResults();
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchQuery}"</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              Name: {result.name}, Roll No: {result.rollNo}, Phone: {result.phoneNo}, Education: {result.education}
            </li>
          ))}
        </ul>
      ) : (
        searchQuery && <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
