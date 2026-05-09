'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Database,
  Cpu,
  Activity,
  ShieldCheck,
  HeartPulse,
  Microscope,
} from 'lucide-react'

enum DiseaseType {
  DIABETES = 'DIABETES',
  HEART_DISEASE = 'HEART_DISEASE',
  STROKE = 'STROKE',
  LIVER = 'LIVER',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const modelsData = [
  {
    type: DiseaseType.DIABETES,
    name: 'Diabetes Analysis',
    acc: '89.4%',
    algo: 'Random Forest',
    dataset: '768 Clinical Patients',
    image: '/disease/diabetes.jpg',
    icon: Brain,
    tagline: 'Predictive Glucose Mapping',
  },
  {
    type: DiseaseType.HEART_DISEASE,
    name: 'Cardiac Risk',
    acc: '94.2%',
    algo: 'XGBoost Engine',
    dataset: '1,025 Heart Patients',
    image: '/disease/heart.jpg',
    icon: HeartPulse,
    tagline: 'Vascular Pattern Recognition',
  },
  {
    type: DiseaseType.STROKE,
    name: 'Stroke Prediction',
    acc: '91.8%',
    algo: 'Logistic Regression',
    dataset: '5,110 Medical Records',
    image: '/disease/stroke.jpg',
    icon: Activity,
    tagline: 'Neurological Risk Scoring',
  },
  {
    type: DiseaseType.LIVER,
    name: 'Liver Detection',
    acc: '96.5%',
    algo: 'SVM Classifier',
    dataset: '569 Biopsy Records',
    image: '/disease/liver.jpg',
    icon: Microscope,
    tagline: 'Cellular Morphology Analysis',
  },
]

export const DiseaseModelsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeModel = modelsData[activeIndex]
  const ActiveIcon = activeModel.icon

  return (
    <section className="overflow-hidden bg-background py-20 md:py-24">
      <div
        className="
          container mx-auto max-w-7xl
          px-4 sm:px-6
        "
      >
        <div
          className="
            grid gap-12 lg:grid-cols-2
            lg:gap-16 xl:gap-20
            items-center
          "
        >
          {/* Visual Section */}
          <div className="relative">
            <div
              className="
                relative overflow-hidden
                rounded-3xl border border-border
                bg-card shadow-xl
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.02,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="relative"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] md:aspect-[5/6]">
                    <img
                      src={activeModel.image}
                      alt={activeModel.name}
                      className="
                        h-full w-full object-cover
                        transition-transform duration-1000
                        hover:scale-105
                      "
                    />

                    {/* Overlay */}
                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-background/90
                        via-background/10
                        to-transparent
                      "
                    />
                  </div>

                  {/* Info Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="
                      absolute bottom-4 left-4 right-4
                      rounded-2xl border border-border
                      bg-card/90 p-5 backdrop-blur-md
                      md:bottom-6 md:left-6 md:right-6
                      md:p-6
                    "
                  >
                    {/* Top */}
                    <div
                      className="
                        mb-6 flex items-start
                        justify-between gap-4
                      "
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="
                            flex size-12 items-center
                            justify-center rounded-xl
                            border border-primary/20
                            bg-primary/10 text-primary
                          "
                        >
                          <ActiveIcon className="size-6" />
                        </div>

                        <div>
                          <h3
                            className="
                              text-lg font-bold
                              tracking-tight
                              md:text-xl
                            "
                          >
                            {activeModel.name}
                          </h3>

                          <div
                            className="
                              mt-2 flex items-center gap-2
                              text-xs uppercase
                              tracking-wide text-primary
                            "
                          >
                            <span
                              className="
                                size-2 rounded-full
                                bg-primary animate-pulse
                              "
                            />

                            {activeModel.tagline}
                          </div>
                        </div>
                      </div>

                      <ShieldCheck
                        className="
                          hidden size-5
                          text-muted-foreground/40
                          sm:block
                        "
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {/* Accuracy */}
                      <div
                        className="
                          rounded-xl border border-border
                          bg-muted/40 p-4
                        "
                      >
                        <div
                          className="
                            mb-1 text-xs uppercase
                            tracking-wide text-muted-foreground
                          "
                        >
                          Accuracy
                        </div>

                        <div
                          className="
                            text-2xl font-bold
                            tracking-tight text-primary
                          "
                        >
                          {activeModel.acc}
                        </div>
                      </div>

                      {/* Algorithm */}
                      <div
                        className="
                          rounded-xl border border-border
                          bg-muted/40 p-4
                        "
                      >
                        <div
                          className="
                            mb-1 text-xs uppercase
                            tracking-wide text-muted-foreground
                          "
                        >
                          Algorithm
                        </div>

                        <div
                          className="
                            text-sm font-semibold
                            text-foreground
                          "
                        >
                          {activeModel.algo}
                        </div>
                      </div>

                      {/* Dataset */}
                      <div
                        className="
                          flex items-center justify-between
                          rounded-xl border border-border
                          bg-muted/40 p-4
                          sm:col-span-2
                        "
                      >
                        <div>
                          <div
                            className="
                              mb-1 text-xs uppercase
                              tracking-wide text-muted-foreground
                            "
                          >
                            Dataset Size
                          </div>

                          <div
                            className="
                              text-sm font-medium
                              text-foreground
                            "
                          >
                            {activeModel.dataset}
                          </div>
                        </div>

                        <Database
                          className="
                            size-5 text-primary/40
                          "
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Heading */}
            <div className="space-y-6">
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
                <Cpu className="size-3" />
                Real-time Inference Grid
              </motion.div>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="
                  text-4xl font-extrabold
                  leading-none tracking-tight
                  text-foreground
                  md:text-5xl lg:text-6xl
                "
              >
                Machine Learning{' '}
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
                  max-w-xl text-base
                  leading-relaxed text-muted-foreground
                "
              >
                Switch between our specialized medical
                neural networks. Each model is trained
                on distinct clinical features to provide
                accurate risk assessments for critical
                medical conditions.
              </motion.p>
            </div>

            {/* Model Navigation */}
            <div className="grid gap-4 sm:grid-cols-2">
              {modelsData.map((model, idx) => {
                const Icon = model.icon
                const isActive = activeIndex === idx

                return (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    whileHover={{
                      scale: 1.01,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.99,
                    }}
                    className={`
                      relative overflow-hidden
                      rounded-2xl border p-5
                      text-left transition-all
                      ${
                        isActive
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-primary/40'
                      }
                    `}
                  >
                    {/* Active Background */}
                    {isActive && (
                      <motion.div
                        layoutId="active-model"
                        className="
                          absolute inset-0
                          bg-primary/5
                        "
                      />
                    )}

                    <div className="relative z-10">
                      {/* Top */}
                      <div
                        className="
                          mb-4 flex items-start
                          justify-between gap-4
                        "
                      >
                        <div
                          className="
                            flex size-11 items-center
                            justify-center rounded-xl
                            bg-primary/10 text-primary
                          "
                        >
                          <Icon className="size-5" />
                        </div>

                        <span
                          className={`
                            text-sm font-semibold
                            ${
                              isActive
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }
                          `}
                        >
                          {model.acc}
                        </span>
                      </div>

                      {/* Content */}
                      <div
                        className={`
                          mb-1 text-lg font-bold
                          tracking-tight transition-colors
                          ${
                            isActive
                              ? 'text-primary'
                              : 'text-foreground'
                          }
                        `}
                      >
                        {model.name}
                      </div>

                      <div
                        className="
                          text-xs uppercase
                          tracking-wide text-muted-foreground
                        "
                      >
                        {model.algo}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}