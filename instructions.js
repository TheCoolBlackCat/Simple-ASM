var instructions = {
  "add": {exec: function () {set(instruction[1], get(instruction[2])+get(instruction[3]))}, name: "", syntax: "", description: ""},
  "sub": {exec: function () {set (instruction[1], get(instruction[2])-get(instruction[3]));}, name: "", syntax: "", description: ""},
  "addi": {exec: function () {set (instruction[1], get(instruction[2])+Number(instruction[3]));}, name: "", syntax: "", description: ""},
  "load": {exec: function () {set (instruction[1], Number(instruction[2]));}, name: "", syntax: "", description: ""},
  // Offset by -2 (Counting from zero, and i++ each time)
  "jmp": {exec: function () {i = Number(instruction[1]) - 2;}, name: "", syntax: "", description: ""},
  "ife": {exec: function () {if (get(instruction[1]) === get(instruction[2])) i = Number(instruction[3]) - 2;}, name: "", syntax: "", description: ""},
  "ifne": {exec: function () {if (get(instruction[1]) !== get(instruction[2])) i = Number(instruction[3]) - 2;}, name: "", syntax: "", description: ""},
  "stdout": {exec: function () {output(get(instruction[1]), 0);}, name: "", syntax: "", description: ""},
  "stdoutt": {exec: function () {output(instruction.slice(1).join(" "), 0);}, name: "", syntax: "", description: ""},
  "stderr": {exec: function () {output(get(instruction[1]), 1);}, name: "", syntax: "", description: ""},
  "stderrt": {exec: function () {output(instruction.slice(1).join(" "), 1);}, name: "", syntax: "", description: ""},
};
