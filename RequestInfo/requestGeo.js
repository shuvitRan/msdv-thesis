const fs = require ('fs');
const fetch = require('node-fetch');
const config = require('./config.js');
const utf8 = require('utf8')



let ak=config.config.BAIDU_KEY;
const baseURL = 'http://api.map.baidu.com/geocoding/v3/?city=深圳市&output=json&ret_coordtype=gcj02ll&ak=' ;

console.log(ak);

let hosGeoInfo = [];

let hospitalData = require ('../../ShenzhenDataOrg/szHospitalv1.json');

// let hopitals =


fetchLatLngData();
function fetchLatLngData(){
  // let i = 1;
  hospitalData.forEach((item, i) => {
    // console.log(item.HOSPITAL);
  setTimeout(function(){

    let urlAPI = utf8.encode(baseURL+ak+'&address='+item.ADDRESS);
    // let urlAPI = utf8.encode(baseURL+ak+'&address='+(hospitalData[i].HOSPITAL));
    // console.log(urlAPI);
    console.log(item.HOSPITAL)
    fetch(urlAPI)
    .then(data => {
    // console.log(data);
      return data.json()
    })
    .then(data => {
      console.log(data.result.location)
        addObject(data.result,hospitalData[i].HOSPITAL)

      }).then(data=>{
    // console.log(data);
      fs.writeFileSync('./hosGeo.json', JSON.stringify(hosGeoInfo), 'utf8')
    }).catch(error => { console.log(error); });




  }, i*100)
});


}



function addObject(objectData,name){
    var hosname = name;
    var location = objectData.location;
    var precise = objectData.precise;
    var confidence = objectData.confidence;
    var comprehension = objectData.comprehension;
    var level = objectData.level;

    hosGeoInfo.push({
      hosname : hosname,
      location: location,
      precise : precise,
      confidence : confidence,
      comprehension: comprehension,
      level: level

    });

}
