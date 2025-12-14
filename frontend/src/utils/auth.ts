export function getUserRole(): 'ADMIN' | 'USER' | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    // JWT format: header.payload.signature
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    return payload.role || null;
  } catch (error) {
    return null;
  }
}
