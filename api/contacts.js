import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { method, query, body } = req;

  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    if (method === 'GET') {
      if (query.name_like) {
        const search = `%${query.name_like}%`;
        const { rows } = await sql`
          SELECT * FROM contacts 
          WHERE LOWER(name) LIKE LOWER(${search})
          ORDER BY id DESC
        `;
        return res.status(200).json(rows);
      }
      
      const { rows } = await sql`SELECT * FROM contacts ORDER BY id DESC`;
      return res.status(200).json(rows);
    }

    if (method === 'POST') {
      const { name, email, phone } = body;
      const { rows } = await sql`
        INSERT INTO contacts (name, email, phone)
        VALUES (${name}, ${email || null}, ${phone || null})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (method === 'PUT') {
      const id = parseInt(query.id);
      const { name, email, phone } = body;
      
      const { rows } = await sql`
        UPDATE contacts
        SET name = ${name}, email = ${email || null}, phone = ${phone || null}
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      
      return res.status(200).json(rows[0]);
    }

    if (method === 'DELETE') {
      const deleteId = parseInt(query.id);
      
      const { rowCount } = await sql`
        DELETE FROM contacts WHERE id = ${deleteId}
      `;
      
      if (rowCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      
      return res.status(200).json({ message: 'Deleted' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
    
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
