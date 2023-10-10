async function setToday() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    console.log(today)
    document.getElementById('date').value = today;
}

async function fetchAPI() { 
    
    const dateInput = document.getElementById("date");
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput.value}`);
    const JSONObject = await response.json();

    data = JSON.parse(JSON.stringify(JSONObject, null, 3));
    console.log(data["title"])

    console.log(data)

    document.getElementsByClassName("title")[0].innerHTML = data["title"];
    document.getElementsByClassName("date")[0].innerHTML = data["date"];
    document.getElementsByClassName("explanation")[0].innerHTML = data["explanation"];
    document.getElementsByClassName("hdurl")[0].src = data["hdurl"];

}

setTimeout(() => {  setToday(); }, 0.1);
setTimeout(() => {  fetchAPI(); }, 0.1);

 

