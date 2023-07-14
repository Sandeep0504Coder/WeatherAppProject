const cityName=document.getElementById("cityName")
const submitBtn=document.getElementById("submitBtn")
const city_name=document.getElementById("city_name")
const temperature=document.getElementById("temp")
const day=document.getElementById("day")
const today_date=document.getElementById("today_date")
const weathercon=document.getElementById("temp_status")
const dataHide=document.querySelector(".middle_layer")
const getCurrentDay=()=>{
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const now=new Date()
    return days[now.getDay()]
}
const getCurrentDate=()=>{
    const months=["JAN","FEB","MAR",'APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    const now=new Date()
    const curMonth=now.getMonth()
    const curDate=now.getDate()
    return months[curMonth]+" "+curDate.toString()
}
day.innerText=getCurrentDay()
today_date.innerHTML=getCurrentDate()
const getInfo=async (event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    if(cityVal===""){
        city_name.innerText="Plz write the name before search";
        dataHide.classList.add("data_hide")
    }
    else{
        try{
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=e37cf556cd6bc88480e005301b4f5792`
        const response=await fetch(url);
        const objData= await response.json()
        const arrData=[objData]
        //console.log(objData)
        const searchMsg=arrData[0].name+", "+arrData[0].sys.country;
        const temp=(arrData[0].main.temp - 273.00).toFixed(2);
        //console.log(temp)
        const weatherStatus=arrData[0].weather[0].main;
        city_name.innerText=searchMsg
        temperature.innerHTML=`<span>${temp}</span> <sup>o</sup>C`
        if (weatherStatus=="Clear"){
            weathercon.innerHTML="<i class='fa-solid fa-sun fa-beat-fade' style='color: #eccc68'></i>"
          }
          else if(weatherStatus=="Clouds"){
            weathercon.innerHTML="<i class='fa-solid fa-cloud fa-beat-fade ' style=' #57606f'></i>"
          }
          else if(weatherStatus=="Rainy"){
          weathercon.innerHTML='<i class="fa-solid fa-cloud-rain fa-beat-fade" style="color:blue"></i>'
          }
          
          else if(weatherStatus=="Thunderstorm"){
            weathercon.innerHTML='<i class="fa-solid fa-bolt fa-beat-fade" style="color:yellow"></i>'
          }
          else if(weatherStatus=="Haze"){
            weathercon.innerHTML="<i class='fa-solid fa-smog fa-beat-fade' style='color: #fff'></i>"
          }
          else if(weatherStatus=="Windy"){
            weathercon.innerHTML='<i class="fa-solid fa-wind fa-beat-fade" style="color:rgb(123, 177, 211)"></i>'
          }
          else if(weatherStatus=="Mist"){
            weathercon.innerHTML="<i class='fa-solid fa-smog fa-beat-fade' style='color: #57606f'></i>"
          }
          else{
            weathercon.innerHTML="<i class='fa-solid fa-sun fa-beat-fade' style='color: #eccc68'></i>"
          }
          dataHide.classList.remove("data_hide")
        }
        catch{
            city_name.innerText="Plz enter the city name properly"
            dataHide.classList.add("data_hide");
            
        }
    }
}
submitBtn.addEventListener("click",getInfo);


