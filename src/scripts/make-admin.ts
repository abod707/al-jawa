import { supabase } from "@/lib/supabase"

async function main() {
  const email = "your-email@example.com" // ضع البريد الإلكتروني للمستخدم هنا

  const { data, error } = await supabase
    .from('users')
    .update({ is_admin: true })
    .eq('email', email)
    .select()
    .single()

  if (error) {
    console.error("Error:", error)
    return
  }

  console.log(`تم تحديث المستخدم: ${data.email} ليصبح مديراً`)
}

main()