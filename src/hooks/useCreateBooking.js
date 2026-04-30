'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useCreateBooking() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/bookings', payload)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory'] })
      qc.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}
