import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useMemo } from 'react'

export function useQuery() {
  const { search } = useLocation()
  const query = useMemo(() => queryString.parse(search), [search])
  return query
}
