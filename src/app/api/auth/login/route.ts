 // Caminho: app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;

  // Verifica se a variável de ambiente foi configurada no servidor
  if (!adminSecret) {
    console.error('A variável de ambiente ADMIN_SECRET não está definida.');
    return NextResponse.json(
      { success: false, error: 'Configuração do servidor incompleta.' },
      { status: 500 }
    );
  }
  
  try {
    const body = await request.json();
    const { password } = body;

    // Compara a senha enviada pelo formulário com a senha secreta
    if (password === adminSecret) {
      // Senha correta, responde com sucesso.
      return NextResponse.json({ success: true });
    } else {
      // Senha incorreta, responde com erro 401 (Não Autorizado)
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    // Caso o corpo da requisição não seja um JSON válido
    return NextResponse.json(
      { success: false, error: 'Requisição inválida.' },
      { status: 400 }
    );
  }
}