import { createUser, fetchUserByEmail, fetchUsers } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest): Promise<NextResponse>
{
    try {
        const { email, password} = await req.json()

        if ( !email || !password) return NextResponse.json({error: '入力内容に不備があります'})
        
        const registeredUser = await fetchUserByEmail(email)
        if (! registeredUser) return NextResponse.json({error: '認証情報が間違っています'})
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        // 認証処理


        return NextResponse.json({result: true})
    } catch(err) {
        console.error(err)
        return NextResponse.json({error: 'Failed to create user', })
    }
}