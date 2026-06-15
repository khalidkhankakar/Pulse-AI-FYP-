'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BrainCircuit,
  HeartPulse,
  Activity,
  Microscope,
  Terminal,
  Search,
  Bell,
  Settings,
  ShieldCheck,
  User,
  History,
  BarChart3,
  MonitorDot,
  LogOut,
  FileDown,
  ChevronRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: BrainCircuit, label: 'Diabetes Predictor' },
  { icon: HeartPulse, label: 'Cardiac Analytics' },
  { icon: Activity, label: 'Stroke Scoring' },
  { icon: History, label: 'Patient History' },
  { icon: Terminal, label: 'API Monitoring' },
]

const overviewCards = [
  {
    label: 'Predictions Made',
    value: '12,480',
    trend: '+12%',
    icon: Activity,
  },
  {
    label: 'Active ML Models',
    value: '4',
    trend: 'Stable',
    icon: BrainCircuit,
  },
  {
    label: 'Avg. Accuracy',
    value: '94.2%',
    trend: '+0.5%',
    icon: BarChart3,
  },
  {
    label: 'High Risk Alerts',
    value: '142',
    trend: '-3%',
    icon: ShieldCheck,
  },
]

const quickActions = [
  {
    name: 'Diabetes Risk',
    desc: 'Blood glucose analysis',
    icon: Microscope,
  },
  {
    name: 'Heart Disease',
    desc: 'Vascular pattern scoring',
    icon: HeartPulse,
  },
  {
    name: 'Stroke Scoring',
    desc: 'Neurological analysis',
    icon: Activity,
  },
]

const recentPatients = [
  {
    name: 'James Wilson',
    disease: 'Heart Disease',
    risk: 'High',
    date: 'Oct 24, 2026',
  },
  {
    name: 'Sarah Chen',
    disease: 'Diabetes',
    risk: 'Low',
    date: 'Oct 24, 2026',
  },
  {
    name: 'Robert Fox',
    disease: 'Stroke',
    risk: 'Medium',
    date: 'Oct 23, 2026',
  },
  {
    name: 'Elena Gilbert',
    disease: 'Breast Cancer',
    risk: 'Low',
    date: 'Oct 22, 2026',
  },
]

