import { MERCHANTS } from './merchants.js'

export const PAYOUTS = MERCHANTS
  .filter(m => m.status === 'active' || m.status === 'suspended')
  .flatMap((merchant, i) => [
    {
      id: `po_${merchant.id}_001`,
      merchantId: merchant.id,
      merchantName: merchant.name,
      amount: parseFloat((merchant.volume * 0.35).toFixed(2)),
      bank: merchant.bank,
      accountLast4: merchant.accountLast4,
      status: 'completed',
      date: '2026-04-07T10:00:00Z',
      period: 'Mar 31 – Apr 6',
    },
    {
      id: `po_${merchant.id}_002`,
      merchantId: merchant.id,
      merchantName: merchant.name,
      amount: parseFloat((merchant.volume * 0.32).toFixed(2)),
      bank: merchant.bank,
      accountLast4: merchant.accountLast4,
      status: merchant.status === 'suspended' ? 'failed' : 'pending',
      date: '2026-04-14T10:00:00Z',
      period: 'Apr 7 – Apr 13',
    },
  ]);

export function getPayouts() {
  return PAYOUTS.map(p => ({
    id: p.id,
    merchant: {
      id: p.merchantId,
      name: p.merchantName,
    },
    amount: p.amount * 100, // Convert to qəpik
    bank: p.bank,
    status: p.status,
    paid_date: p.status === 'completed' ? p.date : null,
    scheduled_date: p.status === 'pending' ? p.date : null,
  }));
}
