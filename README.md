# Cetrogar – Automatización de pruebas E2E y API

Proyecto de práctica de **QA Automation** sobre el e-commerce [cetrogar.com.ar](https://www.cetrogar.com.ar), hecho con **Playwright + TypeScript**. Cubre el flujo de login, búsqueda de productos y carrito (UI) y el inicio de sesión a nivel API.

> Proyecto de aprendizaje. Los tests corren contra el sitio real, con una cuenta de prueba propia.

## Stack

- [Playwright](https://playwright.dev) (`@playwright/test`)
- TypeScript (modo `strict`)
- `dotenv` para manejar credenciales fuera del código
- Reporte HTML de Playwright (screenshots, video y trace cuando un test falla)

## Qué patrones aplica

| Patrón | Dónde está | Para qué |
|---|---|---|
| Page Object Model (POM) | `src/pages/` | Cada página (Login, Home, Resultados, Carrito) tiene sus locators y acciones en una clase. Los tests no conocen selectores. |
| Page Object Component | `src/components/Navbar.ts` | Elementos que se repiten en varias páginas (la barra de navegación) viven en un componente reutilizable. |
| Fixtures personalizados | `src/fixtures/baseFixtures.ts` | Inyecta `LoginPage` ya navegada en los tests que la pidan. |
| Capa de API | `src/api/authApi.ts` | Encapsula las llamadas HTTP, así los tests de API quedan cortos y legibles. |
| Datos de test separados | `src/test-data/` | Credenciales por variables de entorno, datos de prueba en un solo lugar. |
| Locators semánticos | todo el proyecto | `getByRole`, `getByPlaceholder`, `getByText`: sin CSS ni XPath frágiles. |

## Estructura

```
src/
├── api/          # Cliente de la API de autenticación
├── components/   # Componentes reutilizables (Navbar)
├── fixtures/     # Fixtures personalizados de Playwright
├── pages/        # Page Objects
├── test-data/    # Credenciales (desde .env) y datos de prueba
└── tests/        # Specs
playwright.config.ts
```

## Casos de prueba

| ID | Tipo | Descripción |
|---|---|---|
| TC01 | UI | Login con credenciales válidas |
| TC02 | UI | Login con usuario y contraseña incorrectos |
| TC03 | UI | Login y búsqueda de un producto |
| TC04 | UI | Login, búsqueda y agregar un producto al carrito |
| TC05 | API | Inicio de sesión por API (`startlogin`) con usuario válido |
| TC06 | API | Inicio de sesión por API con usuario inexistente |

## Cómo correrlo

Requisitos: Node.js 18 o superior.

```bash
# 1. Clonar e instalar
git clone https://github.com/DarioEmanuelVelez/CetrogarTestProyect.git
cd CetrogarTestProyect
npm install
npx playwright install chromium

# 2. Configurar credenciales de una cuenta de prueba:
#    crear un archivo llamado .env en la raíz del proyecto con estas dos líneas
#    (el .env está en .gitignore y nunca se sube al repositorio)
#
#    USER_EMAIL=tu_email@ejemplo.com
#    USER_PASSWORD=tu_contraseña

# 3. Ejecutar
npm test              # modo headless
npm run test:headed   # viendo el navegador
npm run test:ui       # modo UI de Playwright

# 4. Ver el reporte
npx playwright show-report
```

## Configuración destacada

- `retries: 2` y `workers: 1` cuando la variable `CI` está activa.
- `trace`, `screenshot` y `video` se guardan solo cuando un test falla, para depurar sin llenar el disco.
- Solo Chromium está activo; Firefox y WebKit están comentados en `playwright.config.ts` y se pueden habilitar.

## Próximos pasos

- [ ] Integración continua con GitHub Actions (correr tests en cada push y publicar el reporte)
- [ ] Aserciones completas en los flujos de búsqueda y carrito
- [ ] Login una sola vez y reutilizar la sesión (`storageState` generado en un global setup)
- [ ] Usar el fixture y el componente Navbar en todos los specs
- [ ] Tests de API adicionales (por ejemplo, contra una API pública pensada para practicar)

## Autor

**Dario Emanuel Velez** – en camino a QA Automation.