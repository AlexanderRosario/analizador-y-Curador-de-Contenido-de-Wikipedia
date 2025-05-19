import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) onSearch(input.trim());
    };

return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar articulo wiki..."
        style={{ padding: '0.5rem', width: '70%'}} />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Buscar</button>
    </form>
    );
}

export default SearchBar