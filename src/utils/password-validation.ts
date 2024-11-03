export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("يجب أن تحتوي على حرف كبير واحد على الأقل");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("يجب أن تحتوي على حرف صغير واحد على الأقل");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("يجب أن تحتوي على رقم واحد على الأقل");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 