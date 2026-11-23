import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model - Carrito de compras de Cetrogar.
 */
export class CartPage {
  readonly page: Page;

  readonly cartItems: Locator;
  readonly productoEnCarrito: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = this.page.getByRole('listitem').or(this.page.locator('tr'));
    this.productoEnCarrito = this.page.getByText('Total', { exact: true });
  }

  /** Navega a la página del carrito */
  async goto(): Promise<void> {
    await this.page.goto('https://www.cetrogar.com.ar/carrito');
  }


  
  }
