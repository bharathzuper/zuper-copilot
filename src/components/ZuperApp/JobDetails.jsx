import { useState } from 'react'
import {
  ChevronRight, Star, MoreHorizontal, Plus, Printer,
  ChevronDown, ChevronUp, MapPin, User, Calendar,
  UserCircle, Tag, Check, Clock, Sparkles, ThumbsUp,
  ThumbsDown, Copy, ExternalLink, MessageCircle,
  Home, FileText, Briefcase, ArrowRight,
  BarChart3, AlignLeft, Globe, Settings, Box,
} from 'lucide-react'

const roofPhoto = '/images/job-details/roof-photo.jpg'
const avatar1 = '/images/job-details/avatar-1.png'
const avatar2 = '/images/job-details/avatar-2.png'
const avatar3 = '/images/job-details/avatar-3.png'
const avatarAndy = '/images/job-details/avatar-andy.png'
const mapImage = '/images/job-details/map.png'

export default function JobDetails({ job, onBack }) {
  const [activeTab] = useState('Overview')

  const tabs = [
    { label: 'Overview', count: null },
    { label: 'Notes', count: 2 },
    { label: 'Tasks', count: 1 },
    { label: 'Files', count: null },
    { label: 'Gallery', count: null },
    { label: 'Activity History', count: null },
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden" data-copilot-context="job-detail-page">
      <ModuleHeader onBack={onBack} />
      <TitleSection />
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <LeftPanel />
        <CenterContent tabs={tabs} activeTab={activeTab} />
        <RightPanel />
      </div>
    </div>
  )
}

