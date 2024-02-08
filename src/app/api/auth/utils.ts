export function isEmailValid(email: string) {
  const regex = /[A-Za-z0-9]+(\.[A-Za-z0-9]+)?@([A-Za-z0-9]+\.)?unistra\.fr/;
  return regex.test(email);
}

export function isPasswordValid(password: string) {
  return password.length >= 8;
}
