import { Page } from '@playwright/test';

export async function login(page: Page, username = 'test@example.com', password = 'password') {
  // Navigate to login page if not already there
  if (!page.url().includes('/login')) {
    await page.goto('/management/login');
  }
  
  await page.waitForLoadState('networkidle');
  
  // Fill login form
  await page.fill('input[placeholder*="Enter your account"]', username);
  await page.fill('input[placeholder*="Enter your password"]', password);
  
  // Handle captcha if exists (you might need to mock this)
  const captchaInput = page.locator('input[placeholder*="Enter captcha code"]');
  if (await captchaInput.isVisible()) {
    await captchaInput.fill('1234'); // Mock captcha
  }
  
  // Click login button
  await page.click('button:has-text("Login")');
  
  // Wait for navigation
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}

export async function navigateToCreateSurvey(page: Page) {
  // First try to go directly to create page
  await page.goto('/management/create');
  await page.waitForLoadState('networkidle');
  
  // If redirected to login, handle authentication
  if (page.url().includes('/login')) {
    await login(page);
    // After login, navigate to create page again
    await page.goto('/management/create');
    await page.waitForLoadState('networkidle');
  }
}

export async function skipAuthIfNeeded(page: Page) {
  // This function can be used to skip auth during testing
  // You can implement session storage manipulation or cookie setting here
  
  if (page.url().includes('/login')) {
    // Option 1: Set session storage to simulate logged in state
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
      localStorage.setItem('token', 'test-token-12345');
    });
    
    // Option 2: Set cookies if your app uses cookie-based auth
    await page.context().addCookies([
      {
        name: 'auth-token',
        value: 'test-token-12345',
        domain: 'localhost',
        path: '/'
      }
    ]);
    
    // Refresh page to apply auth state
    await page.reload();
    await page.waitForLoadState('networkidle');
  }
}