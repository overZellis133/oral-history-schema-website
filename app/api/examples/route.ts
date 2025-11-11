import { getAllExamples } from '@/lib/loadExamples'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const examples = getAllExamples()
    return NextResponse.json(examples)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load examples' },
      { status: 500 }
    )
  }
}

