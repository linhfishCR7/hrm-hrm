import { useQuery } from './useQuery'

export function usePagination(defaultValue = { page: 1, pageSize: 10 }) {
  const query = useQuery()
  return {
    page: query.page || defaultValue.page,
    pageSize: query.limit || defaultValue.pageSize,
  }
}
