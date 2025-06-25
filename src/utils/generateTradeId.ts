export function generateTradeId(prefix = 'trade'): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let randomPart = ''
  for (let i = 0; i < 6; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)]
  }

  const date = new Date()
  const formatted = date.toISOString().replace(/[-:.TZ]/g, '')

  return `${prefix}-${formatted}-${randomPart}`
}
