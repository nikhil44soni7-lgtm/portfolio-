import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'src/data/db.json')

export async function GET() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        return NextResponse.json({ skills: [], work: [] })
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json()
        await fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 })
    }
}
