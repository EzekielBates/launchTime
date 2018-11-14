var launchDiv = document.getElementById("launches");
var nextLaunchDiv = document.getElementById("nextLaunch");

var next5Request = new XMLHttpRequest();
var nextLaunch = new XMLHttpRequest();

var nextlaunchDate;

next5Request.open("GET","https://launchlibrary.net/1.4/launch?next=5",true);
nextLaunch.open("GET","https://launchlibrary.net/1.4/launch?next=1",true);

next5Request.onload = function(){

    var data = JSON.parse(this.response);
    data.launches.forEach(launch => {
        launchDiv.innerHTML += "<div>"+launch.name + "\n";
        launchDiv.innerHTML += launch.windowstart + "</div>\n\n"
    });
}

nextLaunch.onload = function(){
    var data = JSON.parse(this.response);
    data.launches.forEach(launch =>{
        nextLaunchDate = new Date(launch.windowstart);
    });
    setInterval(countdown,1000); 
    
}

next5Request.send();
nextLaunch.send();

function countdown(){
    var currentDate = new Date();

    var launch_ms = nextLaunchDate.getTime();
    var currentDate_ms = currentDate.getTime();

    var diff = launch_ms - currentDate_ms;
    diff = diff/1000;
    var seconds = Math.floor(diff % 60);
    diff = diff/60;
    var minutes = Math.floor(diff%60);
    diff = diff/60;
    var hours = Math.floor(diff%24);
    var days = Math.floor(diff/24);
    nextLaunchDiv.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
}