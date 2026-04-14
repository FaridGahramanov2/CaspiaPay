export function formatCurrency(amount) {
  return `₼${Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatDate(dateStr, opts = {}) {
  const d = new Date(dateStr)
  if (opts.short) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  if (opts.time) {
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  if (opts.full) {
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function getStatusColor(status) {
  switch (status) {
    case 'succeeded':
    case 'active':
    case 'completed':
      return 'text-emerald-400 bg-emerald-400/10'
    case 'pending':
      return 'text-amber-400 bg-amber-400/10'
    case 'failed':
    case 'suspended':
      return 'text-red-400 bg-red-400/10'
    case 'refunded':
      return 'text-slate-400 bg-slate-400/10'
    default:
      return 'text-slate-400 bg-slate-400/10'
  }
}

export function truncateId(id, len = 16) {
  if (!id) return ''
  return id.length > len ? id.slice(0, len) + '…' : id
}
