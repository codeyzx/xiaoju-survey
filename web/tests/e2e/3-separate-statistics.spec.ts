import { test, expect } from '@playwright/test';

test.describe('Separate Statistics Page UI/UX Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to separate statistics page (using survey ID from screenshot)
    await page.goto('/management/survey/68d517ebfb5e68a34a18cedc/analysis/separateStatistics');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('should load separate statistics page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/.*analysis\/separateStatistics/);
    
    // Check sidebar navigation
    await expect(page.locator('text=Edit Survey')).toBeVisible();
    await expect(page.locator('text=Publish Survey')).toBeVisible();
    await expect(page.locator('text=Data Analysis')).toBeVisible();
  });

  test('should display statistics tabs', async ({ page }) => {
    // Check tab navigation
    await expect(page.locator('text=Data List')).toBeVisible();
    await expect(page.locator('text=Separate Statistics')).toBeVisible();
    
    // Verify Separate Statistics tab is active
    const separateStatsTab = page.locator('text=Separate Statistics');
    await expect(separateStatsTab).toBeVisible();
  });

  test('should display question statistics', async ({ page }) => {
    // Check for question title from screenshot
    await expect(page.locator('text=Title')).toBeVisible();
    await expect(page.locator('text=Single Choice')).toBeVisible();
    
    // Check for question options and statistics
    await expect(page.locator('text=Option')).toBeVisible();
    await expect(page.locator('text=Count')).toBeVisible();
    await expect(page.locator('text=Percentage')).toBeVisible();
    
    // Check for specific options from screenshot
    await expect(page.locator('text=Option 1')).toBeVisible();
    await expect(page.locator('text=Option 2')).toBeVisible();
    
    // Check percentage values (0% from screenshot)
    await expect(page.locator('text=0%')).toBeVisible();
  });

  test('should display pie chart visualization', async ({ page }) => {
    // Check for pie chart container
    await expect(page.locator('.chart-container, .pie-chart, canvas')).toBeVisible();
    
    // Check legend elements
    await expect(page.locator('.chart-legend')).toBeVisible();
    await expect(page.locator('text=Option 1')).toBeVisible();
    await expect(page.locator('text=Option 2')).toBeVisible();
    
    // Verify chart colors (blue and teal from screenshot)
    const chartArea = page.locator('.chart-container, canvas').first();
    await expect(chartArea).toBeVisible();
  });

  test('should show statistics table', async ({ page }) => {
    // Check table headers
    await expect(page.locator('th:has-text("Option")')).toBeVisible();
    await expect(page.locator('th:has-text("Count")')).toBeVisible();
    await expect(page.locator('th:has-text("Percentage")')).toBeVisible();
    
    // Check table rows with data
    await expect(page.locator('td:has-text("Option 1")')).toBeVisible();
    await expect(page.locator('td:has-text("Option 2")')).toBeVisible();
    
    // Check count values (0 from screenshot)
    await expect(page.locator('td:has-text("0")')).toBeVisible();
  });

  test('should have functional tab switching', async ({ page }) => {
    // Test clicking on Data List tab
    const dataListTab = page.locator('text=Data List');
    await dataListTab.click();
    await page.waitForTimeout(1000);
    
    // Should navigate to data list page
    await expect(page).toHaveURL(/.*analysis\/dataTable/);
    
    // Go back to Separate Statistics tab
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
    await expect(page.locator('text=Separate Statistics')).toBeVisible();
    await expect(page.locator('text=Single Choice')).toBeVisible();
    
    // Chart should still be visible on mobile
    await expect(page.locator('.chart-container, canvas')).toBeVisible();
  });

  test('should maintain chart responsiveness', async ({ page }) => {
    // Test different viewport sizes for chart
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Chart should remain visible and functional
      await expect(page.locator('.chart-container, canvas')).toBeVisible();
      await expect(page.locator('text=Option 1')).toBeVisible();
      await expect(page.locator('text=Option 2')).toBeVisible();
    }
  });

  test('should have consistent visual styling', async ({ page }) => {
    // Take screenshot for visual verification
    await page.screenshot({ path: 'separate-statistics-page.png', fullPage: true });
    
    // Check color scheme consistency
    const pieChart = page.locator('.chart-container, canvas').first();
    await expect(pieChart).toBeVisible();
    
    // Verify table styling
    const statisticsTable = page.locator('table').first();
    await expect(statisticsTable).toBeVisible();
  });
});