import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'db.json');
  const db = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const { method, query, body } = req;
  let contacts = db.contacts;

  if (method === 'GET') {
    if (query.name_like) {
      const search = query.name_like.toLowerCase();
      const filtered = contacts.filter(c => c.name.toLowerCase().includes(search));
      return res.status(200).json(filtered);
    }
    return res.status(200).json(contacts);
  }

  if (method === 'POST') {
    const newContact = { id: Date.now(), ...body };
    db.contacts.push(newContact);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    return res.status(201).json(newContact);
  }

  if (method === 'PUT') {
    const id = parseInt(query.id);
    db.contacts = db.contacts.map(c => (c.id === id ? { ...c, ...body } : c));
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    return res.status(200).json({ message: 'Updated' });
  }

  if (method === 'DELETE') {
    const deleteId = parseInt(query.id);
    db.contacts = db.contacts.filter(c => c.id !== deleteId);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    return res.status(200).json({ message: 'Deleted' });
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
