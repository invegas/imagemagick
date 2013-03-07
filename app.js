var express = require('express');
var app = express();
app.listen(process.env.PORT || 8000);

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

var im = require('imagemagick');

// im.readMetadata('/images/84.jpg', function(err, metadata){
//   if (err) throw err;
//   console.log('Shot at '+metadata.exif.dateTimeOriginal);
// })

im.identify('/public/images/84.jpg', function(err, features){
  if (err) throw err;
  console.log(features);
  // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
});


