var fs require('fs')；
var cheerio = require('cheerio');
var request = require('request');


const hospitalCSV = fs.createWritesStream('data/szHospitals.csv');

hospitalCSV.write('name,level,address,ownership \n');




request('http://www.a-hospital.com/w/%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%8C%BB%E9%99%A2%E5%88%97%E8%A1%A8', function(error, response, html){
if(!error && response.statusCode == 200){
  var $ =  cheerio.load(html);


}



});
