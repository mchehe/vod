const express = require('express');
const app = express();
const $ = require('cheerio');
const request = require('request');
const fs = require('fs');

// 跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
app.get('/api/search', function (req, res) {
	request({
	    url: encodeURI('https://www.xvideos.com/?k='+req.query.k+'&p='+req.query.p),//请求路径
	    method: "GET",//请求方式，默认为get
	    headers: {//设置请求头
	        "content-type": "application/json",
	        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
	    },
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var data = [];
	    	$('.mozaique .thumb-block',body).each(function(i, e) {
	    		let info = {
	    			title: $('.title a',e).attr('title'),
	    			url: decodeURI($('.title a',e).attr('href')),
	    			img: $('img',e).attr('data-src'),
	    			hd: $('.video-hd-mark',e).text(),
	    			time: $('.duration',e).text()
	    		};
	    		data.push(info);
		    });
	    	res.json(data);
	    }
	});
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})