/** 后台API地址配置 */
const dev = (process.env.NODE_ENV === 'development')
const contextPath = dev ? '/static' : './static'
const apiUrl = `${contextPath}/api`
const getFileUrl = function (staticFile) {
  let url = `${contextPath}/api/staticfile/play?`
  if (staticFile.id) url = `${url}id=${staticFile.id}`
  else if (staticFile.hash) url = `${url}hash=${staticFile.hash}`
  return url
}
const config = {contextPath, apiUrl, getFileUrl}
export default config
