function findCommonTime(events){

var dateEvents = events.map(function(event) {
  return {
    start: new Date(event.start),
    end: new Date(event.end)
  };
});

var requiredGap = 3*60 * 60 * 1000;// minimumm time gap is 3 hours.
var prev = dateEvents[0];
var availableList = [];
var firstGap = null;
var year = dateEvents[0].start.getFullYear();
var mon = dateEvents[0].start.getMonth()+1;
if (mon<10){
  mon = "0"+mon;
}
var date = dateEvents[0].start.getDate();
if (date<10){
  date = "0"+date;
}
var starttime = new Date(year+'-'+mon+'-'+date+"T09:00");
var endtime = new Date(year+'-'+mon+'-'+date+"T20:00");
 // console.log(dateEvents[0].start-starttime);
if(dateEvents[0].start-starttime>=requiredGap){
  availableList.push(starttime);
  // console.log(starttime);
}
for (var i = 1; i < dateEvents.length; i += 1) {
  var current = dateEvents[i];
  var diff = current.start - prev.end;
  
  if (diff >= requiredGap) {
    firstGap = {
      start: prev.end,
      end: current.start
    };
    availableList.push(firstGap.start);
  }
  prev = current;
}

availableList.push(dateEvents[dateEvents.length-1].end);

if (availableList[availableList.length-1]> endtime){
  availableList.pop();
}

// var ind = 0;
if (availableList.length > 0) {
  for (var i= 0; i<availableList.length;i+=1){
  console.log("Both of you available at: " + availableList[i]); 
  }
  
} else {
  console.log("No gaps available");
}

return availableList;

}

var events = [{
  start: "2016-01-01T12:10",
  end: "2016-01-01T13:00"
}, {
  start: "2016-01-01T13:20",
  end: "2016-01-01T13:30"
}, {
  start: "2016-01-01T13:20",
  end: "2016-01-01T13:50"
}, {
  start: "2016-01-01T13:30",
  end: "2016-01-01T14:00"
}, {
  start: "2016-01-01T15:15",
  end: "2016-01-01T15:45"
}, {
  start: "2016-01-01T19:15",
  end: "2016-01-01T20:45"
}];

findCommonTime(events);