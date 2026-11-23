import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Capa de acceso a la API de autenticación de Cetrogar.
 *
 * Encapsula la petición POST al endpoint de inicio de sesión enviando
 * los campos como form data (application/x-www-form-urlencoded), tal como
 * lo requiere el endpoint real de Cetrogar.
 *
 * Endpoint: https://www.cetrogar.com.ar/api/vtexid/pub/authentication/startlogin
 */
export class AuthApi {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * Ejecuta el inicio de sesión mediante petición POST directa (sin UI).
   *
   * @param user - Correo electrónico del usuario (variable de entorno USER_EMAIL).
   * @returns Respuesta HTTP de la API.
   */
  async login(user: string): Promise<APIResponse> {
    return this.request.post(this.baseURL, {
      form: {
        accountName: 'cetrogar',
        scope: 'cetrogar',
        returnUrl: 'https://www.cetrogar.com.ar/',
        callbackUrl:
          'https://www.cetrogar.com.ar/api/vtexid/oauth/finish?popup=false',
        user,
        fingerprint: '',
      },
    });
  }
}
