<script setup>
  import { ref, onMounted } from 'vue';
  import {BACKEND_BASE_URL} from './config/backend.config';
 
  import {buildMainGraph} from './graphs/main-graph';
  import {buildSideGraph} from './graphs/side-graph';

  import {getDatesPastWeek} from './utils';


  const today = new Date();
  const selectedDay = ref(new Date());
  const weekDays = getDatesPastWeek(today);

  function fetchData(){
    const selectedDayISO = selectedDay.value.toISOString().slice(0, 10);
    console.log(selectedDayISO);
    fetch(BACKEND_BASE_URL+'neows-day/'+selectedDayISO)
    .then(response => response.json())
    .then(data=>buildMainGraph(data));

  }

  function changeDay(day){
    selectedDay.value = day;
    console.log(selectedDay.value)
    fetchData();
  }

  onMounted(()=>{
    fetchData();
    fetch(BACKEND_BASE_URL+'neows-brightest/')
    .then(response => response.json())
    .then(data=>buildSideGraph(data));
  });


</script>

<template>
  <main>
    <div id="monitor">
      <div id="main-monitor">
        <h2>Asteroids of the day</h2>
        <div id="day-menu">
            <p>Select one day to update the chart:</p>
            <div class="btn-menu">
                <button v-for="wday in weekDays" class="day-btn" 
                  :class="{selected: (wday.getDay()==selectedDay.getDay())}"
                  @click="changeDay(wday)">
                  {{wday.toLocaleDateString('en-en', { weekday: 'short' }).toLowerCase()}}
                </button>
            </div>
        </div>
        
        <div id="main-graph"></div>
        <div id="main-graph-legend">
            <label><span class="icon">&uparrow;</span> DISTANCE (au)</label>
            <label><span class="icon">&rightarrow;</span> VELOCITY (km/s)</label>
        </div>
      </div>
      <div id="side-monitor">
        <h2>Brightest of the week</h2>
        <h3>MAGNITUDE</h3>
        <legend class="side-legend">
          <div>
            <svg width="30" height="30" class="icon"><g transform="translate(10,10)" >
              <rect height="10" width="10" stroke="white" fill="white" x="0" y="0" transform="rotate(45 5 5)"></rect>
            </g></svg>
            <label>Filled area: magnitude</label>
          </div>
          <div>
            <svg width="30" height="30" class="icon"><g transform="translate(10,10)">
              <rect height="10" width="10" stroke="white" fill="transparent" x="0" y="0" transform="rotate(45 5 5)"></rect>
            </g></svg>
            <label>Empty area: brightness</label>
          </div>
        </legend>
        <div id="side-graph"></div>
      </div>
    </div>
        
  </main>
</template>


