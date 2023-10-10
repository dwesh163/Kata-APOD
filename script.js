async function setToday() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  document.getElementById("date").value = today;
}

async function fetchAPI() {
  const dateInput = document.getElementById("date");
  const API_key = localStorage.getItem("APIKey");

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput.value}`
  );
  if (response.status != 200) {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_key}&date=${dateInput.value}`
    );
    if (response.status != 200) {
      console.log("set key");
    } else {
      const JSONObject = await response.json();
      setPage(JSONObject);
    }
  } else {
    const JSONObject = await response.json();
    setPage(JSONObject);
  }
}

function setPage(JSONObject) {
  data = JSON.parse(JSON.stringify(JSONObject, null, 3));
  console.log(data)

  document.getElementsByClassName("title")[0].innerHTML = data["title"];
  document.getElementsByClassName("date")[0].innerHTML = data["date"];
  document.getElementsByClassName("explanation")[0].innerHTML =
    data["explanation"];
  document.getElementsByClassName("hdurl")[0].src = data["hdurl"];
  if(data["copyright"] != null)
  {
    document.getElementsByClassName("copyright")[0].innerHTML = data["copyright"]
  }
  else{
    document.getElementsByClassName("copyright")[0].innerHTML = "NASA public domain"
  }
}

async function setKey() {
  const API_key = document.getElementById("APIKey").value;
  localStorage.setItem("APIKey", API_key);
}

setTimeout(() => {
  setToday();
}, 0.1);
setTimeout(() => {
  fetchAPI();
}, 0.1);
