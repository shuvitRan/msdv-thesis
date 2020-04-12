var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
const utf8 = require('utf8');


let level;
let name = [];
let hosdata = [];

const hospitalCSV = fs.createWriteStream('data/szHospitals.csv');

hospitalCSV.write('name,level,address,ownership \n');




request('http://www.a-hospital.com/w/%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%8C%BB%E9%99%A2%E5%88%97%E8%A1%A8', function(error, response, html) {
  if (!error && response.statusCode == 200) {
    //**显示中文
    var $ = cheerio.load(html, {
      decodeEntities: false
    });

    $('#bodyContent').find('ul').eq(3).find('ul').each(function(i, elem) {

      let myObj = {};
      // console.log($(elem).parent().find('b').find('a').text());

      myObj["医院名称"] = $(elem).parent().find('b').find('a').text();
      $(elem).find('li').find('b').each(function(i, attr) {
        // console.log($(attr).text());

        let tagname = $(attr).text();
        let info = $(attr).parent().find('b').remove().end().text().replace(/：/g, '');
        // console.log(info);
        myObj[`${tagname}`] = `${info}`;
      });


      // console.log($(elem).find('li').length);
      // console.log(myObj);
      hosdata.push(myObj);

    });

    console.log(hosdata.length);
    fs.writeFileSync('data/ShenzhenHopitalOnlion.json', JSON.stringify(hosdata) );

  }



});