const DashboardSection = () => {
  const [predictionCount, setPredictionCount] = useState(12480)

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictionCount((prev) => prev + Math.floor(Math.random() * 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const displayCards = overviewCards.map((card, idx) =>
    idx === 0 ? { ...card, value: predictionCount.toLocaleString() } : card
  )

  return (
    <section
      id="dashboard"
      className="overflow-hidden bg-background py-20 md:py-24"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 space-y-5 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              inline-flex items-center gap-2
              rounded-full border border-primary/20
              bg-primary/10 px-4 py-2
              text-xs font-semibold uppercase
              tracking-widest text-primary
            "
          >
            <MonitorDot className="size-3" />
            System Control Center
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="
              text-balance text-4xl font-extrabold
              tracking-tight text-foreground
              md:text-5xl lg:text-6xl
            "
          >
            Clinical{' '}
            <span className="italic text-primary">
              Intelligence.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="
              mx-auto max-w-2xl
              text-sm text-muted-foreground
              md:text-base
            "
          >
            A production-ready SaaS dashboard designed for
            high-concurrency medical institutions.
          </motion.p>
        </div>

        {/* Dashboard */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            overflow-hidden rounded-3xl
            border border-border
            bg-card shadow-xl
          "
        >
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside
              className="
                hidden lg:flex lg:w-72 xl:w-80
                flex-col border-r border-border
                bg-muted/20 p-6
              "
            >
              {/* Logo */}
              <div className="mb-10 flex items-center gap-3">
                <div
                  className="
                    flex size-11 items-center justify-center
                    rounded-xl bg-primary
                    font-bold text-primary-foreground
                  "
                >
                  P
                </div>

                <div>
                  <div
                    className="
                      text-sm font-bold uppercase
                      tracking-tight
                    "
                  >
                    Pulse AI
                  </div>

                  <div
                    className="
                      text-xs uppercase
                      tracking-wide text-muted-foreground
                    "
                  >
                    Enterprise v4.2
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Main Menu
              </div>

              <nav className="flex-1 space-y-2">
                {sidebarItems.map((item, idx) => {
                  const Icon = item.icon

                  return (
                    <button
                      key={idx}
                      className={`
                        flex w-full items-center justify-between
                        rounded-xl px-4 py-3
                        text-sm font-medium
                        transition-all
                        ${
                          item.active
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4" />
                        {item.label}
                      </div>

                      {item.active && (
                        <ChevronRight className="size-4" />
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="mt-8 border-t border-border pt-6 space-y-2">
                <button
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm text-muted-foreground
                    transition-colors
                    hover:bg-accent
                  "
                >
                  <Settings className="size-4" />
                  Settings
                </button>

                <button
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm text-destructive
                    transition-colors
                    hover:bg-destructive/10
                  "
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="min-w-0 flex-1">
              {/* Topbar */}
              <header
                className="
                  flex h-20 items-center justify-between
                  border-b border-border
                  bg-background/70 px-4
                  backdrop-blur md:px-8
                "
              >
                {/* Search */}
                <div className="hidden w-full max-w-md sm:block">
                  <div className="relative">
                    <Search
                      className="
                        absolute left-4 top-1/2
                        size-4 -translate-y-1/2
                        text-muted-foreground
                      "
                    />

                    <input
                      disabled
                      placeholder="Search patient, model, or logs..."
                      className="
                        h-11 w-full rounded-xl
                        border border-border
                        bg-muted/40 pl-11 pr-4
                        text-sm outline-none
                        transition-all
                        focus:ring-2 focus:ring-ring
                      "
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-auto flex items-center gap-4">
                  <button
                    className="
                      relative flex size-10
                      items-center justify-center
                      rounded-xl border border-border
                      text-muted-foreground
                      transition-colors
                      hover:bg-accent
                    "
                  >
                    <Bell className="size-4" />

                    <span
                      className="
                        absolute right-2 top-2
                        size-2 rounded-full
                        bg-primary
                      "
                    />
                  </button>

                  <div className="flex items-center gap-3 border-l border-border pl-4">
                    <div className="hidden text-right md:block">
                      <div className="text-sm font-semibold">
                        Dr. Alexander
                      </div>

                      <div
                        className="
                          text-xs uppercase
                          tracking-wide text-muted-foreground
                        "
                      >
                        Chief Pathologist
                      </div>
                    </div>

                    <div
                      className="
                        flex size-10 items-center justify-center
                        rounded-xl border border-primary/20
                        bg-primary/10 text-primary
                      "
                    >
                      <User className="size-5" />
                    </div>
                  </div>
                </div>
              </header>

              {/* Content */}
              <div className="space-y-8 p-4 md:p-8">
                {/* Metrics */}
                <div
                  className="
                    grid grid-cols-1 gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                  "
                >
                  {displayCards.map((card, idx) => {
                    const Icon = card.icon

                    return (
                      <div
                        key={idx}
                        className="
                          rounded-2xl border border-border
                          bg-card p-6
                          transition-all
                          hover:border-primary/40
                        "
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <div
                            className="
                              flex size-11 items-center justify-center
                              rounded-xl bg-primary/10 text-primary
                            "
                          >
                            <Icon className="size-5" />
                          </div>

                          <span
                            className={`
                              rounded-md px-2 py-1
                              text-xs font-semibold
                              ${
                                card.trend.startsWith('+')
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-destructive/10 text-destructive'
                              }
                            `}
                          >
                            {card.trend}
                          </span>
                        </div>

                        <div
                          className="
                            mb-1 text-xs uppercase
                            tracking-wide text-muted-foreground
                          "
                        >
                          {card.label}
                        </div>

                        <div
                          className="
                            text-3xl font-bold
                            tracking-tight
                          "
                        >
                          {card.value}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Main Grid */}
                <div className="grid gap-8 lg:grid-cols-12">
                  {/* Left */}
                  <div className="space-y-8 lg:col-span-8">
                    {/* Analytics */}
                    <div
                      className="
                        relative overflow-hidden
                        rounded-3xl border border-border
                        bg-card p-6 md:p-8
                      "
                    >
                      <div className="mb-10 flex items-start justify-between">
                        <div>
                          <h4
                            className="
                              text-lg font-bold
                              tracking-tight
                            "
                          >
                            System Performance
                          </h4>

                          <p
                            className="
                              mt-1 text-xs uppercase
                              tracking-wide text-muted-foreground
                            "
                          >
                            Inference latency vs precision
                          </p>
                        </div>
                      </div>

                      <div className="h-64 md:h-80">
                        <svg
                          className="h-full w-full"
                          viewBox="0 0 1000 200"
                          preserveAspectRatio="none"
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                            d="M0 150 Q 100 80, 200 120 T 400 40 T 600 130 T 800 20 T 1000 80"
                            fill="none"
                            className="stroke-primary"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />

                          <path
                            d="M0 150 Q 100 80, 200 120 T 400 40 T 600 130 T 800 20 T 1000 80 V 200 H 0 Z"
                            className="fill-primary/10"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Table */}
                    <div
                      className="
                        overflow-hidden rounded-3xl
                        border border-border
                        bg-card
                      "
                    >
                      <div
                        className="
                          flex items-center justify-between
                          border-b border-border
                          p-6
                        "
                      >
                        <h4
                          className="
                            text-lg font-bold
                            tracking-tight
                          "
                        >
                          Patient Risk Queue
                        </h4>

                        <button
                          className="
                            flex items-center gap-2
                            text-xs font-semibold uppercase
                            tracking-wide text-primary
                          "
                        >
                          <FileDown className="size-4" />
                          Export Report
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              {[
                                'Patient Name',
                                'Condition',
                                'Risk Level',
                                'Inference Date',
                              ].map((head) => (
                                <th
                                  key={head}
                                  className="
                                    p-6 text-left text-xs
                                    font-semibold uppercase
                                    tracking-wide
                                    text-muted-foreground
                                  "
                                >
                                  {head}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-border">
                            {recentPatients.map((row, idx) => (
                              <tr
                                key={idx}
                                className="
                                  transition-colors
                                  hover:bg-accent/30
                                "
                              >
                                <td className="p-6">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="
                                        flex size-8 items-center
                                        justify-center rounded-lg
                                        bg-secondary text-xs
                                        font-bold uppercase
                                      "
                                    >
                                      {row.name.charAt(0)}
                                    </div>

                                    <span className="font-medium">
                                      {row.name}
                                    </span>
                                  </div>
                                </td>

                                <td className="p-6">
                                  <span
                                    className="
                                      rounded-full bg-muted
                                      px-3 py-1 text-xs
                                      font-medium
                                    "
                                  >
                                    {row.disease}
                                  </span>
                                </td>

                                <td className="p-6">
                                  <span
                                    className={`
                                      inline-flex items-center gap-2
                                      rounded-full px-3 py-1
                                      text-xs font-semibold
                                      ${
                                        row.risk === 'High'
                                          ? 'bg-destructive/10 text-destructive'
                                          : row.risk === 'Medium'
                                          ? 'bg-chart-4/10 text-chart-4'
                                          : 'bg-primary/10 text-primary'
                                      }
                                    `}
                                  >
                                    <span className="size-1.5 rounded-full bg-current" />
                                    {row.risk}
                                  </span>
                                </td>

                                <td
                                  className="
                                    p-6 text-muted-foreground
                                  "
                                >
                                  {row.date}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="space-y-8 lg:col-span-4">
                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <div
                        className="
                          px-1 text-xs font-semibold
                          uppercase tracking-widest
                          text-muted-foreground
                        "
                      >
                        Prediction Hubs
                      </div>

                      {quickActions.map((action, idx) => {
                        const Icon = action.icon

                        return (
                          <button
                            key={idx}
                            className="
                              flex w-full items-center justify-between
                              rounded-2xl border border-border
                              bg-card p-5 text-left
                              transition-all
                              hover:border-primary/40
                            "
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="
                                  flex size-11 items-center justify-center
                                  rounded-xl bg-accent text-primary
                                "
                              >
                                <Icon className="size-5" />
                              </div>

                              <div>
                                <div
                                  className="
                                    text-sm font-semibold
                                  "
                                >
                                  {action.name}
                                </div>

                                <div
                                  className="
                                    text-xs text-muted-foreground
                                  "
                                >
                                  {action.desc}
                                </div>
                              </div>
                            </div>

                            <ChevronRight
                              className="
                                size-4 text-muted-foreground
                              "
                            />
                          </button>
                        )
                      })}
                    </div>

                    {/* Metrics */}
                    <div
                      className="
                        rounded-3xl border border-border
                        bg-card p-6 md:p-8
                      "
                    >
                      <div
                        className="
                          mb-8 text-xs font-semibold
                          uppercase tracking-widest
                          text-muted-foreground
                        "
                      >
                        Accuracy Metrics
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            label: 'Diabetes v2',
                            value: 89,
                          },
                          {
                            label: 'Heart Engine',
                            value: 94,
                          },
                          {
                            label: 'Stroke Scorer',
                            value: 91,
                          },
                        ].map((metric, idx) => (
                          <div key={idx}>
                            <div
                              className="
                                mb-2 flex items-center
                                justify-between text-sm
                              "
                            >
                              <span className="font-medium">
                                {metric.label}
                              </span>

                              <span className="font-semibold text-primary">
                                {metric.value}%
                              </span>
                            </div>

                            <div
                              className="
                                h-2 overflow-hidden
                                rounded-full bg-secondary
                              "
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: `${metric.value}%`,
                                }}
                                transition={{ duration: 1 }}
                                className="h-full bg-primary"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DashboardSection