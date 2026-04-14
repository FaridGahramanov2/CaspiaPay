import { MERCHANTS } from './merchants.js'

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const AMOUNT_RANGES = {
  cafe: [2.5, 45],
  electronics: [50, 2500],
  food_delivery: [8, 85],
  grocery: [15, 120],
  auto: [25, 800],
  books: [5, 60],
  fitness: [30, 150],
  travel: [120, 2800],
  cosmetics: [10, 200],
  saas: [29, 299],
  pets: [8, 180],
  education: [20, 350],
  transport: [3, 45],
  furniture: [80, 2500],
}

const PEAK_HOURS = [7, 8, 9, 12, 13, 14, 18, 19, 20, 21]

const DESCRIPTIONS = {
  cafe: ['Coffee & Pastry', 'Lunch Order', 'Morning Brew', 'Breakfast Set', 'Cappuccino', 'Team Lunch'],
  electronics: ['Smartphone Purchase', 'Laptop Order', 'Accessories Bundle', 'Smart TV', 'Tablet', 'Headphones'],
  food_delivery: ['Food Delivery Order', 'Restaurant Meal', 'Express Delivery', 'Family Meal', 'Pizza Order'],
  grocery: ['Weekly Groceries', 'Fresh Produce', 'Grocery Delivery', 'Monthly Stock', 'Organic Bundle'],
  auto: ['Car Parts', 'Service Package', 'Auto Accessories', 'Tires & Wheels', 'Engine Oil'],
  books: ['Book Order', 'Educational Materials', 'Book Bundle', 'Textbooks', 'Novel Collection'],
  fitness: ['Monthly Membership', 'Personal Training', 'Class Pass', 'Annual Plan', 'Supplement Pack'],
  travel: ['Flight Booking', 'Hotel Reservation', 'Tour Package', 'Car Rental', 'Travel Insurance'],
  cosmetics: ['Beauty Products', 'Skincare Set', 'Makeup Bundle', 'Perfume', 'Hair Care Kit'],
  saas: ['Monthly Subscription', 'Annual Plan', 'Pro Tier', 'Business Plan', 'Enterprise License'],
  pets: ['Pet Food & Supplies', 'Vet Services', 'Pet Accessories', 'Grooming Session', 'Toy Bundle'],
  education: ['Course Enrollment', 'Annual Subscription', 'Study Pack', 'Tutoring Session', 'Certification'],
  transport: ['City Ride', 'Airport Transfer', 'Long-Distance Ride', 'Business Trip'],
  furniture: ['Living Room Set', 'Bedroom Furniture', 'Home Decor', 'Office Chair', 'Dining Table'],
}

const CARD_LAST4 = ['4242', '1234', '5678', '9012', '3456', '7890', '2468', '1357', '8642', '9753', '4321', '6789']

function generateHex(seed, length) {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(seededRandom(seed + i * 0.37 + 99) * 16)]
  }
  return result
}

function generateTransactions() {
  const now = new Date('2026-04-13T23:59:59Z')
  const transactions = []

  for (let i = 0; i < 500; i++) {
    const s = i * 137.508 + 1

    const merchantIdx = Math.floor(seededRandom(s + 1) * MERCHANTS.length)
    const merchant = MERCHANTS[merchantIdx]

    const daysAgo = Math.floor(seededRandom(s + 2) * 30)
    const peakRand = seededRandom(s + 3)
    let hour
    if (peakRand < 0.6) {
      hour = PEAK_HOURS[Math.floor(seededRandom(s + 4) * PEAK_HOURS.length)]
    } else {
      hour = Math.floor(seededRandom(s + 5) * 24)
    }

    const txDate = new Date(now)
    txDate.setDate(txDate.getDate() - daysAgo)
    txDate.setHours(hour, Math.floor(seededRandom(s + 6) * 60), Math.floor(seededRandom(s + 7) * 60), 0)

    const [minAmt, maxAmt] = AMOUNT_RANGES[merchant.category] || [10, 500]
    const amount = parseFloat((minAmt + seededRandom(s + 8) * (maxAmt - minAmt)).toFixed(2))

    const statusRand = seededRandom(s + 9)
    const status = statusRand < 0.95 ? 'succeeded' : statusRand < 0.98 ? 'failed' : 'refunded'

    const cardBrand = seededRandom(s + 10) < 0.6 ? 'visa' : 'mastercard'
    const last4 = CARD_LAST4[Math.floor(seededRandom(s + 11) * CARD_LAST4.length)]

    const descs = DESCRIPTIONS[merchant.category] || ['Purchase']
    const description = descs[Math.floor(seededRandom(s + 12) * descs.length)]

    const customerNum = Math.floor(seededRandom(s + 13) * 9000 + 1000)
    const domains = ['gmail.com', 'mail.ru', 'yahoo.com', 'outlook.com', 'azmail.az']
    const domain = domains[Math.floor(seededRandom(s + 14) * domains.length)]

    const txId = 'ch_' + generateHex(s, 12)

    const authorizedAt = status !== 'failed'
      ? new Date(txDate.getTime() + 2000).toISOString()
      : null
    const capturedAt = (status === 'succeeded' || status === 'refunded')
      ? new Date(txDate.getTime() + 5000).toISOString()
      : null
    const settledAt = status === 'succeeded'
      ? new Date(txDate.getTime() + 86400000).toISOString()
      : null
    const refundedAt = status === 'refunded'
      ? new Date(txDate.getTime() + 3600000).toISOString()
      : null

    transactions.push({
      id: txId,
      amount,
      currency: 'AZN',
      status,
      merchant,
      card: {
        brand: cardBrand,
        last4,
        expMonth: 12,
        expYear: 2027,
        threeDSecure: 'authenticated',
      },
      description,
      customerEmail: `user${customerNum}@${domain}`,
      createdAt: txDate.toISOString(),
      authorizedAt,
      capturedAt,
      settledAt,
      refundedAt,
    })
  }

  return transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const TRANSACTIONS = generateTransactions();

export function getAllTransactions() {
  return TRANSACTIONS;
}
