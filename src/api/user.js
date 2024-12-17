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

/**
 * 根据id来获取用户的信息
 * @param {*} id 
 * @returns 
 */
export function getUserById(id) {
  return request({
    url: `/users/${id}`,
    method: 'GET'
  })
}