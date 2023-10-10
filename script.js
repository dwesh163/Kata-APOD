async function setToday() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    document.getElementById('date').value = today;
}

async function fetchAPI() {
    
    const dateInput = document.getElementById("date");
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput.value}`);
    const JSONObject = await response.json();

    const responseElement = document.getElementsByClassName("response")[0];
    responseElement.innerHTML = JSON.stringify(JSONObject, null, 3);

}

setToday()