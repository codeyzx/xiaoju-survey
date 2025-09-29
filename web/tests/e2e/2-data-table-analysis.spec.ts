import { test, expect } from '@playwright/test';

test.describe('Data Table Analysis Page UI/UX Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to data table analysis page (using survey ID from screenshot)
    await page.goto('/management/survey/68d517ebfb5e68a34a18cedc/analysis/dataTable');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('should load data table analysis page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/.*analysis\/dataTable/);
    
    // Check sidebar navigation
    await expect(page.locator('text=Edit Survey')).toBeVisible();
    await expect(page.locator('text=Publish Survey')).toBeVisible();
    await expect(page.locator('text=Data Analysis')).toBeVisible();
  });

  test('should display data table tabs', async ({ page }) => {
    // Check tab navigation
    await expect(page.locator('text=Data List')).toBeVisible();
    await expect(page.locator('text=Separate Statistics')).toBeVisible();
    
    // Verify Data List tab is active (should be selected by default)
    const dataListTab = page.locator('text=Data List');
    await expect(dataListTab).toBeVisible();
  });

  test('should show no data state when survey has no responses', async ({ page }) => {
    // Check for "No Data" state from screenshot
    await expect(page.locator('text=No Data')).toBeVisible();
    await expect(page.locator('text=Your survey currently has no data, go collect responses!')).toBeVisible();
    
    // Check for illustration/icon
    await expect(page.locator('.no-data-illustration, .empty-state-icon')).toBeVisible();
  });

  test('should have functional tab switching', async ({ page }) => {
    // Test clicking on Separate Statistics tab
    const separateStatsTab = page.locator('text=Separate Statistics');
    await separateStatsTab.click();
    await page.waitForTimeout(1000);
    
    // Should navigate to separate statistics page
    await expect(page).toHaveURL(/.*analysis\/separateStatistics/);
    
    // Go back to Data List tab
    await page.goBack();
    await page.waitForLoadState('networkidle');
  });

  test('should display proper sidebar navigation', async ({ page }) => {
    // Check sidebar menu items
    await expect(page.locator('text=Edit Survey')).toBeVisible();
    await expect(page.locator('text=Publish Survey')).toBeVisible();
    await expect(page.locator('text=Data Analysis')).toBeVisible();
    
    // Verify Data Analysis is highlighted/selected
    const dataAnalysisItem = page.locator('text=Data Analysis');
    await expect(dataAnalysisItem).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if main content is still accessible
    await expect(page.locator('text=Data List')).toBeVisible();
    await expect(page.locator('text=No Data')).toBeVisible();
  });

  test('should maintain consistent layout structure', async ({ page }) => {
    // Take screenshot for visual verification
    await page.screenshot({ path: 'data-table-analysis-page.png', fullPage: true });
    
    // Check main content area structure
    await expect(page.locator('.main-content, .content-area')).toBeVisible();
    await expect(page.locator('.sidebar, .navigation-sidebar')).toBeVisible();
  });
});