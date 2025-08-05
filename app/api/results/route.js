import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { iq, score, difficulty, timeUsed } = await request.json();
    
    console.log('Résultat de test:', { iq, score, difficulty, timeUsed });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Résultats sauvegardés' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalTests: 1234,
    averageIQ: 108,
    topScore: 165
  });
}
