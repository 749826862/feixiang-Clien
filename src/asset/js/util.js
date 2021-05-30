/**
 * 工具函数库
 * 
 */

// cookie 操作
export const setCookie = (key, value, iDay) => {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = key + '=' + value + ';expires=' + oDate;

}

export const removeCookie = (key) =>  {
	setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
}

export const getCookie = (key) => {
	var cookieArr = document.cookie.split('; ');
	for(var i = 0; i < cookieArr.length; i++) {
		var arr = cookieArr[i].split('=');
		if(arr[0] === key) {
			return JSON.parse(arr[1]);
		}
	}
	return false;
}

export const clearAllCookie = () => {
	var keys = document.cookie.match(/[^ =;]+(?==)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			removeCookie(keys[i])
	}
}


//  返回上一页

