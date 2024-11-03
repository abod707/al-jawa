import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// جلب جميع المحتويات
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.is_admin) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const { data: contents, error } = await supabase
      .from('contents')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(contents)
  } catch (error) {
    return new NextResponse("خطأ في الخادم", { status: 500 })
  }
}

// إضافة محتوى جديد
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.is_admin) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const { title, content, type } = await req.json()
    
    const { data, error } = await supabase
      .from('contents')
      .insert([{ title, content, type }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse("خطأ في إنشاء المحتوى", { status: 500 })
  }
} 