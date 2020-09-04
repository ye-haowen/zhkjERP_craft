import http from './http.js'
const baseUrl = '/api'
// 登录
export const login = (params) => http.post(`${baseUrl}/auth/login`, params, 'application/json')
// 注销
export const logout = (params) => http.post(`${baseUrl}/auth/logout`, params, 'application/json')
// token
export const getToken = (params) => http.get(`${baseUrl}/upload/token`, params)
// 删除上传文件
export const deleteFile = (params) => http.post(`${baseUrl}/file/delete`, params, 'application/json')
// 潘通色号
export const pantongList = (params) => http.get(`${baseUrl}/pan/color/list`, params)
// 穿综法
export const pattern = {
  create: (params) => http.post(`${baseUrl}/craft/pattern/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/craft/pattern/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/craft/pattern/one`, params),
  list: (params) => http.get(`${baseUrl}/craft/pattern/list`, params)
}
// 纱线
export const yarn = {
  create: (params) => http.post(`${baseUrl}/yarn/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/yarn/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/yarn/one`, params),
  list: (params) => http.get(`${baseUrl}/yarn/list`, params)
}
// 纱线颜色
export const yarnColor = {
  create: (params) => http.post(`${baseUrl}/yarn/color/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/yarn/color/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/yarn/color/one`, params),
  list: (params) => http.get(`${baseUrl}/yarn/color/list`, params)
}
// 工艺单
export const craft = {
  create: (params) => http.post(`${baseUrl}/craft/save`, params, 'application/json'),
  delete: (params) => http.post(`${baseUrl}/craft/delete`, params, 'application/json'),
  detail: (params) => http.get(`${baseUrl}/craft/one`, params),
  list: (params) => http.get(`${baseUrl}/craft/list`, params),
  uploadImg: (params) => http.post(`${baseUrl}/craft/image/save`, params, 'application/json')
}
// 修改账户密码
export const changeUserPasd = (params) => http.post(`${baseUrl}/user/edit/pass`, params, 'application/json')
// 获取用户信息
export const getAuthorization = {
  get: (params) => http.post(`${baseUrl}/auth/user`, params, 'application/json')
}
