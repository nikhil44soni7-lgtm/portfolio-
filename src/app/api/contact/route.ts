import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const SRC_DB_PATH = path.join(process.cwd(), 'src/data/db.json')
const TMP_DB_PATH = '/tmp/db.json'

const isVercel = process.env.VERCEL === '1'
const DB_PATH = isVercel ? TMP_DB_PATH : SRC_DB_PATH

async function readDb() {
    try {
        const raw = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(raw)
    } catch {
        // Seed /tmp from source on first run
        try {
            const raw = await fs.readFile(SRC_DB_PATH, 'utf-8')
            const data = JSON.parse(raw)
            if (isVercel) {
                await fs.writeFile(TMP_DB_PATH, JSON.stringify(data, null, 2))
            }
            return data
        } catch {
            return { skills: [], work: [], messages: [] }
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            )
        }

        const data = await readDb()

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
        return NextResponse.json(
            { success: false, error: 'Failed to save message' },
            { status: 500 }
        )
    }
}
