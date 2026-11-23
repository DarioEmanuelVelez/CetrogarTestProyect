import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model - Resultados de búsqueda de Cetrogar.
 */
export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Título que muestra la página al buscar un producto */
  validacionTitulo(producto: string): Locator {
    return this.page.getByText(`Resultados de búsqueda para: ${producto}`, {
      exact: true,
    });
  }

  /** Verifica que el producto buscado aparezca en los resultados */
  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page
      .getByText(new RegExp(productName, 'i'))
      .first()
      .isVisible();
  }

  /** Agrega el primer producto visible al carrito (botón semántico) */
  async addFirstProductToCart(): Promise<void> {
    const addButtons = this.page.getByRole('button', {
      name: /agregar al carrito|comprar|agregar/i,
    });
    await addButtons.first().click();
  }
}