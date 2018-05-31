registers = [0, 0, 0, 0];

function load () {

}

function output (o, type) {
  switch (type) {
    case 0:
      document.getElementById("programOutput").innerText = o;
      break;
    case 1:
      document.getElementById("programOutput").innerHTML = '<span class="error">'+o+"</span>";
      break;
    default:
      document.getElementById("programOutput").innerText = o;
  }
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
      output("Error getting register " + str, 1);
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
      output("Error setting register " + str, 1);
  }
}

function run () {
  raw = document.getElementById("programInput").value; // Get input
  instructions = raw.split(/\r?\n/); // Split on newline

  instructions.forEach(function (instruction, i) {
    instruction = instruction.split(" ");
    console.log(instruction);

    switch (instruction[0]) {
      case "add":
        set (instruction[1], get(instruction[2])+get(instruction[3]));
        break;
      case "load":
        set (instruction[1], instruction[2]);
        break;
      default:
        output("Error Parsing Instruction on Line " + i, 1);
    }
    updateRegisterOutput();
  });
}
