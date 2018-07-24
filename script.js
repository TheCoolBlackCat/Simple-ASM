var registers = [0, 0, 0, 0];
var line = 0;
var error = false;
var debug = false;

/* output()
 * Outputs to "console" by altering #programOutput.innerHTML
 * 2 modes: 0 - Output (Default), 1 - Error
 */
function output (o, type) {
  switch (type) {
    case 0:
      document.getElementById("programOutput").innerHTML += '<span class="stout">'+encodeURI(o)+"</span><br>";
      break;
    case 1:
      document.getElementById("programOutput").innerHTML += '<span class="sterr">'+o+"</span><br>";
      error = true;
    case 2:
      document.getElementById("programOutput").innerHTML += '<span class="debug">'+o+"</span><br>";
      break;
    default:
      document.getElementById("programOutput").innerHTML += '<span class="stout">'+encodeURI(o)+"</span><br>";;
  }
}

/* resetOutput()
 * Erases previous "console" output by clearing #programOutput.innerHTML
 */
function resetOutput () {
  document.getElementById("programOutput").innerHTML = "";
}

/* resetRegisters()
 * Sets all registers in array to 0
 */
function resetRegisters () {
  for (var i = 0; i < registers.length; i++)
    registers[i] = 0;
}

/* reset()
 * Resets the app
 * Calls resetOutput(), resetRegisters() and updateRegisterOutput()
 */
function reset () {
  resetOutput();
  resetRegisters();
  updateRegisterOutput();
  error = false;
}

/* updateRegisterOutput()
 * Updates the registers as displayed on the page, setting them to the corresponding array values
 */
function updateRegisterOutput () {
  document.getElementById("r_a").innerHTML = get("$a");
  document.getElementById("r_b").innerHTML = get("$b");
  document.getElementById("r_c").innerHTML = get("$c");
  document.getElementById("r_d").innerHTML = get("$d");
}

/* get()
 * Returns the value stored in a register as an integer
 */
function get (str) {
  switch (str) {
    case "$a":
      return Number(registers[0]);
    case "$b":
      return Number(registers[1]);
    case "$c":
      return Number(registers[2]);
    case "$d":
      return Number(registers[3]);
    case "$zero":
      return 0;
    default:
      output("Error getting register " + str + " on Line " + line, 1);
  }
}

/* set()
 * Sets a given register to an integer value
 */
function set (str, value) {
  switch (str) {
    case "$a":
      registers[0] = value;
      break;
    case "$b":
      registers[1] = value;
      break;
    case "$c":
      registers[2] = value;
      break;
    case "$d":
      registers[3] = value;
      break;
    default:
      output("Error setting register " + str + " on Line " + line, 1);
  }
}

/* run()
 * Called onClick of "Run" button
 * Runs the program, translating text in #programInput.value to an array, then executing each line
 */
function run () {
  // Takes raw input, and splits it into lines, stored in the instructions array
  raw = document.getElementById("programInput").value; // Get input
  instructions = raw.split(/\r?\n/); // Split on newline

  // Resets registers and output, and updates UI
  reset();

  // Loop through each instruction in array
  for (i = 0; i < instructions.length; i++) {
    // Split each instruction on space, and store in array
    instruction = instructions[i].split(" ");
    line = i+1;

    if (debug) {
        output(line + ": " + instruction, 2);
    }

    // Watch [0] (Where instruction name stored
    switch (instruction[0]) {
      case "#": // Comment
        break;
      case "add":
        set (instruction[1], get(instruction[2])+get(instruction[3]));
        break;
      case "sub":
        set (instruction[1], get(instruction[2])-get(instruction[3]));
        break;
      case "addi":
        set (instruction[1], get(instruction[2])+Number(instruction[3]));
        break;
      case "load":
        set (instruction[1], Number(instruction[2]));
        break;
      case "jmp":
        i = Number(instruction[1]) - 2; // Offset by -2 (Counting from zero, and i++ each time)
        break;
      case "ife":
        if (get(instruction[1]) === get(instruction[2]))
            i = Number(instruction[3]) - 2; // Offset by -2 (Counting from zero, and i++ each time)
        break;
      case "ifne": // Compare two registers
        if (get(instruction[1]) !== get(instruction[2]))
            i = Number(instruction[3]) - 2; // Offset by -2 (Counting from zero, and i++ each time)
        break;
      case "stdout": // Output value stored in register
        output(get(instruction[1]), 0);
        break;
      case "stderr": // Output value stored in register, as error
        output(get(instruction[1]), 1);
        break;
      case "stdoutt": // Output text
          output(instruction[1], 0);
          break;
      // case "stderrt": // Output text, as error
      //     output(instruction[1], 1);
      //     break;
      case "nop": // No Operation, Advance PC
        break;
      case "": // Empty, Advance PC
        break;
      case "debug": // Toggles debugging
        debug = !debug;
        break;
      default:
        if (instruction[0].charAt(0) === "#") // Comment
          break;
        output("Error Parsing Instruction on Line " + line, 1);
    }
    if (!error)
      updateRegisterOutput();
  }
}
