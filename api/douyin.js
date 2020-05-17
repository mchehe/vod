const express = require('express');
const app = express();
const $ = require('cheerio');
const request = require('request');
const fs = require('fs');
 
app.get('/api/douyin/qsy', function (req, res) {
	request({
	    url: req.query.url,//请求路径
	    method: "GET",//请求方式，默认为get
	    headers: {//设置请求头
	        "content-type": "application/json",
	        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
	    },
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	let arr=[];
	    	// let reg = /playAddr: \"(.*?)\"/g
	    	var playaddr = /playAddr: \"(.*?)\"/g.exec(body)[1]
	    	res.send(playaddr)
	    }
	});
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})