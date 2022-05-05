import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)
Mock.mock(/api\/user\/add/,'post',userApi.createUser)
Mock.mock(/api\/user\/edit/,'post',userApi.updateUser)

Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/api\/user\/del/,'post',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)