import { mockJobs } from '../../data/mockJobs'
import StatusBadge from './StatusBadge'
import FilterBar from './FilterBar'

export default function JobsList({ onSelectJob, onNavigate }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      {/* Module Header */}
      <div
        className="flex items-center justify-between px-6 py-2.5 bg-white border-b"
        style={{ borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 4px 4px rgba(0,0,0,0.02)' }}
      >
        <div className="flex items-start">
          <div className="flex gap-2.5 items-center rounded-md">
            <span className="text-lg font-medium leading-5 text-[#262626] tracking-[0.09px]">
              Jobs
            </span>
            <div className="flex items-center px-1.5 py-0.5 bg-zuper-sidebar-active rounded-[30px]">
              <span className="text-xs font-medium text-[#2a292e] tracking-[0.2px] leading-[1.4]">
                32
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button className="bg-white border border-[rgba(0,0,0,0.13)] rounded-md px-[13px] py-1.5 shadow-sm overflow-hidden">
            <span className="text-sm font-medium leading-4 text-[#374151] whitespace-nowrap">
              Recurring Jobs
            </span>
          </button>
          <button
            data-copilot-context="create-job-button"
            className="bg-[#2a292e] rounded-md px-[13px] py-1.5 shadow-sm overflow-hidden"
          >
            <span className="text-sm font-medium leading-4 text-white whitespace-nowrap">
              New Job
            </span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Table */}
      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="w-16 bg-white border-t border-b px-6 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="w-4 h-4 bg-white border border-[#d0d5dd] rounded" />
              </th>
              <th className="w-40 bg-white border-t border-b pr-3 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-sm font-semibold text-zuper-text tracking-[0.2px] leading-[1.4]">
                  Work Order Number
                </span>
              </th>
              <th className="w-60 bg-white border-t border-b px-3 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="flex gap-3 items-center">
                  <span className="text-sm font-semibold text-zuper-text tracking-[0.2px] leading-[1.4]">
                    Job Title
                  </span>
                  <img src="/icons/sort.svg" alt="Sort" className="w-5 h-5" />
                </div>
              </th>
              <th className="w-[200px] bg-white border-t border-b px-3 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-sm font-semibold text-zuper-text tracking-[0.2px] leading-[1.4]">
                  Customer
                </span>
              </th>
              <th className="w-[200px] bg-white border-t border-b px-3 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-sm font-semibold text-zuper-text tracking-[0.2px] leading-[1.4]">
                  Status
                </span>
              </th>
              <th className="w-40 bg-white border-t border-b px-3 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-sm font-semibold text-zuper-text tracking-[0.2px] leading-[1.4]">
                  Location
                </span>
              </th>
              <th className="bg-white border-t border-b px-3 py-3 text-left" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-sm font-semibold text-zuper-text tracking-[0.2px] leading-[1.4]">
                  User Assigned
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockJobs.map((job) => (
              <tr
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="cursor-pointer hover:bg-[#fafafa] transition-colors"
              >
                <td className="bg-white border-b border-zuper-border px-6 py-2.5 h-10">
                  <div className="w-4 h-4 bg-white border border-[#d0d5dd] rounded" />
                </td>
                <td className="bg-white border-b border-zuper-border pr-3 py-2.5 h-10">
                  <span className="text-sm font-normal text-zuper-text-secondary tracking-[0.2px] leading-[1.4]">
                    {job.id}
                  </span>
                </td>
                <td className="bg-white border-b border-zuper-border px-3 py-2.5 h-10">
                  <span
                    data-copilot-context={`job-title-${job.id}`}
                    className="text-sm font-medium text-zuper-text-secondary tracking-[0.2px] leading-[1.4]"
                  >
                    {job.title}
                  </span>
                </td>
                <td className="bg-white border-b border-zuper-border px-3 py-2.5 h-10">
                  <span className="text-sm font-normal text-zuper-text-secondary tracking-[0.2px] leading-[1.4]">
                    {job.customer}
                  </span>
                </td>
                <td className="bg-white border-b border-zuper-border px-3 py-2 h-10">
                  <StatusBadge status={job.status} />
                </td>
                <td className="bg-white border-b border-zuper-border px-3 py-2.5 h-10">
                  <span className="text-sm font-normal text-zuper-text-secondary tracking-[0.2px] leading-[1.4]">
                    {job.location}
                  </span>
                </td>
                <td className="bg-white border-b border-zuper-border px-3 py-2.5 h-10">
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full bg-[#f0f3f8] flex items-center justify-center shrink-0">
                      <span className="text-sm font-medium text-zuper-text-secondary tracking-[0.2px] leading-[1.4]">
                        {job.assignedInitial}
                      </span>
                    </div>
                    <span className="text-sm font-normal text-zuper-text-secondary tracking-[0.2px] leading-[1.4]">
                      {job.assignedTo}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-[#e8edf1] shrink-0">
        <div className="flex gap-10 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-zuper-muted tracking-[0.2px] leading-[1.4] whitespace-nowrap">
              Items per page:
            </span>
            <div className="flex items-center justify-between h-8 w-[70px] pl-2 pr-2.5 bg-white border border-[#e8edf1] rounded-md shadow-sm">
              <span className="text-sm font-medium text-[#374151] leading-5">100</span>
              <img src="/icons/page-chevron.svg" alt="" className="w-[18px] h-[18px]" />
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <span className="text-xs font-medium text-zuper-muted tracking-[0.2px] leading-[1.4] whitespace-nowrap">
              Page 1 of 5
            </span>
            <button className="w-6 h-6 flex items-center justify-center">
              <img src="/icons/page-first.svg" alt="First" className="w-6 h-6" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center">
              <img src="/icons/page-prev.svg" alt="Prev" className="w-6 h-6" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center">
              <img src="/icons/page-next.svg" alt="Next" className="w-6 h-6" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center">
              <img src="/icons/page-last.svg" alt="Last" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-10 items-start">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-normal text-zuper-muted tracking-[0.2px] leading-[1.4] whitespace-nowrap">
              Go to:
            </span>
            <div className="flex items-center h-8 w-20 px-3 py-1.5 bg-white border border-[#e8edf1] rounded-md shadow-sm">
              <span className="text-sm font-medium text-[#374151] leading-5">1</span>
            </div>
          </div>

          <button className="flex gap-2 items-center justify-center bg-white border border-[#d1d5db] rounded-md pl-[9px] pr-4 py-1.5 overflow-hidden">
            <img src="/icons/export.svg" alt="" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#374151] leading-5 whitespace-nowrap overflow-hidden text-ellipsis">
              Export
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
