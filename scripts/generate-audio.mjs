import { KokoroTTS } from 'kokoro-js'
import { writeFileSync } from 'fs'
import { join } from 'path'

const VOICE = 'af_heart'
const OUT_DIR = join(import.meta.dirname, '..', 'public', 'audio')

const allTexts = {
  'unassigned-badge': "I can see Job 1043 for Blue Ridge HOA is currently unassigned. To assign a technician, click the assignment card on the right and select from your available field team. I can see Mike Torres and Sarah Kim are already scheduled this week — you may want to check their availability first.",
  'draft-status': "This job is still in Draft status, which means it hasn't been confirmed or scheduled yet. To move it forward, click the Edit button to complete any missing details, then change the status to Scheduled or Pending Approval depending on your workflow.",
  'create-job-button': "The Create Job button starts a new job. You'll need a customer, job category, and at minimum a description to save it as a draft. Want me to walk you through each step?",
  'estimate-line-items': "I can see you have 3 line items totaling $14,400. To add more items, click the + Add Line Item row at the bottom. You can also apply a discount at the line item level or to the total using the discount field below.",
  'empty-schedule': "This job doesn't have a scheduled date yet. Click Schedule in the top action bar to open the scheduling panel where you can pick a date, time window, and assign your technician in one step.",
  'screenshot-what-next': "Looking at your screen, you're on the Jobs List and I can see Job 1043 for Blue Ridge HOA is in Draft and unassigned — that looks like it needs attention before the week starts. I'd recommend opening that job and completing the assignment and scheduling. Want me to take you there?",
  'in-progress-status': "This job is currently In Progress, meaning a technician has been assigned and work has started on site. You can track progress through the Work Orders tab, or check the Activity tab for recent updates from the field team.",
  'scheduled-status': "This job is Scheduled and ready to go. The assigned technician will receive a notification before the scheduled date. You can view the schedule in the Calendar view or modify the time window if needed.",
  'pending-status': "This job is Pending Approval — it's been created and filled out but needs management sign-off before it can be scheduled. Review the job details and either Approve to move it to Scheduled, or send it back for revisions.",
  'job-amount': "This shows the estimated job value. The amount is calculated from the associated estimate line items. To update it, edit the linked estimate or create a new one from the Estimates tab in the job detail view.",
  'customer-card': "Here's the customer information for this job. You can click the phone number to call directly, or the email to send a message. The address links to Google Maps for easy navigation to the job site.",
  'assignment-card': "The assignment card shows which technician is responsible for this job. You can reassign by clicking the card and selecting a different team member. Check the Schedule view to see everyone's availability before making changes.",
  'fallback': "I can see your screen. What would you like help with? You can circle any part of the screen and ask me about it, or just tell me what you're trying to do.",

  'chat-create-job': "To create a new job, click the '+ New' button in the top right of the Jobs List. You'll need to fill in the customer name, job category, and a description at minimum. Once saved, it starts as a Draft — you can then schedule and assign it.",
  'chat-schedule': "You can schedule jobs from the Job Details page — click the Schedule button in the top action bar. Pick a date, time window, and assign a technician all in one step. You can also drag and drop jobs in the Calendar view for quick rescheduling.",
  'chat-invoice': "To create an invoice, go to the Job Details page and click the Invoices tab. You can generate an invoice from an existing estimate, or create one from scratch. Invoices can be sent directly to customers via email with a payment link.",
  'chat-assign': "To assign a technician, open the Job Details and click the assignment card on the right panel. You'll see your team's availability for that day. Select a technician and confirm — they'll get a push notification on the Zuper mobile app.",
  'chat-estimate': "Estimates can be created from the Job Details page under the Estimates tab, or from the top navigation. Add line items with descriptions, quantities, and unit prices. You can apply discounts per line or on the total. Once approved, estimates convert directly to invoices.",
  'chat-customer': "You can manage customers from the Customers section in the sidebar. Each customer profile includes contact info, service history, job history, and any notes. When creating a new job, you can search existing customers or add new ones inline.",
  'chat-report': "Zuper offers built-in reporting under the Reports section. You'll find dashboards for job completion rates, technician utilization, revenue by category, and customer satisfaction scores. Reports can be exported as PDF or CSV.",
  'chat-status': "Jobs follow this workflow: Draft, then Scheduled, then In Progress, then Completed. You can customize status labels in Settings. Each status change is logged in the Activity tab, and you can set up automated notifications for status transitions.",
  'chat-help': "I'm Zuper Copilot — your AI assistant for field service management. I can help you navigate the app, explain features, guide you through workflows, answer questions about jobs, scheduling, invoicing, and more. Just ask me anything!",
  'chat-fallback': "That's a great question! In Zuper, you can manage everything from job creation to invoicing in one place. I can help you navigate any feature — try asking about scheduling, estimates, team assignments, or customer management.",
}

async function main() {
  console.log('Loading Kokoro TTS model...')
  const tts = await KokoroTTS.from_pretrained(
    'onnx-community/Kokoro-82M-v1.0-ONNX',
    { dtype: 'q8', device: 'cpu' }
  )
  console.log('Model loaded. Generating audio files...\n')

  const keys = Object.keys(allTexts)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const text = allTexts[key]
    const outPath = join(OUT_DIR, `${key}.wav`)

    console.log(`[${i + 1}/${keys.length}] ${key}`)
    const audio = await tts.generate(text, { voice: VOICE })
    audio.save(outPath)
    console.log(`  → saved ${outPath}`)
  }

  console.log(`\nDone! Generated ${keys.length} audio files in ${OUT_DIR}`)
}

main().catch(console.error)
