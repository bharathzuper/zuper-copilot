const statusConfig = {
  Started: '#d3e8fc',
  'On Hold': '#f9dddd',
  New: '#fff8e7',
  Paused: '#f9dddd',
}

export default function StatusBadge({ status, copilotContext }) {
  const bg = statusConfig[status] || '#f3f4f6'

  return (
    <div
      data-copilot-context={copilotContext || null}
      className="inline-flex items-start"
    >
      <div
        className="inline-flex items-center justify-center px-2 py-1 rounded-md"
        style={{ backgroundColor: bg }}
      >
        <span className="text-xs font-normal leading-normal text-[rgba(0,0,0,0.8)] whitespace-nowrap">
          {status}
        </span>
      </div>
    </div>
  )
}
