'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllBookings } from '@/services/booking'

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getAllBookings,
  })
}
