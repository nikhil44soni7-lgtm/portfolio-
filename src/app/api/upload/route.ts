import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        
        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
        const uploadPath = path.join(process.cwd(), 'public/uploads', filename)

        await fs.writeFile(uploadPath, buffer)

        return NextResponse.json({ 
            success: true, 
            url: `/uploads/${filename}` 
        })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
    }
}
