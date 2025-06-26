import { useQuery } from '@tanstack/react-query'
import { accountService } from '../services/account'

export const useAccountList = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountService.getAll,
  })
}