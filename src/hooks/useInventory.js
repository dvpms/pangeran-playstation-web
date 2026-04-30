'use client'

import { useQuery } from '@tanstack/react-query'
import { getInventory } from '@/services/inventory'

export function useInventory() {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory,
  })
}
