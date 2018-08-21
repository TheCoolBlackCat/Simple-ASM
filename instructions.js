var instructions = {
  "add": {exec: function () {set(instruction[1], get(instruction[2])+get(instruction[3]))}, syntax: "$ $ $", description: "Add registers on the right, and store the result in the left register"},
  "sub": {exec: function () {set (instruction[1], get(instruction[2])-get(instruction[3]));}, syntax: "$ $ $", description: "Subtract the register on the right from the one in the centre, and store the result in the left register"},
  "addi": {exec: function () {set (instruction[1], get(instruction[2])+Number(instruction[3]));}, syntax: "$ $ x", description: "Add registers on the right with the value, and store the result in the left register"},
  "load": {exec: function () {set (instruction[1], Number(instruction[2]));}, syntax: "$ x", description: "Load the value into the register specified"},
  // Offset by -2 (Counting from zero, and i++ each time)
  "jmp": {exec: function () {i = Number(instruction[1]) - 2;}, syntax: "x", description: "Jump unconditionally to the line specified"},
  "ife": {exec: function () {if (get(instruction[1]) === get(instruction[2])) i = Number(instruction[3]) - 2;}, syntax: "$ $ x", description: "Compare the two registers, and if they're equal, jump to the line specified"},
  "ifne": {exec: function () {if (get(instruction[1]) !== get(instruction[2])) i = Number(instruction[3]) - 2;}, syntax: "$ $ x", description: "Compare the two registers, and if they're unequal, jump to the line specified"},
  "stdout": {exec: function () {output(get(instruction[1]), 0);}, syntax: "$", description: "Output the value in the register specified"},
  "stdoutt": {exec: function () {output(instruction.slice(1).join(" "), 0);}, syntax: "x", description: "Output the given value (or text)"},
  "stderr": {exec: function () {output(get(instruction[1]), 1);}, syntax: "$", description: "Output the value in the register specified, indicating an error"},
  "stderrt": {exec: function () {output(instruction.slice(1).join(" "), 1);}, syntax: "x", description: "Output the given value (or text), indicating an error"},
};
