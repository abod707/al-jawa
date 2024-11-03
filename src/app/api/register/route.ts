import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { validatePassword } from "@/utils/password-validation"

export async function POST(req: Request) {
  try {
    const { name, email, password, captchaToken } = await req.json()

    // التحقق من قوة كلمة المرور
    const { isValid, errors } = validatePassword(password)
    if (!isValid) {
      return new NextResponse(errors.join('\n'), { status: 400 })
    }

    // التحقق من reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    )
    const recaptchaData = await recaptchaResponse.json()
    
    if (!recaptchaData.success) {
      return new NextResponse("فشل التحقق من reCAPTCHA", { status: 400 })
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
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
      options: {
        data: { name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      }
    })

    if (error) throw error

    return NextResponse.json({
      message: "تم إرسال رابط التحقق إلى بريدك الإلكتروني"
    })

  } catch (error) {
    console.error("Registration error:", error)
    return new NextResponse(
      "حدث خطأ أثناء إنشاء الحساب", 
      { status: 500 }
    )
  }
} 