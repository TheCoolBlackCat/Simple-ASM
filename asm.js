var registers = {"$a": 0, "$b": 0, "$c": 0, "$d": 0},
    input = document.getElementById("programInput"),
    line = 0,
    error = false,
    debug = false;

/* output()
 * Outputs to "console" by altering #programOutput.innerHTML
 * 2 modes: 0 - Output (Default), 1 - Error
 */
function output (o, type) {
  var el = document.getElementById("programOutput");
  switch (type) {
    case 'e':
    case "err":
    case 1:
      el.innerHTML += '<span class="stderr">'+o+"</span><br>";
      error = true;
      break;
    case 'd':
    case 2:
      el.innerHTML += '<span class="debug">'+o+"</span><br>";
      break;
    default:
      el.innerHTML += '<span class="stdout">'+o+"</span><br>";;
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
  for (var register in registers)
    registers[register] = 0;
}

/* resetAll()
 * Resets the app
 * Calls resetOutput(), resetRegisters() and updateRegisterOutput()
 */
function resetAll () {
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
  if (registers.hasOwnProperty(str))
    return Number(registers[str]);
  else if (str === "$zero")
    return 0;
  else
    output("Error getting register " + str + " on Line " + line, 'e');
}

/* set()
 * Sets a given register to an integer value
 */
function set (str, value) {
  if (registers.hasOwnProperty(str))
    registers[str] = Number(value);
  else if (str === "$zero")
    return;
  else
    output("Error getting register " + str + " on Line " + line, 'e');
}

/* run()
 * Called onClick of "Run" button
 * Runs the program, translating text in #programInput.value to an array, then executing each line
 */
function run () {
  // Takes raw input, and splits it into lines, stored in the op array
  var raw = input.value, // Get input
      op = raw.split(/\r?\n/); // Split on newline

  // Resets registers and output, and updates UI
  resetAll();

  // Loop through each instruction in array
  for (i = 0; i < op.length; i++) {
    // Split each instruction on space, and store in array
    instruction = op[i].split(" ");
    line = i+1;

    if (debug) {
      output(line + ": " + instruction.join("|"), 'd');
      console.dir(instruction);
    }

    // Watch [0] (Where instruction name stored
    if (instructions.hasOwnProperty(instruction[0]))
      instructions[instruction[0]].exec(); // Execute function containing instruction
    else if (instruction[0] === "" || instruction[0] === "nop" || instruction[0].charAt(0) === "#" || /^\s*$/.test(instruction.join()) || /^[\s]?#./.test(instruction.join() /*Comment*/)) // Advance PC cases - sorted by complexity
      ; // Do nothing
    else if (instruction[0] === "debug")
      debug = !debug;
    else
      output("Error Parsing Instruction on Line " + line, 'e');

    if (!error)
      updateRegisterOutput();
  }
}
