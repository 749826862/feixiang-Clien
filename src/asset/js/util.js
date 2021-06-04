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

/**
 * 获取第一个表格的可视化高度
 * @param {*} extraHeight 额外的高度(表格底部的内容高度 Number类型,默认为74) 
 * @param {*} id 当前页面中有多个table时需要制定table的id
 */
 export function getTableScroll(extraHeight, id) {
	if (typeof extraHeight == "undefined") {
	  //  默认底部分页64 + 边距10
	  extraHeight = 90
	}
	let tHeader = null
	if (id) {
	  tHeader = document.getElementById(id) ? document.getElementById(id).getElementsByClassName("ant-table-thead")[0] : null
	} else {
	  tHeader = document.getElementsByClassName("ant-table-thead")[0]
	}
	//表格内容距离顶部的距离
	let tHeaderBottom = 0
	if (tHeader) {
	  tHeaderBottom = tHeader.getBoundingClientRect().bottom
	//   console.log(tHeader.getBoundingClientRect(), 888)
	}

	// 判断是否显示滚动条 ant-table-body
	let tablebody = document.getElementsByClassName("ant-table-body")[0]

	let height = null
	if(tablebody.scrollHeight !== tablebody.offsetHeight){
		height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
	}
	//窗体高度-表格内容顶部的高度-表格内容底部的高度
	// let height = document.body.clientHeight - tHeaderBottom - extraHeight
	// let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
	return height
  }


//  返回上一页

