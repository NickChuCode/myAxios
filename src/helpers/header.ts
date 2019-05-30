import { deepMerge } from './util'
import { Method } from '../types'

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ]

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
