import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL não está definida no ambiente!');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Necessário para Neon + Vercel
});

export default pool;
