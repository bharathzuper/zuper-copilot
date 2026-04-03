import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { mockEstimateItems } from '../../data/mockJobs'

export default function EstimateCreate({ onBack }) {
  const [items] = useState(mockEstimateItems)

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.085
  const total = subtotal + tax

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-zuper-border bg-white px-6 py-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-zuper-text-secondary hover:text-zuper-text mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-xl font-semibold text-zuper-text">Create Estimate</h1>
        <p className="text-sm text-zuper-text-secondary mt-0.5">
          Build a detailed estimate for your customer
        </p>
      </div>

      <div className="p-6 max-w-4xl space-y-6">
        {/* Customer Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white rounded-card border border-zuper-border shadow-card p-5"
        >
          <h3 className="text-sm font-semibold text-zuper-text mb-3">Customer</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zuper-muted" />
            <input
              type="text"
              defaultValue="Blue Ridge HOA — Tom Brady"
              className="w-full pl-10 pr-4 py-2.5 border border-zuper-border rounded-input text-sm text-zuper-text focus:outline-none focus:ring-2 focus:ring-zuper-primary/20 focus:border-zuper-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Line Items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-card border border-zuper-border shadow-card p-5"
        >
          <h3 className="text-sm font-semibold text-zuper-text mb-4">Line Items</h3>
          <div
            data-copilot-context="estimate-line-items"
            className="border border-zuper-border rounded-lg overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-zuper-surface/60">
                  {['Description', 'Qty', 'Unit', 'Unit Price', 'Total', ''].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-[11px] font-semibold text-zuper-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-zuper-border">
                    <td className="px-4 py-3">
                      <input
                        defaultValue={item.description}
                        className="text-sm text-zuper-text bg-transparent w-full focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 w-20">
                      <input
                        defaultValue={item.quantity}
                        className="text-sm text-zuper-text bg-transparent w-full text-right tabular-nums focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 w-16">
                      <span className="text-sm text-zuper-muted">{item.unit}</span>
                    </td>
                    <td className="px-4 py-3 w-28">
                      <input
                        defaultValue={`$${item.unitPrice}`}
                        className="text-sm text-zuper-text bg-transparent w-full text-right tabular-nums focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 w-28">
                      <span className="text-sm font-medium text-zuper-text tabular-nums">
                        ${item.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-10">
                      <button className="text-zuper-muted hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-dashed border-zuper-border">
                  <td colSpan={6} className="px-4 py-3">
                    <button className="inline-flex items-center gap-1.5 text-sm text-zuper-primary font-medium hover:text-zuper-primary/80 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                      Add Line Item
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 ml-auto w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zuper-text-secondary">Subtotal</span>
              <span className="font-medium text-zuper-text tabular-nums">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zuper-text-secondary">Tax (8.5%)</span>
              <span className="text-zuper-text tabular-nums">
                ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="border-t border-zuper-border pt-2 flex justify-between text-sm">
              <span className="font-semibold text-zuper-text">Total</span>
              <span className="font-semibold text-zuper-text tabular-nums">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white rounded-card border border-zuper-border shadow-card p-5"
        >
          <h3 className="text-sm font-semibold text-zuper-text mb-3">Notes</h3>
          <textarea
            defaultValue="All materials include manufacturer warranty. Installation timeline estimated at 3-4 business days, weather permitting."
            className="w-full h-24 border border-zuper-border rounded-input p-3 text-sm text-zuper-text resize-none focus:outline-none focus:ring-2 focus:ring-zuper-primary/20 focus:border-zuper-primary transition-all"
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center justify-end gap-3 pb-6"
        >
          <button className="px-4 py-2 border border-zuper-border rounded-input text-sm font-medium text-zuper-text hover:bg-zuper-surface transition-colors">
            Save as Draft
          </button>
          <button className="px-4 py-2 bg-zuper-primary text-white rounded-input text-sm font-medium hover:bg-zuper-primary/90 transition-colors shadow-sm">
            Send to Customer
          </button>
        </motion.div>
      </div>
    </div>
  )
}
