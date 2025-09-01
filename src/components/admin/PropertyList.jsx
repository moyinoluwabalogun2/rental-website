import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../firebase';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'properties'), (snapshot) => {
      const propertyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertyData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteDoc(doc(db, 'properties', id));
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading properties...</div>;
  }

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <h2>Manage Properties</h2>
        <button
          onClick={() => navigate('/admin/properties/add')}
          className="add-property-btn"
        >
          + Add New Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="no-properties">
          <p>No properties found</p>
          <button onClick={() => navigate('/admin/properties/add')}>
            Create Your First Property
          </button>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map(property => (
            <div key={property.id} className="property-management-card">
              <img src={property.image} alt={property.title} />
              <div className="property-info">
                <h3>{property.title}</h3>
                <p>#{property.price}/yr • {property.location}</p>
                <div className="status-badge">{property.status}</div>
              </div>
              <div className="property-actions">
                <button
                  onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
