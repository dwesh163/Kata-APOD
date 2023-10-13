let ActivePage = "apod";
let notActivePage = "settings";
let quality = "";

async function setToday() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  document.getElementById("date").value = today;
}

async function fetchAPI() {
  activePageFunction("apod");

  const dateInput = document.getElementById("date");
  const API_key = localStorage.getItem("APIKey");

  if(localStorage.getItem(dateInput.value)){
    data = localStorage.getItem(dateInput.value);
    console.log(data)
    console.log(dateInput.value)
    setPage(JSON.parse(data));
  }
  else{
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput.value}`
    );
    if (response.status != 200) {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_key}&date=${dateInput.value}`
      );
      if (response.status != 200) {
        activePageFunction("settings");
      } else {
        const JSONObject = await response.json();
        setPage(JSON.parse(JSON.stringify(JSONObject, null, 3)));
        localStorage.setItem(dateInput.value, (JSON.stringify(JSONObject)));
      }
    } else {
      const JSONObject = await response.json();
      setPage(JSON.parse(JSON.stringify(JSONObject, null, 3)));
      localStorage.setItem(dateInput.value, (JSON.stringify(JSONObject)));
    }
    
    
  }

}

function setPage(data) {


  document.getElementsByClassName("title")[0].innerHTML = data["title"];
  //document.getElementsByClassName("date")[0].innerHTML = data["date"];
  document.getElementsByClassName("explanation")[0].innerHTML =
    data["explanation"];

  if (data["copyright"] != null) {
    document.getElementsByClassName("copyright")[0].innerHTML =
      data["copyright"];
  } else {
    document.getElementsByClassName("copyright")[0].innerHTML =
      "NASA public domain";
  }
  if(data["media_type"] == "image"){
    if (quality == "hd") {
      document.getElementsByClassName("hdurl")[0].src = data["hdurl"];
    } else {
      document.getElementsByClassName("hdurl")[0].src = data["url"];
    }
    document.getElementsByClassName("video")[0].src = ""
    document.getElementsByClassName("video")[0].style.position = "absolute";
    document.getElementsByClassName("hdurl")[0].style.position = "relative";
  }
  else{
    document.getElementsByClassName("hdurl")[0].src = "";
    document.getElementsByClassName("video")[0].src = data["url"];
    document.getElementsByClassName("hdurl")[0].style.position = "absolute";
    document.getElementsByClassName("video")[0].style.position = "relative";
  }
}

async function setKey() {
  const API_key = document.getElementById("APIKey").value;
  localStorage.setItem("APIKey", API_key);
  fetchAPI();
}

function setDay(move) {
  var current = document.getElementById("date").value;
  newDate = new Date(current);

  var now = new Date(current);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var newCurrent = now.getFullYear() + "-" + month + "-" + day;

  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var date = now.getFullYear() + "-" + month + "-" + day;

  if (move == "before") {
    newDate.setDate(newDate.getDate() - 1);
  }
  if (move == "after" && date != newCurrent) {
    newDate.setDate(newDate.getDate() + 1);
  }

  var now = new Date(newDate);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var date = now.getFullYear() + "-" + month + "-" + day;
  document.getElementById("date").value = date;

  fetchAPI();
}

function activePageFunction(active) {
  if (active == "apod") {
    ActivePage = "apod";
    notActivePage = "settings";
  }
  if (active == "settings") {
    ActivePage = "settings";
    notActivePage = "apod";
  }

  document.getElementsByClassName(`section-${ActivePage}`)[0].style.visibility =
    "visible";
  document.getElementsByClassName(
    `section-${notActivePage}`
  )[0].style.visibility = "hidden";

  if (ActivePage == "apod") {
    document.getElementsByClassName(`section-settings`)[0].style.position = "absolute";
    document.getElementsByClassName(`section-apod`)[0].style.position = "relative";
    document.getElementsByClassName("footer")[0].style.position = "relative";
    document.getElementsByClassName(`section-settings`)[0].style.marginTop = "-100px";
  }
  else{
    document.getElementsByClassName(`section-settings`)[0].style.position = "relative";
    document.getElementsByClassName(`section-apod`)[0].style.position = "absolute";
    document.getElementsByClassName("footer")[0].style.position = "absolute";
    document.getElementsByClassName(`section-settings`)[0].style.marginTop = "20%";
  }
0
  document.getElementsByClassName(`line-${ActivePage}`)[0].style.visibility =
    "visible";
  document.getElementsByClassName(`line-${notActivePage}`)[0].style.visibility =
    "hidden";
}

function over(mode) {
  if (mode != ActivePage) {
    document.getElementsByClassName(`line-${ActivePage}`)[0].style.visibility =
      "hidden";
    document.getElementsByClassName(
      `line-${notActivePage}`
    )[0].style.visibility = "visible";
  }
}

function out(mode) {
  if (mode != ActivePage) {
    document.getElementsByClassName(`line-${ActivePage}`)[0].style.visibility =
      "visible";
    document.getElementsByClassName(
      `line-${notActivePage}`
    )[0].style.visibility = "hidden";
  }
}

setTimeout(() => {
  setToday();
}, 0.1);

setTimeout(() => {fetchAPI();}, 0.1);
