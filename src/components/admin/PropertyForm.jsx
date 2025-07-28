import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import AmenitiesInput from './AmenitiesInput';
import './PropertyForm.css';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'apartment',
    status: 'available',
    featured: false,
    description: '',
    image: '',
    images: [],
    amenities: []
  });

  const [loading, setLoading] = useState(false);

  // Load existing property if editing
  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'properties', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProperty(docSnap.data());
          }
        } catch (err) {
          console.error('Error loading property:', err);
        }
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const urls = e.target.value.split('\n').filter(url => url.trim());
    setProperty(prev => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Update existing
        const docRef = doc(db, 'properties', id);
        await updateDoc(docRef, { ...property, updatedAt: serverTimestamp() });
      } else {
        // Add new
        await addDoc(collection(db, 'properties'), {
          ...property,
          createdAt: serverTimestamp()
        });
      }

      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-form">
      <h2>{id ? 'Edit Property' : 'Add Property'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="form-group">
          <label>Title*</label>
          <input
            name="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location*</label>
          <input
            name="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Numbers */}
        <div className="form-row">
          <div className="form-group">
            <label>Price (#)*</label>
            <input
              type="number"
              name="price"
              value={property.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bedrooms*</label>
            <input
              type="number"
              name="bedrooms"
              value={property.bedrooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bathrooms*</label>
            <input
              type="number"
              name="bathrooms"
              value={property.bathrooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Area (sqft)</label>
            <input
              type="number"
              name="area"
              value={property.area}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Selects */}
        <div className="form-row">
          <div className="form-group">
            <label>Type*</label>
            <select
              name="type"
              value={property.type}
              onChange={handleChange}
              required
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="self con">self con</option>
            <option value="rooms">rooms</option>
            <option value="room and parlour">room and parlour</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status*</label>
            <select
              name="status"
              value={property.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={property.featured}
              onChange={(e) =>
                setProperty({ ...property, featured: e.target.checked })
              }
            />
            Featured Property
          </label>
        </div>

        {/* Images */}
        <div className="form-group">
          <label>Main Image URL*</label>
          <input
            type="url"
            name="image"
            value={property.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Images (one URL per line)</label>
          <textarea
            value={property.images.join('\n')}
            onChange={handleImagesChange}
            rows={4}
          />
        </div>

        {/* Amenities */}
        <div className="form-group">
          <label>Amenities</label>
          <AmenitiesInput
            amenities={property.amenities}
            setAmenities={(am) =>
              setProperty({ ...property, amenities: am })
            }
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description*</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/properties')}>
            Cancel
          </button>
          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update' : 'Create'} Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
