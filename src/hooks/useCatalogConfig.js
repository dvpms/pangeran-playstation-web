'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllCatalogsWithTiers } from '@/services/catalog'

export function useCatalogConfig() {
  return useQuery({
    queryKey: ['catalog-config'],
    queryFn: getAllCatalogsWithTiers,
  })
}
