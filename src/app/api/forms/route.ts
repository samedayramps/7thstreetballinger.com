import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add submission timestamp
    data.submittedAt = new Date().toISOString()

    // Create the document in Sanity
    const result = await client.create({
      _type: type,
      ...data,
    })

    return NextResponse.json({ success: true, id: result._id })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
} 