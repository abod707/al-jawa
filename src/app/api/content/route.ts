import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
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