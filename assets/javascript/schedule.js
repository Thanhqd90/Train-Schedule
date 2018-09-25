$(document).ready(function(){

  // var config = {
  //   apiKey: "AIzaSyC0FCC6915iAGGf_YASjMvXQ5C715ewNUI",
  //   authDomain: "train-scheduler-82029.firebaseapp.com",
  //   databaseURL: "https://train-scheduler-82029.firebaseio.com",
  //   projectId: "train-scheduler-82029",
  //   storageBucket: "train-scheduler-82029.appspot.com",
  //   messagingSenderId: "764219792983"
  // };
  // firebase.initializeApp(config);

  // var database = firebase.database();
  // var ref = database.ref("trains")

  // var data = {
  // data1: "name",
  // data2: "destination",
  // data3: "hours",
  // data4: "minutes",
  // data5: "frequency",
  // data6: "tMinutesTillTrain"
  // }
  // ref.push(data);

  // console.log(firebase);

  // Capture Button Click
  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var hours = $("#hours").val();
    var minutes = $("#minutes").val();
    var frequency = $("#frequency").val().trim();
    var tMinutesTillTrain = 10;

    if (name === "" || destination === "" || hours === "" || minutes === "" || frequency === "" )  {
      alert("Please fill out all fields");
      return false;
    }

        $(".trainInput").append(`
        <tr>
            <td>${name}</td>
            <td>${destination}</td>
            <td>${frequency} minutes</td>
            <td>${hours + ":" + minutes}</td>
            <td>${tMinutesTillTrain} minutes</td>
        </tr>`);
          // Clear input fields
          $("#name, #destination, #hours, #minutes, #frequency").val("");
          return false;
        });

});