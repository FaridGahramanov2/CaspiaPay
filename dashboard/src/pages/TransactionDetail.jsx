import { CheckCircle2, Clock, XCircle, RotateCcw, CreditCard, Store, Mail, Shield } from 'lucide-react'
import Modal from '../components/ui/Modal'
import Badge from '../components/ui/Badge'
import { formatCurrency, formatDate } from '../utils/formatters'

function TimelineStep({ label, time, done, isFailed }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isFailed ? 'bg-red-400/20 text-red-400' :
        done ? 'bg-emerald-400/20 text-emerald-400' :
        'bg-white/5 text-slate-600'
      }`}>
        {isFailed ? <XCircle size={13} /> : done ? <CheckCircle2 size={13} /> : <Clock size={13} />}
      </div>
      <div>
        <p className={`text-sm font-medium ${done || isFailed ? 'text-white' : 'text-slate-600'}`}>{label}</p>
        {time && <p className="text-xs text-slate-500 mt-0.5">{formatDate(time, { full: true })}</p>}
      </div>
    </div>
  )
}

export default function TransactionDetail({ transaction, onClose }) {
  if (!transaction) return null

  const { id, amount, currency, status, merchant, card, description, customerEmail, createdAt, authorizedAt, capturedAt, settledAt, refundedAt } = transaction
  const isFailed = status === 'failed'
  const isRefunded = status === 'refunded'

  return (
    <Modal isOpen={!!transaction} onClose={onClose} title="Transaction Details" size="md">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/5">
        <div>
          <div className="text-3xl font-bold text-white">{formatCurrency(amount)}</div>
          <p className="text-slate-500 text-sm mt-1 font-mono">{id}</p>
        </div>
        <Badge status={status} />
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1.5">
            <Store size={12} />
            <span>Merchant</span>
          </div>
          <p className="text-white text-sm font-medium">{merchant?.name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{merchant?.id}</p>
        </div>

        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1.5">
            <CreditCard size={12} />
            <span>Card</span>
          </div>
          <p className="text-white text-sm font-medium capitalize">
            {card?.brand} •••• {card?.last4}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            Exp {card?.expMonth}/{card?.expYear}
          </p>
        </div>

        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1.5">
            <Mail size={12} />
            <span>Customer</span>
          </div>
          <p className="text-white text-sm font-medium truncate">{customerEmail}</p>
        </div>

        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1.5">
            <Shield size={12} />
            <span>3D Secure</span>
          </div>
          <p className="text-emerald-400 text-sm font-medium capitalize">{card?.threeDSecure}</p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mb-6 bg-navy-900 rounded-xl p-4">
          <p className="text-slate-500 text-xs mb-1">Description</p>
          <p className="text-white text-sm">{description}</p>
        </div>
      )}

      {/* Timeline */}
      <div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Timeline</p>
        <div className="space-y-3 relative">
          <div className="absolute left-3 top-6 bottom-6 w-px bg-white/5" />
          <TimelineStep label="Created" time={createdAt} done />
          <TimelineStep label="Authorized" time={authorizedAt} done={!!authorizedAt} isFailed={isFailed && !authorizedAt} />
          <TimelineStep label="Captured" time={capturedAt} done={!!capturedAt} isFailed={isFailed} />
          {isRefunded ? (
            <TimelineStep label="Refunded" time={refundedAt} done={!!refundedAt} />
          ) : (
            <TimelineStep label="Settled" time={settledAt} done={!!settledAt} isFailed={isFailed} />
          )}
        </div>
      </div>
    </Modal>
  )
}
