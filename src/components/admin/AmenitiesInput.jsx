import { useState } from 'react';
import './PropertyForm.css'

const AmenitiesInput = ({ amenities, setAmenities }) => {
  const [input, setInput] = useState('');

  const addAmenity = () => {
    if (input && !amenities.includes(input)) {
      setAmenities([...amenities, input]);
      setInput('');
    }
  };

  return (
    <div className="amenities-input">
      <div className="tags">
        {amenities.map((item, index) => (
          <span key={index} className="tag">
            {item}
            <button 
              type="button"
              onClick={() => setAmenities(amenities.filter((_, i) => i !== index))}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addAmenity()}
        placeholder="Add amenity"
      />
      <button type="button" onClick={addAmenity}>Add</button>
    </div>
  );
};

export default AmenitiesInput;