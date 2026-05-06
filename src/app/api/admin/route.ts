import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// On Vercel, only /tmp is writable. Use it as the live DB.
// On local dev, write directly to src/data/db.json.
const SRC_DB_PATH = path.join(process.cwd(), 'src/data/db.json')
const TMP_DB_PATH = '/tmp/db.json'

const isVercel = process.env.VERCEL === '1'
const DB_PATH = isVercel ? TMP_DB_PATH : SRC_DB_PATH

async function readDb() {
    try {
        const raw = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(raw)
    } catch {
        // On Vercel first run, /tmp/db.json doesn't exist yet — seed from source
        try {
            const raw = await fs.readFile(SRC_DB_PATH, 'utf-8')
            const data = JSON.parse(raw)
            // Write to tmp so subsequent writes work
            if (isVercel) {
                await fs.writeFile(TMP_DB_PATH, JSON.stringify(data, null, 2))
            }
            return data
        } catch {
            return { skills: [], work: [], messages: [] }
        }
    }
}

export async function GET() {
    try {
        const data = await readDb()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ skills: [], work: [], messages: [] })
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json()
        await fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin POST error:', error)
        return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 })
    }
}
