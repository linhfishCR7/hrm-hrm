import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from './useQuery'

export function useSearch() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const query = useQuery()

  function onSearchChange(search) {
    if (search) {
      navigate(pathname + '?search=' + search)
    } else {
      navigate(pathname)
    }
  }

  return {
    search: query.search,
    onSearchChange,
  }
}
