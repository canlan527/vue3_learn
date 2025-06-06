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

/**
 * 添加用户
 * @param {*} data 
 * @returns 
 */
export function addUser(data) {
  return request({
    url: '/users',
    method: 'POST',
    data,
  })
}

/**
 * 修改用户
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
export function editUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'PATCH',
    data,
  })
}

/**
 * 删除用户
 * @param {*} id 
 * @returns 
 */
export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'DELETE'
  })
}