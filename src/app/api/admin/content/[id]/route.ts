import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// جلب محتوى محدد
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.is_admin) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const { data: content, error } = await supabase
      .from('contents')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !content) {
      return new NextResponse("المحتوى غير موجود", { status: 404 })
    }

    return NextResponse.json(content)
  } catch (error) {
    return new NextResponse("خطأ في الخادم", { status: 500 })
  }
}

// تحديث محتوى
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.is_admin) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const { title, content, type } = await req.json()
    
    const { data, error } = await supabase
      .from('contents')
      .update({ title, content, type })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse("خطأ في تحديث المحتوى", { status: 500 })
  }
}

// حذف محتوى
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.is_admin) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const { error } = await supabase
      .from('contents')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return new NextResponse("خطأ في حذف المحتوى", { status: 500 })
  }
} 