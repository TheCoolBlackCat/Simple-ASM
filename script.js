var registers = [0, 0, 0, 0];
var line = 0;
var error = false;

function output (o, type) {
  switch (type) {
    case 0:
      document.getElementById("programOutput").innerHTML += '<span class="stout">'+o+"</span><br>";
      break;
    case 1:
      document.getElementById("programOutput").innerHTML += '<span class="sterr">'+o+"</span><br>";
      error = true;
      break;
    default:
      document.getElementById("programOutput").innerHTML += '<span class="stout">'+o+"</span><br>";;
  }
}

function resetOutput () {
  document.getElementById("programOutput").innerHTML = "";
}

function resetRegisters () {
  for (var i = 0; i < registers.length; i++)
    registers[i] = 0;
}

function reset () {
  resetOutput();
  resetRegisters();
  updateRegisterOutput();
}

function updateRegisterOutput () {
  document.getElementById("r_a").innerHTML = registers[0];
  document.getElementById("r_b").innerHTML = registers[1];
  document.getElementById("r_c").innerHTML = registers[2];
  document.getElementById("r_d").innerHTML = registers[3];
}

function get (str) {
  switch (str) {
    case "$a":
      return Number(registers[0]);
      break;
    case "$b":
      return Number(registers[1]);
      break;
    case "$c":
      return Number(registers[2]);
      break;
    case "$d":
      return Number(registers[3]);
      break;
    default:
      output("Error getting register " + str + " on Line " + line, 1);
  }
}

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

function run () {
  raw = document.getElementById("programInput").value; // Get input
  instructions = raw.split(/\r?\n/); // Split on newline

  reset();

  for (i = 0; i < instructions.length; i++) {
    instruction = instructions[i].split(" ");
    line = i+1;

    console.log(instruction);

    switch (instruction[0]) {
      case "#":
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
        set (instruction[1], instruction[2]);
        break;
      case "jmp":
        i = Number(instruction[1]) - 1;
        break;
      case "ife":
        if (get(instruction[1]) === get(instruction[2]))
          i = Number(instruction[3]) - 1;
        break;
      case "ifne":
      if (get(instruction[1]) !== get(instruction[2]))
        i = Number(instruction[3]) - 1;
        break;
      case "stdout":
        output(get(instruction[1]), 0);
        break;
      case "stderr":
        output(get(instruction[1]), 1);
        break;
      case "nop":
        break;
      case "":
          break;
      default:
        if (instruction[0].charAt(0) === "#")
          break;
        output("Error Parsing Instruction on Line " + line, 1);
    }
    if (!error)
      updateRegisterOutput();
  }
}
