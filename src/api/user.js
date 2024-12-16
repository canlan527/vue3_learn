import request from "./request";

/**
 * 获取用户列表
 */
export function getUserList() {
  return request({
    url: '/users',
    method: 'GET'
  })
}