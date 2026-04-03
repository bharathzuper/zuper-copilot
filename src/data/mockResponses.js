export const mockResponses = {
  'unassigned-badge': {
    text: "I can see Job 1043 for Blue Ridge HOA is currently unassigned. To assign a technician, click the assignment card on the right and select from your available field team. I can see Mike Torres and Sarah Kim are already scheduled this week — you may want to check their availability first.",
    chips: [{ label: 'Open Assignment Panel', icon: 'UserPlus' }],
    audioKey: 'unassigned-badge',
  },
  'draft-status': {
    text: "This job is still in Draft status, which means it hasn't been confirmed or scheduled yet. To move it forward, click the Edit button to complete any missing details, then change the status to Scheduled or Pending Approval depending on your workflow.",
    chips: [{ label: 'Edit Job', icon: 'Pencil' }],
    audioKey: 'draft-status',
  },
  'create-job-button': {
    text: "The Create Job button starts a new job. You'll need a customer, job category, and at minimum a description to save it as a draft. Want me to walk you through each step?",
    chips: [{ label: 'Start Walkthrough', icon: 'BookOpen' }],
    audioKey: 'create-job-button',
  },
  'estimate-line-items': {
    text: "I can see you have 3 line items totaling $14,400. To add more items, click the + Add Line Item row at the bottom. You can also apply a discount at the line item level or to the total using the discount field below.",
    chips: [{ label: 'Add Line Item', icon: 'Plus' }],
    audioKey: 'estimate-line-items',
  },
  'empty-schedule': {
    text: "This job doesn't have a scheduled date yet. Click Schedule in the top action bar to open the scheduling panel where you can pick a date, time window, and assign your technician in one step.",
    chips: [{ label: 'Open Scheduler', icon: 'Calendar' }],
    audioKey: 'empty-schedule',
  },
  'screenshot-what-next': {
    text: "Looking at your screen, you're on the Jobs List and I can see Job 1043 for Blue Ridge HOA is in Draft and unassigned — that looks like it needs attention before the week starts. I'd recommend opening that job and completing the assignment and scheduling. Want me to take you there?",
    chips: [{ label: 'Open JOB-1043', icon: 'ExternalLink' }],
    audioKey: 'screenshot-what-next',
  },
  'in-progress-status': {
    text: "This job is currently In Progress, meaning a technician has been assigned and work has started on site. You can track progress through the Work Orders tab, or check the Activity tab for recent updates from the field team.",
    chips: [{ label: 'View Activity', icon: 'Clock' }],
    audioKey: 'in-progress-status',
  },
  'scheduled-status': {
    text: "This job is Scheduled and ready to go. The assigned technician will receive a notification before the scheduled date. You can view the schedule in the Calendar view or modify the time window if needed.",
    chips: [{ label: 'View Calendar', icon: 'Calendar' }],
    audioKey: 'scheduled-status',
  },
  'pending-status': {
    text: "This job is Pending Approval — it's been created and filled out but needs management sign-off before it can be scheduled. Review the job details and either Approve to move it to Scheduled, or send it back for revisions.",
    chips: [{ label: 'Review & Approve', icon: 'CheckCircle' }],
    audioKey: 'pending-status',
  },
  'job-amount': {
    text: "This shows the estimated job value. The amount is calculated from the associated estimate line items. To update it, edit the linked estimate or create a new one from the Estimates tab in the job detail view.",
    chips: [{ label: 'View Estimate', icon: 'FileText' }],
    audioKey: 'job-amount',
  },
  'customer-card': {
    text: "Here's the customer information for this job. You can click the phone number to call directly, or the email to send a message. The address links to Google Maps for easy navigation to the job site.",
    chips: [{ label: 'Contact Customer', icon: 'Phone' }],
    audioKey: 'customer-card',
  },
  'assignment-card': {
    text: "The assignment card shows which technician is responsible for this job. You can reassign by clicking the card and selecting a different team member. Check the Schedule view to see everyone's availability before making changes.",
    chips: [{ label: 'Change Assignment', icon: 'UserPlus' }],
    audioKey: 'assignment-card',
  },
  fallback: {
    text: "I can see your screen. What would you like help with? You can circle any part of the screen and ask me about it, or just tell me what you're trying to do.",
    chips: [{ label: 'Show Me How', icon: 'HelpCircle' }],
    audioKey: 'fallback',
  },
}

