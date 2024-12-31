import { test, expect } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('100')).toBeVisible()
  expect(page.getByText('+8% em relação ao mês passado')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('490')).toBeVisible()
  expect(page.getByText('+8% em relação ao mês passado')).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('58')).toBeVisible()
  expect(page.getByText('-2% em relação ao mês passado')).toBeVisible()
})

test('display month revenue orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('R$ 59,00')).toBeVisible()
  expect(page.getByText('-52% em relação ao mês passado')).toBeVisible()
})
