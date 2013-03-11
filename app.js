var express = require('express')
	, easyimg = require('easyimage');

var app = express();
app.listen(process.env.PORT || 8000);

app.configure(function(){
	app.use(express.bodyParser());
  	app.use(express.static(__dirname + '/public'));
});

var im = require('imagemagick');

app.get('/', function (req, res) {
	im.identify('public/images/84.jpg', function(err, features){
		if (err) throw err;
		res.send(features);
		
	});
})

app.get('/resize', function (req, res) {
	var format = "gif"; 
	im.resize({
		srcPath: 'public/images/84.jpg',
		dstPath: 'public/images/84-small.' + format,
		quality: 1,
  		gravity: "North",
		format: format,
		width: 800
	}, function(err, stdout, stderr){
	  	if (err) throw err;
	  	res.send('<img src="/images/84-small.' + format +'">');
	});
})

app.get('/crop', function (req, res) {
	var format = "png";
	easyimg.crop({
		src: 'public/images/84.jpg', 
		dst: 'public/images/84-crop.' + format,
		cropwidth: 100, 
		cropheight: 100,
		x: 10,
		y: 10,		
		quality: 100
	}, function (err, image) {
		res.send('<img src="/images/84-crop.' + format + '">');
	})
})




