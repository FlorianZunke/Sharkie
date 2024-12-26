/**
 * Triggers the fullscreen mode for the element with the ID 'fullscreen'.
 */
function fullscreen() {
  let fullscreen = document.getElementById('fullscreen');
  openFullscreen(fullscreen);
}

/**
* Exits the fullscreen mode for the element with the ID 'fullscreen'.
*/
function exitFullscreen() {
  let fullscreen = document.getElementById('fullscreen');
  closeFullscreen(fullscreen);
}

/**
* Opens the fullscreen mode for the specified element.
*
* @param {HTMLElement} elem - The HTML element to display in fullscreen mode.
*/
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
* Exits the fullscreen mode for the document.
*/
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}