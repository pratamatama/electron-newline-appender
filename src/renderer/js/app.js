const {
  clipboard,
  remote,
  BrowserWindow,
} = require('electron')

let result
const input = document.getElementById('input-field')

// Declare a variable to each buttons to handle user interaction.
const processButton = document.getElementById('process-button')
const copyButton = document.getElementById('copy-button')
const exitButton = document.getElementById('exit-button')
const aboutButton = document.getElementById('about-button')

// Add event listener to each appropriate button.
processButton.addEventListener('click', append, false)
copyButton.addEventListener('click', copy, true)
exitButton.addEventListener('click', close, false)
aboutButton.addEventListener('click', about, false)

/**
 * Starts parsing input values and append new lines
 * as user clicked the process button.
 * 
 * @return {void}
 * @author Donny Pratama <donnypratama1024@gmail.com>
 */
function append() {
  result = chunk(input.value, 12).join('\n')

  input.value = ""
  input.value = result
}

/**
 * Copy the textarea value to the clipboard.
 * 
 * @return {void}
 * @author Donny Pratama <donnypratama1024@gmail.com>
 */
function copy() {
  clipboard.writeText(result)
}

/**
 * Close the application.
 * 
 * @return {void}
 * @author Donny Pratama <donnypratama1024@gmail.com>
 */
function close() {
  var window = remote.getCurrentWindow()
  window.close()
}

/**
 * Chunk the input value as array, and push it's value
 * with maximum of n mumber per value
 * 
 * @param {string|int} inputVal values from the textarea
 * @param {int} maxDigit maximum length to be scanned as one SIM card number (in this case: 12)
 */
function chunk(inputVal, maxDigit) {
  let result = []
  let i
  let length

  for (i = 0, length = inputVal.length; i < length; i += maxDigit) {
    /**
     * TODO: Make a condition to keep pushing values if the first digit after the last number is not (0) or (62).
     * 
     * This bug occured when the scanned simcard number has 13 digits, it breaks the chunkies.
     * Or in the worse case, the simcard has 15 digits.
     */
    result.push(inputVal.substr(i, maxDigit))
  }

  return result
}

function about() {
  window.open('', 'modal')
}
