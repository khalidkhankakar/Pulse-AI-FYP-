"use server"

import { db } from "@/utils"
import { predictionHistory } from "@/utils/schema"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { eq, desc } from "drizzle-orm"

export async function savePredictionHistory(data: {
  diseaseType: string
  inputs: Record<string, string | number | boolean>
  prediction: string
  predictionLabel: string
  probability?: number
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const result = await db.insert(predictionHistory).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    diseaseType: data.diseaseType,
    inputs: data.inputs,
    prediction: data.prediction,
    predictionLabel: data.predictionLabel,
    probability: data.probability,
  }).returning()

  return result[0]
}

export async function getPredictionHistory() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const history = await db.query.predictionHistory.findMany({
    where: eq(predictionHistory.userId, session.user.id),
    orderBy: [desc(predictionHistory.createdAt)],
  })

  return history
}
