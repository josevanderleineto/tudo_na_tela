import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true // deixa o Neon cuidar do SSL
});

export default pool;
