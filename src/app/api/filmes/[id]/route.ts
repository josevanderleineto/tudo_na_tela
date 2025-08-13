import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { AtualizarFilme } from '@/types/filme';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function verificarAutorizacao(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  return token === ADMIN_SECRET;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const filmeId = parseInt(id);
    if (isNaN(filmeId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM filmes WHERE id = $1', [filmeId]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Filme não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!verificarAutorizacao(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const filmeId = parseInt(id);
    if (isNaN(filmeId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body: AtualizarFilme = await request.json();
    const { titulo, sinopse, imagem_url } = body;

    const client = await pool.connect();
    const existeResult = await client.query('SELECT id FROM filmes WHERE id = $1', [filmeId]);
    if (existeResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ error: 'Filme não encontrado' }, { status: 404 });
    }

    const result = await client.query(
      'UPDATE filmes SET titulo = COALESCE($1, titulo), sinopse = COALESCE($2, sinopse), imagem_url = COALESCE($3, imagem_url) WHERE id = $4 RETURNING *',
      [titulo, sinopse, imagem_url, filmeId]
    );
    client.release();

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!verificarAutorizacao(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const filmeId = parseInt(id);
    if (isNaN(filmeId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query('DELETE FROM filmes WHERE id = $1 RETURNING *', [filmeId]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Filme não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Filme deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar filme:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
