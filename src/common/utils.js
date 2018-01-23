/**
 * Created by liqiankun on 2017/11/21.
 */

export function getRedirectPath({category,avatar}) {
	// 根据用户信息 返回跳转地址

	//根据用户的类型 user.category  来跳转到  /boss /genius
	//根据有无用户头像 user.avatar  来跳转到  /bossinfo   /geniusinfo

	let url = (category === 'BOSS') ? '/boss' : '/genius';
	if(!avatar){
		url += 'info';
	}
	return url;
}

export function getChatId(userId,targetId) {
	console.log('userId,targetId>',userId,targetId);
	return [userId,targetId].sort().join('_');
}