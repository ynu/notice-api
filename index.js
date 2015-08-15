var urllib = require('urllib');
var cheer = require('cheerio');
var absolution = require('absolution');


var Notice = function () {
	
};


/*
获取最新的通知公共文章
参数
	- count 可选，获取的最大数量
	- cb 回调函数
		- err
		- articles 获取到的文章列表，数组
			- url
			- title
			- date
*/
Notice.prototype.get = function () {
	var count = 10;
	if(arguments.length == 2) count = arguments[0];
	var cb = arguments[arguments.length - 1];

	// 1. 获取主页上的通知列表
	urllib.request('http://www.ynu.edu.cn/xwzx/xygg/index.html', function (err, data) {
		if(err) cb(err);
		else {
			var $ = cheer.load(absolution(data.toString(), 'http://www.ynu.edu.cn/xwzx/xygg/'));
            var articles = [];
            $('dl.right ul li').each(function(i, li){
                if(i >= count) return;
                var a = $(li).find('a');
                articles.push({
                    title: a.text().trim(),
                    url: a.attr('href')
                });
            });
            cb(null, articles);
		}
	});
}

module.exports = Notice;