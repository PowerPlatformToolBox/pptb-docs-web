'use client'

import { handleDiscordClick } from '@/app/actions'
import React, { useState, useTransition } from 'react'

export default function DiscordRequestForm() {
  const [discordHandle, setDiscordHandle] = useState('')
  const [capabilityTag, setCapabilityTag] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const result = await handleDiscordClick(discordHandle, capabilityTag)
      if (result.success) {
        alert('Your request has been sent to the administrators!')
        setDiscordHandle('')
        setCapabilityTag('')
      } else {
        alert(`Failed to send: ${result.error}`)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '350px',
      }}
    >
      <div>
        <label
          style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}
        >
          Discord Handle
        </label>
        <input
          type="text"
          placeholder="e.g., username"
          value={discordHandle}
          onChange={(e) => setDiscordHandle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div>
        <label
          style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}
        >
          Capability Tag
        </label>
        <input
          type="text"
          placeholder="e.g., ADMIN-ACCESS"
          value={capabilityTag}
          onChange={(e) => setCapabilityTag(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          padding: '10px',
          backgroundColor: '#5865F2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
        }}
      >
        {isPending ? 'Submitting Request...' : 'Submit Capability Request'}
      </button>
    </form>
  )
}
