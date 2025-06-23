import { useQuery } from '@tanstack/react-query'
import { attributeService } from '../services/attribute'

export const useList = () => {
  return useQuery({
    queryKey: ['attributes'],
    queryFn: attributeService.getAll,
  })
}