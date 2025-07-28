// src/firebaseUtils.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function fetchAllProperties() {
  const querySnapshot = await getDocs(collection(db, 'properties'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
export async function fetchPropertyById(id) {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Property not found');
    }
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}