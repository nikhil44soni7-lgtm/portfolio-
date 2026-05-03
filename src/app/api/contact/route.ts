import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'src/data/db.json')

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json()
        
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
        }

        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf-8'))
        
        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            status: 'new'
        }

        data.messages = [newMessage, ...(data.messages || [])]
        
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Contact API Error:', error)
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
    }
}
