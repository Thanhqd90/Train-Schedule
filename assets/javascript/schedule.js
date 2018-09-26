$(document).ready(function () {
  
// Global
  // var puns = [];
  var nextTrain = 0;
  var remaining = 0;

// Initialize firebase
  var config = {
    apiKey: "AIzaSyC0FCC6915iAGGf_YASjMvXQ5C715ewNUI",
    authDomain: "train-scheduler-82029.firebaseapp.com",
    databaseURL: "https://train-scheduler-82029.firebaseio.com",
    projectId: "train-scheduler-82029",
    storageBucket: "train-scheduler-82029.appspot.com",
    messagingSenderId: "764219792983"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref()


  ref.on("value", gotData)

  function clearField() {
    $("#name, #destination, #hours, #minutes, #frequency").val("");
  }


  function gotData(data) {
    var trainList = $("td");
    for (var i = 0; i < trainList.length; i++) {
      trainList[i].remove();
    }

    console.log(data.val());
    var trains = data.val();
    var keys = Object.keys(trains);
    console.log(keys);

    // Capture Button Click
    $("#addTrain").on("click", function (event) {
      event.preventDefault();

      // Grabbed values from text boxes
      var name = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var hours = $("#hours").val();
      var minutes = $("#minutes").val();
      var arrival = hours + minutes;
      var frequency = $("#frequency").val().trim();

      if (name === "" | destination === "" | hours === "" | minutes === "" | frequency === "") {
        return false;
      }

      var trainData = {
        name: name,
        destination: destination,
        starttime: arrival,
        frequency: frequency,

      }
      clearField();
      ref.push(trainData);
      console.log(firebase);

    });

    function nextTrainTime(x, y) {

      var frequency = x;
      var firstTime = y;

      // First Time (pushed back 1 year to make sure it comes before current time)
      var converted = moment(firstTime, "hh:mm").subtract(1, "years");

      var difference = moment().diff(moment(converted), "minutes");

      var mod = difference % frequency;

      remaining = frequency - mod;

      nextTrain = moment().add(remaining, "minutes");
      result = moment(nextTrain).format("hh:mm A");

      return [result, remaining];
    };


    ref.on("child_added", function (snapshot) {
      $(".trainInput").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().destination}</td>
            <td>${snapshot.val().frequency} minutes</td>
            <td>${nextTrainTime(snapshot.val().frequency,snapshot.val().starttime)[0]}</td>
            <td>${nextTrainTime(snapshot.val().frequency,snapshot.val().starttime)[1]} minutes</td>
        </tr>
        `);
      console.log(snapshot);
    });

  }

});
