/**
 * Created by liqiankun on 2017/11/21.
 */
const utility = require('utility')

//注册密码加密
function md5Pwd(pwd) {
	const salt = 'MyPassWordIsEveryImportent#Uikjk#@ijd90$uy!-uo';
	return utility.md5(utility.md5(pwd+salt));
}

module.exports = md5Pwd;