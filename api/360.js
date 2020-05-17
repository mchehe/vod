const express = require('express');
const app = express();
const $ = require('cheerio');
const request = require('request');
const fs = require('fs');
 
app.get('/api/360', function (req, res) {
	request({
	    url: 'https://www.360kan.com/dianying/list.php?year='+req.query.year+'&area='+req.query.area+'&act='+req.query.act+'&cat='+req.query.cat+'&pageno='+req.query.pageno,//请求路径
	    method: "GET",//请求方式，默认为get
	    headers: {//设置请求头
	        "content-type": "application/json",
	        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
	    },
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var data = [];
	    	$('.list li',body).each(function(i, e) {
	    		let info = {
	    			title: $('.s1',e).text(),
	    			url: $('.js-tongjic',e).attr('href'),
	    			img: $('img',e).attr('src'),
	    			star: $('.star',e).text(),
	    			hint: $('.hint',e).text(),
	    			point: $('.point',e).text()
	    		};
	    		data.push(info);
		    });
	    	res.json(data);
	    }
	}); 
   // res.json();
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})