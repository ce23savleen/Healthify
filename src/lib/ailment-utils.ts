export function normalizeAilmentName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ")
}

export function slugifyAilmentName(name: string): string {
  return normalizeAilmentName(name).replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
}

export function sanitizeStringArray(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
    )
  )
}

export function mergeAndSortByName<T extends { name: string }>(base: T[], incoming: T[]): T[] {
  const merged = new Map<string, T>()

  for (const item of base) {
    merged.set(normalizeAilmentName(item.name), item)
  }

  for (const item of incoming) {
    const key = normalizeAilmentName(item.name)
    const existing = merged.get(key)
    merged.set(key, existing ? { ...existing, ...item } : item)
  }

  return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name))
}
