'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // Find all h2, h3, h4 headings in the main content
    const main = document.querySelector('main')
    if (!main) return

    const headingElements = main.querySelectorAll('h2, h3, h4')
    const extractedHeadings: Heading[] = []

    headingElements.forEach((element) => {
      const level = parseInt(element.tagName[1])
      const id =
        element.id ||
        element.textContent?.toLowerCase().replace(/\s+/g, '-') ||
        ''

      if (id && element.textContent) {
        extractedHeadings.push({
          id,
          title: element.textContent,
          level,
        })

        // Set id on element if not already set
        if (!element.id) {
          element.id = id
        }
      }
    })

    setHeadings(extractedHeadings)
  }, [pathname])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="hidden xl:sticky xl:top-[3.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-3.5rem)] xl:flex-none xl:overflow-x-hidden xl:overflow-y-auto xl:py-16 xl:pr-6">
      <nav aria-labelledby="on-this-page-title" className="w-48">
        <h2
          id="on-this-page-title"
          className="text-sm font-semibold text-zinc-900 dark:text-white"
        >
          On this page
        </h2>
        <ul role="list" className="mt-4 space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <Link
                href={`#${heading.id}`}
                className={clsx(
                  'block py-1 break-words transition hover:text-zinc-900 dark:hover:text-white',
                  heading.level === 2
                    ? 'font-semibold text-zinc-900 dark:text-white'
                    : 'text-zinc-600 dark:text-zinc-400',
                )}
              >
                {heading.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
