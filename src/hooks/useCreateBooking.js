'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export function useCreateBooking() {
  const qc = useQueryClient()

  return useMutation(
    async (payload) => {
      const { data } = await api.post('/bookings', payload)
      return data
    },
    {
      onSuccess: () => {
        // Invalidate inventory/bookings queries so UI re-fetches
        qc.invalidateQueries(['inventory'])
        qc.invalidateQueries(['bookings'])
      },
    }
  )
}
