import { motion } from 'framer-motion'
import {
  UserPlus, Pencil, BookOpen, Plus, Calendar, ExternalLink,
  Clock, CheckCircle, FileText, Phone, HelpCircle, ArrowRight,
} from 'lucide-react'

const iconMap = {
  UserPlus, Pencil, BookOpen, Plus, Calendar, ExternalLink,
  Clock, CheckCircle, FileText, Phone, HelpCircle,
}

export default function ActionChips({ chips = [] }) {
  if (!chips.length) return null

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {chips.map((chip, i) => {
        const Icon = iconMap[chip.icon] || HelpCircle
        return (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-zuper-beige-200 text-[12px] text-zuper-text-secondary font-medium hover:bg-zuper-beige-100 hover:border-zuper-sidebar-active hover:text-zuper-primary transition-all duration-150 cursor-pointer group"
          >
            <Icon className="w-3.5 h-3.5 text-zuper-muted group-hover:text-zuper-primary transition-colors" />
            {chip.label}
            <ArrowRight className="w-3 h-3 text-zuper-text-secondary/50 group-hover:text-zuper-primary group-hover:translate-x-0.5 transition-all duration-150" />
          </motion.button>
        )
      })}
    </div>
  )
}