function ModuleHeader({ onBack }) {
  return (
    <div className="flex items-center justify-between px-10 py-4 bg-white border-b border-[#e5e5e5] shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-sm font-medium text-[#737373] hover:text-[#262626] transition-colors"
        >
          Jobs
        </button>
        <ChevronRight className="w-3 h-3 text-[#737373]" />
        <span className="text-sm font-medium text-[#262626]">#JN-245678</span>
        <button className="hover:text-amber-500 transition-colors">
          <Star className="w-5 h-5 text-[#a3a3a3]" strokeWidth={1.5} />
        </button>
        <button className="hover:bg-[#f5f5f5] rounded p-0.5 transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#737373]" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[#374151]">1/30</span>
        <div className="flex items-center gap-3">
          <button className="hover:bg-[#f5f5f5] rounded transition-colors">
            <ChevronUp className="w-4 h-4 text-[#737373]" />
          </button>
          <button className="hover:bg-[#f5f5f5] rounded transition-colors">
            <ChevronDown className="w-4 h-4 text-[#737373]" />
          </button>
        </div>
      </div>
    </div>
  )
}

function TitleSection() {
  return (
    <div className="px-10 py-4 bg-white border-b border-[#e5e5e5] shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full bg-[#ef4444]" />
          <h1 className="text-xl font-semibold text-[#111827] tracking-[-0.01em]">
            Roof Replacement - Telnet
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <button className="px-4 py-1.5 bg-[#2a292e] text-white text-sm font-medium rounded-md shadow-sm hover:bg-[#3a393e] transition-colors">
              Update Status
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#ececed] rounded-md bg-white hover:bg-[#f9fafb] transition-colors">
              <Plus className="w-5 h-5 text-[#374151]" strokeWidth={1.5} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#ececed] rounded-md bg-white hover:bg-[#f9fafb] transition-colors">
              <Printer className="w-5 h-5 text-[#374151]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="w-px h-8 bg-[#e5e7eb]" />
          <button className="w-8 h-8 flex items-center justify-center border border-[#ececed] rounded-md bg-white hover:bg-[#f9fafb] transition-colors">
            <MoreHorizontal className="w-5 h-5 text-[#374151]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dbeafe] text-xs font-medium text-[#075985]">
          <span className="w-[11px] h-[11px] rounded-full bg-[#38bdf8]" />
          On Going
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] text-xs font-medium text-[#374151]">
          <MapPin className="w-3 h-3" strokeWidth={2} />
          2847 Sunset Boulevard, Los Angeles, CA 90026
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] text-xs font-medium text-[#374151]">
          <span className="w-4 h-4 rounded-full bg-[#6b7280] flex items-center justify-center text-[9px] font-semibold text-white tracking-wider">
            JD
          </span>
          John Davis
        </span>
      </div>
    </div>
  )
}

function LeftPanel() {
  const [aboutOpen, setAboutOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(true)

  return (
    <div className="w-[409px] shrink-0 border-r border-[#e5e5e5] bg-white overflow-y-auto">
      <div className="p-6">
        <button
          onClick={() => setAboutOpen(!aboutOpen)}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-sm font-semibold text-[#33475b] tracking-[-0.01em]">
            About this job
          </h3>
          <ChevronDown
            className={`w-4 h-4 text-[#737373] transition-transform ${aboutOpen ? '' : '-rotate-90'}`}
          />
        </button>

        {aboutOpen && (
          <>
            <div className="rounded-t-lg border border-[#e5e7eb] overflow-hidden mb-0">
              <img
                src={roofPhoto}
                alt="Job site"
                className="w-full h-[177px] object-cover"
              />
            </div>
            <div className="bg-white rounded-b-xl p-3 space-y-3">
              <DetailRow icon={User} label="Customer" value="Craig Calzoni" />
              <DetailRow icon={Calendar} label="Schedule" value="20- 24 Dec 2024 6:00 PM" />
              <DetailRow icon={UserCircle} label="Created by" value="Tom Riddle" />
              <DetailRow icon={Briefcase} label="Category" value="Installation" isBadge />
              <div className="flex items-center h-8">
                <div className="flex items-center gap-2 w-[128px]">
                  <User className="w-4 h-4 text-black/48" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-black/48 tracking-[0.07px]">Assignees</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-2">
                    <img src={avatar1} alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                    <img src={avatar2} alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                    <img src={avatar3} alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#ebebeb] border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-[#4b5563] tracking-wide">+2</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center h-8">
                <div className="flex items-center gap-2 w-[128px]">
                  <Tag className="w-4 h-4 text-black/48" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-black/48 tracking-[0.07px]">Tags</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {['Tag #1', 'Tag #2', 'Tag #3'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-black/[0.08] text-sm font-medium text-black/72">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mx-6 border-t border-[#e5e7eb]" />

      <div className="p-6 pt-4">
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="flex items-center justify-between w-full px-3 py-2.5"
        >
          <span className="text-sm font-semibold text-[#374151]">Status history</span>
          <ChevronDown
            className={`w-4 h-4 text-[#737373] transition-transform ${historyOpen ? '' : '-rotate-90'}`}
          />
        </button>

        {historyOpen && (
          <div className="mt-4">
            <StatusUpdateDropdown />
            <StatusTimeline />
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ icon: Icon, label, value, isBadge }) {
  return (
    <div className="flex items-center h-8">
      <div className="flex items-center gap-2 w-[128px]">
        <Icon className="w-4 h-4 text-black/48" strokeWidth={1.5} />
        <span className="text-sm font-medium text-black/48 tracking-[0.07px]">{label}</span>
      </div>
      {isBadge ? (
        <span className="px-1.5 py-0.5 rounded bg-black/[0.08] text-sm font-medium text-black/72">
          {value}
        </span>
      ) : (
        <span className="text-sm font-medium text-black/72 tracking-[0.07px]">{value}</span>
      )}
    </div>
  )
}

function StatusUpdateDropdown() {
  return (
    <div className="flex gap-1.5 items-start">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-full border border-[#e5e7eb] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
        </div>
        <div className="w-px h-[90px] bg-[#e5e7eb]" />
      </div>
      <div className="flex-1 bg-white border border-[#e5e7eb] rounded-xl p-4 ml-1.5">
        <p className="text-sm font-medium text-[#4b5563] mb-1">Update status</p>
        <div className="flex items-center justify-between px-2 py-1.5 border border-[#d1d5db] rounded-md">
          <span className="text-sm text-[#9ca3af] px-1">Select status</span>
          <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
        </div>
      </div>
    </div>
  )
}

function StatusTimeline() {
  const statuses = [
    {
      status: 'On Going',
      statusColor: '#075985',
      dotColor: '#38bdf8',
      user: 'Andy Sam',
      avatar: avatarAndy,
      description: 'Job has been initiated and collected initial reports. Awaiting further instructions from dispatcher.',
      date: '2025/03/15 10:30 AM',
      duration: '10 mins',
      hasChecklist: true,
    },
    {
      status: 'Scheduled',
      statusColor: '#5b21b6',
      dotColor: '#a78bfa',
      user: 'Andy Sam',
      avatar: avatarAndy,
      description: 'Assigned respective team and scheduled date - customer has approved.',
      date: '2025/03/13 10:00 AM',
      quote: 'Pre defined text',
      hasChecklist: false,
    },
    {
      status: 'New',
      statusColor: '#155e75',
      dotColor: '#2dd4bf',
      user: 'Andy Sam',
      avatar: avatarAndy,
      description: null,
      date: '2025/03/12 12:34 PM',
      hasChecklist: true,
    },
  ]

  return (
    <div className="space-y-0">
      {statuses.map((s, i) => (
        <div key={i} className="flex gap-1.5 items-start">
          <div className="flex flex-col items-center shrink-0">
            {i > 0 && <div className="w-px h-3 bg-[#e5e7eb]" />}
            <div className="w-6 h-6 rounded-full border border-[#e5e7eb] flex items-center justify-center">
              {i === 0 ? (
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
              ) : (
                <Check className="w-3 h-3 text-[#9ca3af]" strokeWidth={2} />
              )}
            </div>
            {i < statuses.length - 1 && (
              <div className="relative w-px flex-1 min-h-[140px] bg-[#e5e7eb]">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xs text-[#1f2937] bg-[#f9fafb] px-1.5 whitespace-nowrap tracking-wide">
                  10 mins
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 bg-white border border-[#e5e7eb] rounded-xl p-4 ml-1.5 mb-3">
            <div className="flex items-center gap-1 mb-1.5">
              <span
                className="w-[11px] h-[11px] rounded-full"
                style={{ backgroundColor: s.dotColor }}
              />
              <span className="text-sm font-medium" style={{ color: s.statusColor }}>
                {s.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <img src={s.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-sm font-medium text-[#111827]">{s.user}</span>
              </div>
              {s.description && (
                <p className="text-sm text-[#1f2937] leading-5">{s.description}</p>
              )}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#1f2937] tracking-wide">{s.date}</span>
                {s.duration && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#1f2937]" strokeWidth={1.5} />
                    <span className="text-xs text-[#1f2937] tracking-wide">{s.duration}</span>
                  </div>
                )}
              </div>
              {s.quote && (
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#1f2937]" strokeWidth={1.5} />
                  <span className="text-sm text-[#1f2937]">{s.quote}</span>
                </div>
              )}
              {s.hasChecklist && (
                <button className="text-sm font-medium text-[#5046e5] hover:text-[#4338ca] transition-colors">
                  View checklist
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CenterContent({ tabs, activeTab }) {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#fdfdfc] overflow-hidden">
      <div className="bg-white border-b border-[#e8e0d4] shrink-0">
        <div className="flex items-center gap-1 px-6 h-[47px]">
          {tabs.map((tab, i) => (
            <div key={tab.label} className="flex items-center">
              {i === 1 && <div className="w-px h-7 bg-[#e5e7eb] mx-0.5 rotate-90" />}
              <button
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium tracking-[-0.01em] border-b-2 transition-colors ${
                  tab.label === activeTab
                    ? 'text-[#333] border-[#333]'
                    : 'text-[#888] border-transparent hover:text-[#555]'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#e8e0d4] text-[11px] font-medium text-[#555] min-w-[18px] h-[17px]">
                    {tab.count}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8 space-y-6">
        <HighlightsSection />
        <AiSummarySection />
        <JobDescriptionSection />
        <AddressesSection />
        <OtherDetailsSection />
        <PackageDetailsSection />
      </div>
    </div>
  )
}

function SectionHeader({ icon: Icon, label, iconSize = 18 }) {
  return (
    <div className="flex items-center gap-1.5 px-1.5">
      <Icon className="text-[#262626]" style={{ width: iconSize, height: iconSize }} strokeWidth={1.5} />
      <span className="text-sm font-medium text-[#262626]">{label}</span>
    </div>
  )
}

function HighlightsSection() {
  const highlights = [
    { label: 'Job Due Date', value: '23 Oct 2025', color: '#1e2939' },
    { label: 'Job Value', value: '$ 10000', color: '#1e2939' },
    { label: 'Tasks Completed', value: '0/4', color: '#1e2939' },
    { label: 'Job Profit', value: '$ 1000', color: '#22c55e' },
  ]

  return (
    <div className="space-y-2.5">
      <SectionHeader icon={BarChart3} label="Highlights" />
      <div className="grid grid-cols-4 gap-4">
        {highlights.map((h) => (
          <div key={h.label} className="bg-white border border-[#e5e5e5] rounded-xl p-3">
            <p className="text-xs text-[#4a5565] leading-4">{h.label}</p>
            <p
              className="text-base font-semibold leading-7 tracking-[-0.03em]"
              style={{ color: h.color }}
            >
              {h.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AiSummarySection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Sparkles} label="AI Job Summary" iconSize={16} />
      <div
        className="rounded-[10px] border border-[#e9d4ff] p-3.5 space-y-2"
        style={{
          background: 'linear-gradient(163deg, rgb(250, 245, 255) 0%, rgb(239, 246, 255) 100%)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#6b7280] tracking-wide">Generated Dec 31, 2025</span>
          <button className="p-0.5 hover:bg-white/50 rounded transition-colors">
            <Copy className="w-3 h-3 text-[#9ca3af]" />
          </button>
        </div>
        <p className="text-[11px] text-[#374151] leading-[18px] tracking-[0.06px]">
          Residential roof replacement project for a 2,450 sq ft asphalt shingle roof with 6/12 slope.
          The job involves removing 2 layers of old shingles and installing new charcoal gray shingles
          with a 25-year warranty.
        </p>
        <p className="text-[11px] text-[#374151] leading-[18px] tracking-[0.06px]">
          <span className="font-medium">Key highlights:</span> Ice & water shield on valleys and eaves,
          synthetic underlayment, ridge vents for ventilation. Building permit approved (#BP-2024-1234).
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1 hover:bg-white/50 rounded transition-colors">
            <ThumbsUp className="w-3.5 h-3.5 text-[#9ca3af]" />
          </button>
          <button className="p-1 hover:bg-white/50 rounded transition-colors">
            <ThumbsDown className="w-3.5 h-3.5 text-[#9ca3af]" />
          </button>
          <button className="p-1 hover:bg-white/50 rounded transition-colors">
            <Copy className="w-3.5 h-3.5 text-[#9ca3af]" />
          </button>
        </div>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#dab2ff] rounded-lg text-[11px] font-medium text-[#7c3aed] tracking-[0.06px] hover:bg-purple-50 transition-colors">
          <Sparkles className="w-3 h-3" />
          Ask a question
        </button>
      </div>
    </div>
  )
}

function JobDescriptionSection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={AlignLeft} label="Job description" />
      <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden">
        <div className="p-3.5">
          <p className="text-sm text-black/72 leading-5">
            Build, manage and optimize with new ISP infrastructure. Ensure seamless connectivity for the client,
            troubleshoot network issues, and collaborate with cross-functional teams to enhance service delivery.
          </p>
        </div>
      </div>
    </div>
  )
}

function AddressesSection() {
  return (
    <div className="space-y-2.5">
      <SectionHeader icon={Globe} label="Addresses" />
      <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden flex relative">
        <div className="flex flex-1">
          <div className="flex-1 p-3.5 space-y-2.5">
            <p className="text-sm font-medium text-black/56 tracking-[0.07px]">Service Address</p>
            <p className="text-sm text-black/72 leading-5">
              45 Maple Avenue, London, UK,<br />
              England - SW1A 1AA
            </p>
            <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-[#fce7f3] text-xs font-medium text-[#db2777]">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              San Jose Territory
            </span>
          </div>

          <div className="flex-1 p-3.5">
            <p className="text-sm font-medium text-black/56 tracking-[0.07px]">Billing Address</p>
            <p className="text-sm text-black/72 leading-5 mt-2.5">
              123 Maple Avenue, Sunnyvale, CA, USA,<br />
              California - 94086
            </p>
          </div>
        </div>

        <button className="absolute right-[132px] top-1/2 -translate-y-1/2 z-10 inline-flex items-center gap-1.5 px-2 py-1.5 bg-white border border-[#d1d5db] rounded-md shadow-sm text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
          <ExternalLink className="w-5 h-5" strokeWidth={1.5} />
          Show in maps
        </button>

        <div className="w-[123px] shrink-0 relative overflow-hidden">
          <img
            src={mapImage}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" style={{ width: '40%' }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full bg-[#059669] border-[3px] border-white shadow-md" />
        </div>
      </div>
    </div>
  )
}

function OtherDetailsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Settings} label="Other details" />
      <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden">
        <div className="flex gap-6 p-3.5">
          <div className="flex-1 space-y-2.5">
            <p className="text-sm font-medium text-[#737373]">Remarks</p>
            <p className="text-sm text-black leading-5">
              Additional 50m CAT-6 cables and 10m optic fiber cable required.
            </p>
          </div>
          <div className="flex-1 space-y-2.5">
            <p className="text-sm font-medium text-[#737373]">Additional information</p>
            <p className="text-sm text-black leading-5">
              Implement CGNAT for this as client has not opted for static IP package.
            </p>
          </div>
          <div className="flex-1 space-y-2.5">
            <p className="text-sm font-medium text-[#737373]">Package instructions</p>
            <p className="text-sm text-black leading-5">
              FUP bandwidth required 5TB / month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PackageDetailsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Box} label="Package details" />
      <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden">
        <div className="flex gap-6 p-3.5">
          <div className="flex-1 space-y-2.5">
            <p className="text-sm font-medium text-[#737373]">Selected package</p>
            <p className="text-sm text-black leading-5">
              Storm Blaze - 545mbps uplink + 5TB FUP + WiFi 7 @ $45.88/month
            </p>
          </div>
          <div className="flex-1 space-y-2.5">
            <p className="text-sm font-medium text-[#737373]">Deposit collected</p>
            <p className="text-sm text-black leading-5">No</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function RightPanel() {
  return (
    <div className="w-[356px] shrink-0 bg-white flex flex-col overflow-hidden">
      <div className="px-4 py-3.5 border-b border-[#e8e0d4] border-l shadow-[0_1px_5px_rgba(207,207,207,0.25)] shrink-0">
        <span className="text-sm font-medium text-[#262626]">Associations</span>
      </div>
      <div className="flex-1 overflow-y-auto border-l border-[#e5e5e5] px-4 py-6 space-y-6">
        <PropertyCard />
        <InvoicesCard />
        <OrganizationCard />
        <CollapsibleAssociation label="Contracts" />
        <CollapsibleAssociation label="Assets" />
      </div>
    </div>
  )
}

function PropertyCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-[#33475b]" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-[#33475b] tracking-[-0.01em]">Property</span>
        </div>
        <ChevronDown className="w-4 h-4 text-[#737373]" />
      </div>
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden p-4 space-y-4">
        <div className="border-b border-[#e5e7eb] pb-4 pt-3">
          <div className="flex gap-3">
            <div className="w-[62px] h-[62px] rounded-[10px] bg-[#f9fafb] border border-black/5 flex items-center justify-center">
              <Home className="w-6 h-6 text-[#9ca3af]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black/72 tracking-[-0.01em] truncate">
                  Maven Roofing Property
                </span>
                <button className="shrink-0 p-1 hover:bg-[#f5f5f5] rounded transition-colors">
                  <ExternalLink className="w-4 h-4 text-[#9ca3af]" />
                </button>
              </div>
              <p className="text-xs text-[#6b7280] mt-1">3 Jobs</p>
              <p className="text-xs text-black/72 mt-1 leading-[18px]">
                Los Angeles County, California, USA
              </p>
            </div>
          </div>
        </div>
        <ViewAllButton />
      </div>
    </div>
  )
}

function InvoicesCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#33475b]" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-[#33475b] tracking-[-0.01em]">Invoices (4)</span>
        </div>
        <ChevronDown className="w-4 h-4 text-[#737373]" />
      </div>
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden p-4 space-y-4">
        <div className="border-b border-[#e5e7eb] pb-4">
          <div className="flex items-center justify-between py-0.5">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#737373]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-black/72 tracking-[-0.01em]">#INV-2024-1234</span>
            </div>
            <button className="p-1 hover:bg-[#f5f5f5] rounded transition-colors">
              <ExternalLink className="w-4 h-4 text-[#9ca3af]" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <InvoiceRow label="Customer" value="Sarah Johnson" />
          <InvoiceRow label="Organisation" value="Maven Roofing" />
          <InvoiceRow label="Due on" value="15th Jan 2025" />
          <InvoiceRow label="Amount" value="$8,450.00" />
        </div>
        <ViewAllButton />
      </div>
    </div>
  )
}

function InvoiceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between h-[21px]">
      <span className="text-xs font-medium text-[#6b7280]">{label}</span>
      <span className="text-sm font-medium text-black/72 tracking-[-0.01em]">{value}</span>
    </div>
  )
}

function OrganizationCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#33475b]" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-[#33475b] tracking-[-0.01em]">Organization</span>
        </div>
        <ChevronDown className="w-4 h-4 text-[#737373]" />
      </div>
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden p-4 space-y-4">
        <div className="border-b border-[#e5e7eb] pb-4 pt-3 px-3">
          <div className="flex gap-3">
            <div className="w-[62px] h-[62px] rounded-[10px] bg-[#f9fafb] border border-black/5 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#9ca3af]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black/72 tracking-[-0.01em] truncate">
                  Maven Roofing Inc.
                </span>
                <button className="shrink-0 p-1 hover:bg-[#f5f5f5] rounded transition-colors">
                  <ExternalLink className="w-4 h-4 text-[#9ca3af]" />
                </button>
              </div>
              <p className="text-xs text-[#6b7280] mt-1">Roofing & Construction</p>
              <p className="text-xs text-black/72 mt-1 leading-[18px]">
                Los Angeles, California, USA
              </p>
            </div>
          </div>
        </div>
        <ViewAllButton />
      </div>
    </div>
  )
}

function CollapsibleAssociation({ label }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Briefcase className="w-4 h-4 text-[#33475b]" strokeWidth={1.5} />
        <span className="text-sm font-semibold text-[#33475b] tracking-[-0.01em]">{label}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-[#737373]" />
    </div>
  )
}

function ViewAllButton() {
  return (
    <button className="flex items-center justify-center gap-2 w-full py-1 px-2.5 rounded-md bg-black/[0.04] text-sm font-medium text-[#374151] hover:bg-black/[0.08] transition-colors">
      View all
      <ArrowRight className="w-4 h-4" />
    </button>
  )
}
