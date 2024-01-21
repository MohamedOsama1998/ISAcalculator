// Get information from sliders

// Global Variables, starting at sea level values

var altitudeSlider = document.getElementById("altitudeSlider");
var altitudeText = document.getElementById("altitudeText");

altitudeSlider.oninput = function() {
  altitudeText.value = this.value;
}

altitudeText.oninput = function() {
  if (this.value !== "") {
    h = parseFloat(this.value);
  }
  altitudeSlider.value = h;
}
