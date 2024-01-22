// Elements to be watched/updated
var altitudeSlider = document.getElementById("altitudeSlider");
var altitudeText = document.getElementById("altitudeText");

var p_result = document.getElementById("P_result");
var rho_result = document.getElementById("rho_result");
var t_result = document.getElementById("T_result");
var s_result = document.getElementById("s_result");

// Function to validate the altitude, simple but can be scalable if security issues rise
const validateAltitude = alt => {
    parsedAlt = parseFloat(alt);
    if (parsedAlt > 80) {
      return 80;
    } else {
      return parsedAlt;
    }
}

// Write results to the output fields
const updateResults = result => {
  t_result.innerHTML = result[0];
  p_result.innerHTML = result[1];
  rho_result.innerHTML = result[2];
  s_result.innerHTML = result[3];
}

// Get information from slider or text and update both accordingly
altitudeSlider.oninput = function() {
  if (this.value !== "") {
    let h = validateAltitude(this.value);
    this.value = h;
    altitudeText.value = h;

    let result = getResult(h);
    updateResults(result);
  }
}

altitudeText.oninput = function() {
  if (this.value !== "") {
    let h = validateAltitude(this.value);
    this.value = h;
    altitudeSlider.value = h;

    let result = getResult(h);
    updateResults(result);
  }
}
