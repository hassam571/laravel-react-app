import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // On mount, fetch all users for suggestion purposes.
  useEffect(() => {
    axios.get('/api/list')
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users for suggestions:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2) {
      // Main search: Use your API (powered by Meilisearch) for robust matching.
      axios.get(`/api/search/users?query=${value}`)
        .then(response => {
          setResults(response.data);

          // If no or few results, generate suggestions with Fuse.js.
          if (response.data.length === 0 && allUsers.length > 0) {
            const fuse = new Fuse(allUsers, {
              keys: ['name'],
              threshold: 0.4, // Adjust threshold for sensitivity.
            });
            const fuseResults = fuse.search(value);
            // Get an array of user objects from the search results.
            const suggestionResults = fuseResults.map(result => result.item);
            setSuggestions(suggestionResults);
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => {
          console.error('Search error:', error);
          setResults([]);
          setSuggestions([]);
        });
    } else {
      setResults([]);
      setSuggestions([]);
    }
  };

  return (
    <div>
      <input 
        type="search" 
        value={query} 
        onChange={handleSearch} 
        placeholder="Search users by name..." 
      />
      {suggestions.length > 0 && (
        <div style={{ marginTop: '10px', background: '#f8f9fa', padding: '8px' }}>
          <p>Did you mean:</p>
          <ul>
            {suggestions.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ marginTop: '10px' }}>
        {results.length > 0 ? (
          <ul>
            {results.map(user => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          query.length >= 3 && <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;