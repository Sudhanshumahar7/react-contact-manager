import React, { useState, useEffect } from 'react';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContactModal from './components/AddContactModal';
import EditContactModal from './components/EditContactModal';
import { contactService } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAllContacts();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError('Failed to load contacts. Please make sure the JSON server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contact) => {
    try {
      const newContact = await contactService.addContact(contact);
      setContacts((prev) => [...prev, newContact]);
      setShowAddModal(false);
    } catch (err) {
      alert('Failed to add contact. Please try again.');
    }
  };

  const handleUpdateContact = async (id, updatedContact) => {
    try {
      const updated = await contactService.updateContact(id, updatedContact);
      setContacts((prev) =>
        prev.map((contact) => (contact.id === id ? updated : contact))
      );
      setShowEditModal(false);
      setSelectedContact(null);
    } catch (err) {
      alert('Failed to update contact. Please try again.');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(id);
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      } catch (err) {
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Contact List
          </h1>
          <button className="add-contact-btn" onClick={() => setShowAddModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
            Add Contact
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="results-count">
              {!loading && (<p>Showing {filteredContacts.length} of {contacts.length} contacts</p>)}
            </div>
        </div>
        <ContactList
          contacts={filteredContacts}
          onEdit={handleEditClick}
          onDelete={handleDeleteContact}
          loading={loading}
          error={error}
        />
      </main>

      {showAddModal && (
        <AddContactModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddContact}
        />
      )}

      {showEditModal && selectedContact && (
        <EditContactModal
          contact={selectedContact}
          onClose={() => {
            setShowEditModal(false);
            setSelectedContact(null);
          }}
          onUpdate={handleUpdateContact}
        />
      )}
    </div>

);
}
export default App;