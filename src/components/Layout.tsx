'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { EditLink } from '@/components/EditLink'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { SectionProvider, type Section } from '@/components/SectionProvider'
import { TableOfContents } from '@/components/TableOfContents'
import Image from 'next/image'

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  let pathname = usePathname()

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Image
                  src="/images/app-icon.svg"
                  alt="Power Platform Tool Box"
                  className="h-10"
                  width="40"
                  height="40"
                />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <div className="absolute top-18 right-2 mt-8 sm:right-2 lg:fixed lg:top-8 lg:right-8 lg:z-30">
            <EditLink />
          </div>
          <div className="flex flex-1">
            <main className="min-w-0 flex-auto">{children}</main>
            <TableOfContents />
          </div>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
