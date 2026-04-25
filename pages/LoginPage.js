class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton   = page.locator('button[type="submit"]');

    this.usernameError = page.locator('.oxd-form-row').filter({ hasText: 'Username' }).getByText('Required');
    this.passwordError = page.locator('.oxd-form-row').filter({ hasText: 'Password' }).getByText('Required');
    this.invalidCredentialsError = page.getByText('Invalid credentials');
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };