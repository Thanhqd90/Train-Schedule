$(document).ready(function(){

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
  
  ref.on("value", gotData, errData)

  function gotData(data) {
    var trainList = $("td");
    for (var i = 0; i < trainList.length; i++) {
      trainList[i].remove();
    }

    console.log(data.val());
    var trains = data.val();
    var keys = Object.keys(trains);
    console.log(keys);
    for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var trainz = trains[k].trainName;
    var trainzd = trains[k].trainDestination;
    var trainF = trains[k].trainFirst;
    var trainFre = trains[k].trainFrequency;
    console.log(trainz, trainzd, trainF, trainFre);

    $(".trainInput").append(`
        <tr>
            <td>${trainz}</td>
            <td>${trainzd}</td>
            <td>${trainF} minutes</td>
            <td>${trainFre}</td>
            <td> minutes</td>
        </tr>`);
        
          $("#name, #destination, #hours, #minutes, #frequency").val("");
  }
}

  function errData(err) {
    console.log("Error")
    console.log(err);
  }

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

    var trainData = {
      trainName: name,
      trainDestination: destination,
      trainFirst: arrival,
      trainFrequency: frequency,
      }
    
      ref.push(trainData);
    
      console.log(firebase);

        //next arrival time
        var remaining = moment().add(frequency, "minutes").format('mm');
        console.log(moment());
        console.log(remaining);
        console.log(arrival);

    if (name === "" || destination === "" || hours === "" || minutes === "" || frequency === "")  {
      alert("Please fill out all fields");
      return false;
    }

    if (frequency === "0") {
    alert("Please enter a number greater than 0");
    return false;
    }

        // $(".trainInput").append(`
        // <tr>
        //     <td>${name}</td>
        //     <td>${destination}</td>
        //     <td>${frequency} minutes</td>
        //     <td>${hours + ":" + minutes}</td>
        //     <td>${remaining} minutes</td>
        // </tr>`);
        //   // Clear input fields
        //   $("#name, #destination, #hours, #minutes, #frequency").val("");
        //   return false;
        });

      });