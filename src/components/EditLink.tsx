'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function EditLink() {
  const pathname = usePathname()
  const editUrl = `https://github.com/PowerPlatformToolBox/pptb-docs-web/edit/main/src/app${pathname}/page.mdx`

  return (
    <Link
      href={editUrl}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      target="_blank"
      rel="noopener noreferrer"
      title="Edit this page on GitHub"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      <span>Edit</span>
    </Link>
  )
}
