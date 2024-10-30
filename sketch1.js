let classifier;
let video;
let label = "world";
let speech
let cnv
let conf =0;
let bard;
let cbard;

const wordMap = {
  "steel": "钢铁",
  "bone": "骨头",
  "art worker": "艺术工人",
  "cabbage": "卷心菜",
  "rock": "石头",
  "corn": "玉米",
  "pig": "猪",
  "wood": "木头",
  "monkey": "猩猩",
  "world": "世界"
};


function preload() {
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/ikAnilCd2/"
  );
}

function gotResults(results) {
  //console.log(results);
  label = results[0].label;
  conf = results[0].confidence;
}

function setup() {
  createCanvas(640, 480);

  cnv = createCanvas(640, 480); //(gridSize * cellSize + 10, gridSize * cellSize + 10);
    //let cx = windowWidth / 2 - cnv.width / 2;
    //let cy = windowHeight / 2 - cnv.width / 2;
    //cnv.position(cx, cy);
    cnv.parent("canvas-container")
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  classifier.classifyStart(video, gotResults);
  // Initialize speech synthesis
  bard = new p5.Speech(); // speech synthesis object
  cbard = new p5.Speech();
  cbard.setLang("zh-CN");
  //bard.listVoices()
  bard.onLoad = loaded;

  cbard.onLoad = loaded;
  
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  rectMode(CENTER);
  fill(0);
  rect(width / 2, height - 50, width, 50);
  textSize(32);
  fill(255,255,0);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label+" "+wordMap[label], width / 2, height - 50);
  text("confidence: " + nf(conf, 0, 2), 200, height - 12)
  if (conf>0.99){
  speakit()
  } else{
    cbard.setLang("zh-CN");
  
    //bard.setVoice("Microsoft YaoYao - Chinese (Simplified, PRC)")
  
    cbard.speak("猩猩必须觉醒，通过劳作变得更加睿智。");
    //bard.setVoice("Microsoft Mark - English (United States)")
    bard.setLang("en-US");
    bard.speak("Apes must awaken, growing wiser through labor.   ew, ew, ah, ah, ew, ew, ah, ah ");

    
    
  }

}




function speakit() {
   // print("hello");
    cbard.setLang("zh-CN");
  
    //bard.setVoice("Microsoft YaoYao - Chinese (Simplified, PRC)")
  
    cbard.speak("学习" +wordMap[label]);
    //bard.setVoice("Microsoft Mark - English (United States)")
    bard.setLang("en-US");
    let label2
    if (label ==="monkey"){
      lable2 = "ape"
    }else{
      lable2 = label
    }
    bard.speak("Study the "+label);
  }

  function loaded() {
    print("loaded");
    //bard.listVoices();
  }
  