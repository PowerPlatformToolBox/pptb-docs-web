interface RequestDetails {
  discordHandle: string
  capabilityTag: string
}

interface DiscordEmbedField {
  name: string
  value: string
  inline?: boolean
}

interface DiscordEmbed {
  title: string
  description?: string
  color: number
  fields: DiscordEmbedField[]
  timestamp?: string
  footer?: {
    text: string
  }
}

export async function sendDiscordNotification({
  discordHandle,
  capabilityTag,
}: RequestDetails): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  const teamMemberRoleId = process.env.DISCORD_ROLE_ID

  if (!webhookUrl) {
    throw new Error('Server Error: Missing DISCORD_WEBHOOK_URL variable.')
  }

  const embedColorHex = '#3498db'
  const embedColorDecimal = parseInt(embedColorHex.replace('#', ''), 16)

  // If a role ID is configured, format it as a clickable ping: <@&ID>
  const mentionContent = teamMemberRoleId ? `<@&${teamMemberRoleId}>` : ''

  const payload = {
    content: mentionContent,
    embeds: [
      {
        title: '🛡️ New Capability Access Request',
        description: `A user has requested access to a capability. Review the details below and take appropriate action.`,
        color: embedColorDecimal,
        fields: [
          {
            name: '👤 User Handle',
            value: `@${discordHandle.replace(/@/g, '')}`,
            inline: true,
          },
          {
            name: '🏷️ Requested Tag',
            value: `\`${capabilityTag.toUpperCase()}\``,
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'PPTB Docs Website',
        },
      },
    ],
    allowed_mentions: {
      roles: teamMemberRoleId ? [teamMemberRoleId] : [],
    },
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Discord API responded with status ${response.status}`)
  }

  return true
}
