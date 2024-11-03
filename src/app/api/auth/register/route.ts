import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { validatePassword } from "@/utils/password-validation"
import { verify } from 'hcaptcha'

export async function POST(req: Request) {
  try {
    const { name, email, password, captchaToken } = await req.json()

    // التحقق من صحة الـ captcha
    try {
      const captchaResponse = await verify(
        process.env.HCAPTCHA_SECRET_KEY!,
        captchaToken
      )
      
      if (!captchaResponse.success) {
        return new NextResponse("فشل التحقق من أنك لست روبوتاً", { status: 400 })
      }
    } catch (error) {
      return new NextResponse("فشل التحقق من أنك لست روبوتاً", { status: 400 })
    }

    // التحقق من قوة كلمة المرور
    const { isValid, errors } = validatePassword(password)
    if (!isValid) {
      return new NextResponse(errors.join('\n'), { status: 400 })
    }

    // التحقق من وجود البريد الإلكتروني
    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()

    if (existingUser) {
      return new NextResponse("البريد الإلكتروني مستخدم بالفعل", { status: 400 })
    }

    // تشفير كلمة المرور
    const hashedPassword = await hash(password, 10)

    // إنشاء المستخدم في Supabase
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          email_verified: false,
          is_admin: false
        }
      ])
      .select()
      .single()

    if (createError) throw createError

    return NextResponse.json({
      message: "تم إنشاء الحساب بنجاح"
    })

  } catch (error) {
    console.error("Registration error:", error)
    return new NextResponse(
      "حدث خطأ أثناء إنشاء الحساب", 
      { status: 500 }
    )
  }
} 