const chatResponses = [
  {
    keywords: ['create', 'new job', 'add job'],
    text: "To create a new job, click the '+ New' button in the top right of the Jobs List. You'll need to fill in the customer name, job category, and a description at minimum. Once saved, it starts as a Draft — you can then schedule and assign it.",
    chips: [{ label: 'Create Job', icon: 'Plus' }],
    audioKey: 'chat-create-job',
  },
  {
    keywords: ['schedule', 'calendar', 'book', 'appointment'],
    text: "You can schedule jobs from the Job Details page — click the Schedule button in the top action bar. Pick a date, time window, and assign a technician all in one step. You can also drag and drop jobs in the Calendar view for quick rescheduling.",
    chips: [{ label: 'Open Calendar', icon: 'Calendar' }],
    audioKey: 'chat-schedule',
  },
  {
    keywords: ['invoice', 'bill', 'payment', 'charge'],
    text: "To create an invoice, go to the Job Details page and click the Invoices tab. You can generate an invoice from an existing estimate, or create one from scratch. Invoices can be sent directly to customers via email with a payment link.",
    chips: [{ label: 'View Invoices', icon: 'FileText' }],
    audioKey: 'chat-invoice',
  },
  {
    keywords: ['assign', 'technician', 'team', 'dispatch'],
    text: "To assign a technician, open the Job Details and click the assignment card on the right panel. You'll see your team's availability for that day. Select a technician and confirm — they'll get a push notification on the Zuper mobile app.",
    chips: [{ label: 'Assign Team', icon: 'UserPlus' }],
    audioKey: 'chat-assign',
  },
  {
    keywords: ['estimate', 'quote', 'price', 'cost'],
    text: "Estimates can be created from the Job Details page under the Estimates tab, or from the top navigation. Add line items with descriptions, quantities, and unit prices. You can apply discounts per line or on the total. Once approved, estimates convert directly to invoices.",
    chips: [{ label: 'Create Estimate', icon: 'FileText' }],
    audioKey: 'chat-estimate',
  },
  {
    keywords: ['customer', 'client', 'contact'],
    text: "You can manage customers from the Customers section in the sidebar. Each customer profile includes contact info, service history, job history, and any notes. When creating a new job, you can search existing customers or add new ones inline.",
    chips: [{ label: 'View Customers', icon: 'Users' }],
    audioKey: 'chat-customer',
  },
  {
    keywords: ['report', 'analytics', 'performance', 'metric'],
    text: "Zuper offers built-in reporting under the Reports section. You'll find dashboards for job completion rates, technician utilization, revenue by category, and customer satisfaction scores. Reports can be exported as PDF or CSV.",
    chips: [{ label: 'View Reports', icon: 'BarChart3' }],
    audioKey: 'chat-report',
  },
  {
    keywords: ['status', 'workflow', 'progress'],
    text: "Jobs follow this workflow: Draft → Scheduled → In Progress → Completed. You can customize status labels in Settings. Each status change is logged in the Activity tab, and you can set up automated notifications for status transitions.",
    chips: [{ label: 'View Workflow', icon: 'GitBranch' }],
    audioKey: 'chat-status',
  },
  {
    keywords: ['help', 'how', 'what can you', 'do'],
    text: "I'm Zuper Copilot — your AI assistant for field service management. I can help you navigate the app, explain features, guide you through workflows, answer questions about jobs, scheduling, invoicing, and more. Just ask me anything!",
    chips: [{ label: 'Show Features', icon: 'Sparkles' }],
    audioKey: 'chat-help',
  },
]

const chatFallback = {
  text: "That's a great question! In Zuper, you can manage everything from job creation to invoicing in one place. I can help you navigate any feature — try asking about scheduling, estimates, team assignments, or customer management.",
  chips: [{ label: 'Explore Features', icon: 'Compass' }],
  audioKey: 'chat-fallback',
}

export function getChatResponse(question) {
  const q = (question || '').toLowerCase()
  for (const entry of chatResponses) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return { text: entry.text, chips: entry.chips, audioKey: entry.audioKey }
    }
  }
  return chatFallback
}

export function getResponseForContext(contextKeys, screenName, userQuestion) {
  if (screenName === 'screenshot') {
    const q = (userQuestion || '').toLowerCase()
    if (q.includes('next') || q.includes('attention') || q.includes('priority') || q.includes('should')) {
      return mockResponses['screenshot-what-next']
    }
    return mockResponses['screenshot-what-next']
  }

  for (const key of contextKeys) {
    if (mockResponses[key]) {
      return mockResponses[key]
    }
  }
  return mockResponses.fallback
}
