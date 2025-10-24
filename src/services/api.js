//const API_URL = 'http://localhost:5000/contacts'; //for local running the project
const API_URL = '/api/contacts'; // for Vercel deployment


export const contactService = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Search contacts by name
  searchContacts: async (searchTerm) => {
    try {
      const response = await fetch(`${API_URL}?name_like=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to search contacts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching contacts:', error);
      throw error;
    }
  },

  // Add new contact
  addContact: async (contact) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  // Update contact
  updateContact: async (id, contact) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
};
