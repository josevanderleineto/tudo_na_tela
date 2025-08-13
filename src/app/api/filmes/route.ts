import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { NovoFilme } from '@/types/filme';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function verificarAutorizacao(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  return token === ADMIN_SECRET;
}

// GET - listar todos os filmes (público)
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM filmes ORDER BY id DESC');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// POST - criar filme (requer autenticação)
export async function POST(request: NextRequest) {
  if (!verificarAutorizacao(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body: NovoFilme = await request.json();
    const { titulo, sinopse, imagem_url } = body;

    if (!titulo) {
      return NextResponse.json({ error: 'Título é obrigatório' }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO filmes (titulo, sinopse, imagem_url) VALUES ($1, $2, $3) RETURNING *',
      [titulo, sinopse || null, imagem_url || null]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
