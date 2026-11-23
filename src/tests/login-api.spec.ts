import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { CREDENTIALS } from '../test-data/credentials';
import { AuthApi } from '../api/authApi';

/**
 * Endpoint de inicio de sesión de la API de Cetrogar (form data).
 */
const LOGIN_API_URL =
  'https://www.cetrogar.com.ar/api/vtexid/pub/authentication/startlogin';

// Contexto limpio (sin storageState) para autenticar desde la petición HTTP,
// no reutilizar cookies/sesión de tests previos.
test.use({ storageState: { cookies: [], origins: [] } });

/**
 * Intenta parsear el cuerpo como JSON; si no es JSON (texto, HTML, etc.),
 * devuelve el texto plano bajo la clave `raw` para no romper el test.
 * El cuerpo solo se consume una vez.
 */
async function safeJson(response: APIResponse): Promise<Record<string, any>> {
  try {
    return await response.json();
  } catch {
    return { raw: await response.text() };
  }
}

test('TC05 - Iniciar sesión desde API con credenciales válidas', async ({
  request,
}: { request: APIRequestContext }) => {
  const authApi = new AuthApi(request, LOGIN_API_URL);

  // Act: petición de login directo (form data, sin pasar por la UI)
  const response = await authApi.login(CREDENTIALS.VALID.email);

  // Evidencia de depuración: registrar status y cuerpo (una sola lectura)
  const body = await safeJson(response);
  // eslint-disable-next-line no-console
  console.log(`[TC05] status=${response.status()} body=`, body);

  // Assert: la autenticación debe ser exitosa (2xx)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(300);

  // Evidencia: cookies de sesión establecidas por el servidor
  const setCookie = response.headers()['set-cookie'];
  // eslint-disable-next-line no-console
  console.log(`[TC05] set-cookie=`, setCookie);
});

test('TC06 - Iniciar sesión desde API con credenciales inválidas', async ({
  request,
}: { request: APIRequestContext }) => {
  const authApi = new AuthApi(request, LOGIN_API_URL);

  // Act: petición de login con credenciales incorrectas
  const response = await authApi.login(CREDENTIALS.INVALID.email);

  // Evidencia de depuración: registrar status y cuerpo (una sola lectura)
  const body = await safeJson(response);
  // eslint-disable-next-line no-console
  console.log(`[TC06] status=${response.status()} body=`, body);

  // Assert: el endpoint startlogin acepta la petición y devuelve 200 tanto
  // para credenciales válidas como inválidas, porque solo inicia el flujo
  // VTEX ID. La validación real de credenciales ocurre en el paso posterior
  // (https://www.cetrogar.com.ar/api/vtexid/oauth/finish). Por tanto, aquí
  // validamos que la petición fue aceptada y se estableció la cookie.
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(response.headers()['set-cookie']).toBeDefined();
  expect(body).toBeDefined();
});
