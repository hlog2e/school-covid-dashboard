let todayDate = getDate()[0];
//let todayDate = 18; //For Test

function getDate() {
  let dateDiv = document.getElementsByClassName("date")[0];
  let weekDiv = document.getElementsByClassName("week")[0];
  const weekDays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let week = today.getDay();
  let fullDate = year + "년 " + month + "월 " + date + "일";
  let fullDateInt = year.toString() + month.toString() + date.toString();
  dateDiv.innerText = fullDate;
  weekDiv.innerText = weekDays[week];
  return [date, fullDateInt];
}
function getTime() {
  let timeDiv = document.getElementsByClassName("nowTimeText")[0];
  let nowTime = new Date();

  let hour = nowTime.getHours();
  let min = nowTime.getMinutes();
  let sec = nowTime.getSeconds();

  let fullTime = hour + "시 " + min + "분 " + sec + "초";
  timeDiv.innerText = fullTime;
}
function getWeather() {
  let weatherTempDiv = document.getElementsByClassName("weatherTempInt")[0];
  let weatherTempTextDiv =
    document.getElementsByClassName("weatherTempText")[0];
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=36.627457&lon=127.511644&appid=eb64a92775dce737d22aa99320cfbd83"
  )
    .then((res) => {
      // 응답을 JSON 형태로 파싱
      return res.json();
    })
    .then((data) => {
      // json 출력
      console.log(data);
      let minusTemp = data.main.temp - 273.15;
      let roundTemp = Math.round(minusTemp);
      weatherTempDiv.innerText = roundTemp + "℃";
      let weatherText = data.weather[0].main;
      weatherTempTextDiv.innerText = weatherText;
    })
    .catch((err) => {
      // error 처리
      console.log("데이터를 불러올 수 없습니다.", err);
    });
}
function getMeal() {
  let lunchDivs = document.getElementsByClassName("lunchItem");
  let dinnerDivs = document.getElementsByClassName("dinnerItem");
  let lunchLoopCount = 0;
  let dinnerLoopCount = 0;
  fetch("https://schoolmenukr.ml/api/high/M100000136/?date=" + todayDate)
    .then((res) => {
      // 응답을 JSON 형태로 파싱
      return res.json();
    })
    .then((data) => {
      // json 출력
      let lunchArray = data.menu[0].lunch;
      let lunchArrayLength = lunchArray.length;
      let dinnerArray = data.menu[0].dinner;
      let dinnerArrayLength = dinnerArray.length;

      while (lunchLoopCount < lunchArrayLength) {
        lunchDivs[lunchLoopCount].innerText = lunchArray[lunchLoopCount];
        lunchLoopCount++;
      }
      if (dinnerArrayLength == 0) {
        dinnerDivs[0].innerText = "오늘은 석식이 제공되지 않습니다.";
        dinnerDivs[1].innerText = "";
        dinnerDivs[2].innerText = "";
      }

      while (dinnerLoopCount < dinnerArrayLength) {
        dinnerDivs[dinnerLoopCount].innerText = dinnerArray[dinnerLoopCount];
        dinnerLoopCount++;
      }

      console.log(dinnerArrayLength);
    })
    .catch((err) => {
      // error 처리
      console.log("급식정보 API서버 오류입니다.", err);
    });
}
function getNextDayMeal() {
  let nextLunchDivs = document.getElementsByClassName("nextLunchItem");
  let tomorrowDate = todayDate + 1;
  let nextLunchLoopCount = 0;
  fetch("https://schoolmenukr.ml/api/high/M100000136/?date=" + tomorrowDate)
    .then((res) => {
      // 응답을 JSON 형태로 파싱
      return res.json();
    })
    .then((data) => {
      // json 출력
      let nextLunchArray = data.menu[0].lunch;
      let nextLunchArrayLength = nextLunchArray.length;

      if (nextLunchArrayLength == 0) {
        dinnerDivs[0].innerText = "내일은 급식이 제공되지 않습니다.";
        dinnerDivs[1].innerText = "";
        dinnerDivs[2].innerText = "";
      }

      while (nextLunchLoopCount < nextLunchArrayLength) {
        nextLunchDivs[nextLunchLoopCount].innerText =
          nextLunchArray[nextLunchLoopCount];
        nextLunchLoopCount++;
      }
    })
    .catch((err) => {
      // error 처리
      console.log("급식정보 API서버 오류입니다.", err);
    });
}
function changeDday() {
  let dday = 26 - getDate()[0];
  let ddayDiv = document.getElementsByClassName("ddayText")[0];
  ddayDiv.innerText = "중간고사 D-" + dday;
}
function getCovidInc() {
  let covidCounterDiv = document.getElementsByClassName("covidCounterInt")[0];
  let covidCounterColorDiv =
    document.getElementsByClassName("covidCounter")[0].style;
  let covidCard1 = document.getElementsByClassName("covid body")[0];
  let covidCard2 = document.getElementsByClassName("covid body")[1];
  let covidCard3 = document.getElementsByClassName("covid body")[2];
  let covidCard4 = document.getElementsByClassName("covid body")[3];
  let covidCard5 = document.getElementsByClassName("covid body")[4];
  fetch(
    "https://api.corona-19.kr/korea/country/new/?serviceKey=He5dxvwNJSgWa6pVK4qC83rnycu1OGmRX"
  )
    .then((res) => {
      // 응답을 JSON 형태로 파싱
      return res.json();
    })
    .then((data) => {
      // json 출력
      let incCovid = data.korea.newCase;
      let chungbukCovid = data.chungbuk.newCase;
      let totalCase = data.korea.totalCase;
      let recovered = data.korea.recovered;
      let seoulCovid = data.seoul.newCase;
      let death = data.korea.death;
      covidCounterDiv.innerText = "+ " + incCovid + " 명";
      covidCard1.innerText = "+ " + chungbukCovid + " 명";
      covidCard2.innerText = totalCase + " 명";
      covidCard3.innerText = recovered + " 명";
      covidCard4.innerText = "+ " + seoulCovid + " 명";
      covidCard5.innerText = death + " 명";
    })
    .catch((err) => {
      // error 처리
      console.log("보건복지부 코로나 API서버 오류입니다.", err);
    });
}
getDate();
getTime();
getWeather();
getMeal();
getNextDayMeal();
changeDday();
getCovidInc();

changeTime = setInterval(function () {
  getTime();
}, 1000);

changeWeather = setInterval(function () {
  getWeather();
}, 600000);

checkCovid = setInterval(function () {
  getCovidInc();
}, 1800000);

mainReset = setInterval(function () {
  getDate();
  getMeal();
  getNextDayMeal();
  changeDday();
}, 10800000);
