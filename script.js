// function prefixLines() {
//   var lines = input.value.split(/\r?\n/);
//   for (var i = 0; i < lines.length; i++) {
//     lines[i] += "HI";
//   }
//   console.dir(lines);
// }
//
// prefixLines();
// function prefixLines () {
//   $("#programInput").on("change", "#programInput", function() {
//
//     // Target all classed with ".lined"
//     $(".lined").linedtextarea(
//       {selectedLine: 1}
//     );
//
//     // Target a single one
//     $("#programInput").linedtextarea();
//
//   });
// }
//
// prefixLines();

// document.getElementById("docs").addEventListener("change", prefixLines);

function appendDoc (loc, op) {
  var div = document.createElement("div"),
      h2 = document.createElement("h2")
      p1 = document.createElement("p")
      p2 = document.createElement("p");

  div.classList.add("col-md-6");
  h2.innerText = op;
  p2.innerText = instructions[op].syntax;
  p2.innerHTML = "<small>"+instructions[op].description+"</small>";

  div.appendChild(h2);
  div.appendChild(p1);
  div.appendChild(p2);
  loc.appendChild(div);
}

for (var instruction in instructions)
  appendDoc(document.getElementById("docs"), instruction);
