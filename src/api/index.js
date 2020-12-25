import request from '@/utils/request'

export function insert (data) {
  return request({
    url: 'zsqy/schedulerecord/insert',
    method: 'post',
    data: data
  })
}
export function fetchList (query) {
  return request({
    url: 'zsqy/schedulerecord/findByPage',
    method: 'get',
    params: query
  })
}
