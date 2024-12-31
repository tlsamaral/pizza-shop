import { expect, test } from '@playwright/test';

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()

  page.waitForTimeout(1000)
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  expect(page.getByRole('cell', { name: 'Customer 12', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 20' })).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  expect(page.getByRole('cell', { name: 'Customer 51', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 60' })).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  expect(page.getByRole('cell', { name: 'Customer 41', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 50' })).toBeVisible()
  
  await page.getByRole('button', { name: 'Primeira página' }).click()

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-1')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
  page.waitForTimeout(1000)
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableRows = page.getByRole('cell', { name: 'Pendente' })

  await expect(tableRows).toHaveCount(10)
})