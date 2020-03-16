let earthquakes, wgs;


function loadImageErrorOverride(errEvt) {
    const pic = errEvt.target;
    if (!pic.crossOrigin)  {
    	return p.print(`Failed to reload ${pic.src}!`);
    }
    p.print(`Attempting to reload ${pic.src} as a tainted image now...`);
    pic.crossOrigin = null;
    pic.src = pic.src;
}

function preload() {
  // 取得日期段內的強度大於3的地震
  let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
    'format=geojson&starttime=2019-01-01&endtime=2019-03-02&minmagnitude=3';

  httpGet(url, 'jsonp', false, function(response) {
    earthquakes = response; // 會把所有回呼資料存於 earthquakes
  });
 
}
//定義大小
function setup(){
	createCanvas(1200,600);


	  // wgs = loadImage('./assets/wgs84.png');
	  // 本地端使用時 會有 CORS 的問題
	  // 此處的檔案需要 轉換為 https格式 
	  // 故上傳至 google後
	  // https://drive.google.com/file/d/1AU90wDF8oEJTaCZztdq75d-v7hO6QAKz/view?usp=sharing
	  // 改變 id 可
	  // https://drive.google.com/uc?export=view&id=1AU90wDF8oEJTaCZztdq75d-v7hO6QAKz
	 wgs = loadImage('./assets/wgs84.png',
  			pic => { 
  				p.print(wgs = pic);
  				p.redraw(); }
  			, loadImageErrorOverride);
}

function draw() {
  if (!earthquakes) {
    // Wait until the earthquake data has loaded before drawing.
    return;
  }
    image(wgs, 0, 0);

  	earthquakes.features.forEach((val)=>{
  		let longitude = map(val.geometry.coordinates[0],-180.0,180.0,0.0,width); // 經度 -180 180之間
  		let latitude = map(val.geometry.coordinates[1],90.0,-90.0,0.0,height); // 緯度 -90 90之間
  		let mag = map(val.properties.mag,3,9.0,5,60); // 緯度 -90 90之間

  		let place = val.properties.place;

  		ellipseMode(CENTER);
  		fill(180,50,50,30)
  		ellipse(longitude, latitude, mag, mag);
  		
  		textAlign(CENTER);
  		fill(0);
  		textSize(7); 
  		text(place, longitude, latitude);
  	});
}