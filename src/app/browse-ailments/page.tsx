"use client"
import { Suspense } from "react"
import { useEffect, useMemo, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentBrowser from "@/components/ailment-browser"
import mockAilmentsData from "@/data/mockAilmentsData"
import { mergeAndSortByName } from "@/lib/ailment-utils"
import type { AilmentApiResponse, AilmentRecord } from "@/types/ailment"

interface BrowserAilment {
  name: string
  description: string
  slug: string
  causes: string[]
  symptoms: string[]
  prevention: string[]
}

export default function BrowseAilmentsPage() {
  const staticAilments = useMemo<BrowserAilment[]>(
    () =>
      Object.values(mockAilmentsData).map((ailment) => ({
        name: ailment.name,
        description: ailment.description,
        slug: ailment.slug,
        causes: ailment.causes,
        symptoms: ailment.symptoms,
        prevention: ailment.prevention,
      })),
    []
  )

  const [mergedAilments, setMergedAilments] = useState<BrowserAilment[]>(() =>
    mergeAndSortByName<BrowserAilment>([], staticAilments)
  )

  useEffect(() => {
    const fetchDynamicAilments = async () => {
      try {
        const response = await fetch("/api/ailments", { cache: "no-store" })
        if (!response.ok) {
          setMergedAilments(mergeAndSortByName<BrowserAilment>([], staticAilments))
          return
        }

        const data = (await response.json()) as AilmentApiResponse
        const dynamicAilments: BrowserAilment[] = data.ailments.map((ailment: AilmentRecord) => ({
          name: ailment.name,
          description: ailment.description,
          slug: ailment.slug,
          causes: ailment.causes,
          symptoms: ailment.symptoms,
          prevention: ailment.prevention,
        }))

        setMergedAilments(mergeAndSortByName(staticAilments, dynamicAilments))
      } catch (error) {
        console.error("Failed to load dynamic ailments", error)
        setMergedAilments(mergeAndSortByName<BrowserAilment>([], staticAilments))
      }
    }

    void fetchDynamicAilments()
  }, [staticAilments])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <AilmentBrowser dynamicAilments={mergedAilments} />
      </Suspense>
      <Footer />
    </main>
  )
}
