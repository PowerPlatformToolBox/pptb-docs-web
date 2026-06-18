'use server'

import { sendDiscordNotification } from '@/lib/discord'

interface ActionResult {
  success: boolean
  error?: string
}

export async function handleDiscordClick(
  discordHandle: string,
  capabilityTag: string,
): Promise<ActionResult> {
  try {
    if (!discordHandle.trim() || !capabilityTag.trim()) {
      return { success: false, error: 'Both fields are required.' }
    }

    await sendDiscordNotification({ discordHandle, capabilityTag })
    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    return { success: false, error: errorMessage }
  }
}
