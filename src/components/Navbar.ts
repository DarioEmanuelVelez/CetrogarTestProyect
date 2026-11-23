import { Page, Locator } from '@playwright/test';

/**
 * Componente Navbar - Encapsula los elementos y acciones de la barra de navegación de Cetrogar.
 *
 * Principios aplicados:
 * - Page Object Component (POC): reutilizable en cualquier página que comparta el navbar.
 * - Selectores semánticos de Playwright (getByRole, getByLabelText, getByText, etc.).
 * - Sin selectores CSS ni XPath hardcodeados.
 * - Métodos de acción con nombres descriptivos.
 *
 * NOTA: Verificar los textos/roles reales en https://www.cetrogar.com.ar y ajustar si es necesario.
 */
export class NavbarComponent {
  readonly page: Page;

  // --- Locators (semánticos, sin hardcodear CSS/XPath) ---

  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartLink: Locator;
  readonly accountLink: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Logo del sitio (por rol de enlace y texto alternativo)
    this.logo = page.getByRole('link', { name: /cetrogar/i });

    // Campo de búsqueda del navbar
    this.searchInput = page.getByPlaceholder(/buscar/i);

    // Botón de buscar
    this.searchButton = page.getByRole('button', { name: /buscar/i });

    // Enlace al carrito de compras
    this.cartLink = page.getByRole('link', { name: /carrito/i });

    // Enlace a la cuenta de usuario
    this.accountLink = page.getByRole('link', { name: /mi cuenta/i });

    // Botón de menú (hamburguesa) para móviles
    this.menuButton = page.getByRole('button', { name: /menú/i });
  }

  // --- Actions ---

  /** Hace clic en el logo para volver al inicio */
  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  /** Busca un producto desde el navbar */
  async search(product: string): Promise<void> {
    await this.searchInput.click();
    await this.searchInput.fill(product);
    await this.searchInput.press('Enter');
  }

  /** Navega al carrito de compras */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  /** Navega a la cuenta de usuario */
  async goToAccount(): Promise<void> {
    await this.accountLink.click();
  }

  /** Abre el menú de navegación (móvil) */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }
}
