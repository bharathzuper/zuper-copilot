export default function FilterBar() {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-3">
      <div className="flex gap-3 items-center w-[673px]">
        <div className="flex gap-[7px] items-center h-8 px-2 bg-white border border-[rgba(0,0,0,0.13)] rounded-md overflow-hidden">
          <span className="text-sm font-medium leading-5 text-[#374151] whitespace-nowrap overflow-hidden text-ellipsis">
            All Jobs
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#4F5E71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex gap-1.5 items-center h-8 pl-2 pr-3 bg-white border border-[rgba(0,0,0,0.13)] rounded-md overflow-hidden" style={{ borderWidth: '0.998px' }}>
          <img src="/icons/filter-icon.svg" alt="" className="w-5 h-5" />
          <span className="text-sm font-medium leading-5 text-[#374151] whitespace-nowrap overflow-hidden text-ellipsis">
            Filter
          </span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button className="bg-white rounded-md w-8 h-8 relative">
          <img src="/icons/search-sm.svg" alt="Search" className="absolute left-2 top-2 w-4 h-4" />
        </button>

        <div className="bg-white rounded-md w-8 h-8 relative">
          <img src="/icons/layout-columns.svg" alt="Columns" className="absolute left-2 top-2 w-4 h-4" />
        </div>

        <div className="flex items-center justify-center p-1.5 bg-[#f9fafb] border border-[#f2f4f7] rounded-lg">
          <div className="flex items-center justify-center px-1.5 py-0.5 bg-white rounded-md shadow-[0_1px_3px_rgba(16,24,40,0.1),0_1px_2px_rgba(16,24,40,0.06)]">
            <img src="/icons/view-list.svg" alt="List" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-center px-1.5 py-0.5 rounded-lg">
            <img src="/icons/view-grid.svg" alt="Grid" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
