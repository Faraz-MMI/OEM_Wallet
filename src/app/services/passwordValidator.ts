export function isPasswordValid(password: string) {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasUppercase && hasNumber;
}
