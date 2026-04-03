const navItems = [
  { icon: '/icons/home.svg', label: 'Home', id: 'home' },
  { icon: '/icons/sense.svg', label: 'Sense', id: 'sense' },
  { divider: true },
  { icon: '/icons/work.svg', label: 'Work Orders', id: 'jobs' },
  { icon: '/icons/crm.svg', label: 'CRM', id: 'crm' },
  { icon: '/icons/accounting.svg', label: 'Accounting', id: 'accounting' },
  { icon: '/icons/dispatch.svg', label: 'Disptach', id: 'dispatch' },
  { icon: '/icons/report.svg', label: 'Reports', id: 'reports' },
  { icon: '/icons/more.svg', label: 'More', id: 'more' },
]

export default function Sidebar({ activeScreen, onNavigate }) {
  const activeId =
    activeScreen === 'jobs' || activeScreen === 'jobDetail'
      ? 'jobs'
      : activeScreen === 'estimate'
        ? 'jobs'
        : activeScreen

  return (
    <aside className="w-[72px] h-full bg-zuper-sidebar flex flex-col items-center justify-between px-5 py-3.5 shrink-0">
      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-4 items-start">
          {navItems.map((item, idx) => {
            if (item.divider) {
              return (
                <div key="divider" className="w-8 h-0 border-t border-[rgba(0,0,0,0.12)]" />
              )
            }
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'jobs') onNavigate('jobs')
                }}
                className="flex flex-col gap-1 items-center w-8 cursor-pointer"
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden ${
                    isActive ? 'bg-zuper-sidebar-active' : 'bg-zuper-sidebar'
                  }`}
                >
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] leading-3 text-center whitespace-nowrap ${
                    isActive
                      ? 'font-medium text-[#262626]'
                      : 'font-normal text-zuper-text-nav'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <button className="flex flex-col gap-1 items-center w-8 cursor-pointer">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden bg-zuper-sidebar">
          <img src="/icons/settings.svg" alt="Settings" className="w-5 h-5" />
        </div>
        <span className="text-[10px] leading-3 text-center font-normal text-zuper-text-nav whitespace-nowrap">
          Settings
        </span>
      </button>
    </aside>
  )
}
