import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Dedicated messages storage - completely separate from db.json
// On Vercel /tmp is writable; locally we use src/data/messages.json
const isVercel = process.env.VERCEL === '1'
const LOCAL_MSG_PATH = path.join(process.cwd(), 'src/data/messages.json')
const TMP_MSG_PATH = '/tmp/portfolio_messages.json'
const MSG_PATH = isVercel ? TMP_MSG_PATH : LOCAL_MSG_PATH

async function readMessages(): Promise<any[]> {
    try {
        const raw = await fs.readFile(MSG_PATH, 'utf-8')
        return JSON.parse(raw)
    } catch {
        return []
    }
}

async function writeMessages(messages: any[]) {
    await fs.writeFile(MSG_PATH, JSON.stringify(messages, null, 2))
}

// GET — fetch all messages
export async function GET() {
    try {
        const messages = await readMessages()
        return NextResponse.json({ messages })
    } catch (error) {
        console.error('Messages GET error:', error)
        return NextResponse.json({ messages: [] })
    }
}

// POST — add a new message
export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json()

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            )
        }

        const messages = await readMessages()

        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            status: 'new'
        }

        const updated = [newMessage, ...messages]
        await writeMessages(updated)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Messages POST error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to save message' },
            { status: 500 }
        )
    }
}

// DELETE — delete a message by id
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()
        const messages = await readMessages()
        const updated = messages.filter((m: any) => m.id !== id)
        await writeMessages(updated)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Messages DELETE error:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
