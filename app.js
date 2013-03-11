var express = require('express');

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
	im.resize({
		srcPath: 'public/images/84.jpg',
		dstPath: 'public/images/84-small.png',
		format: 'png',
		width: 500
	}, function(err, stdout, stderr){
	  	if (err) throw err;
	  	res.send('<img src="/images/84-small.png">');
	});
})




