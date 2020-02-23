// Line Prefixes
// function LN_Prefix_INIT(ta) {
  // LNPrefix(input);
  // input.addEventListener("input", LNPrefix.bind(this, input));
// }

// LN_Prefix_INIT(input);

// Documentation
function appendDoc (loc, op) {
  var div = document.createElement("div"),
      h2 = document.createElement("h2")
      p1 = document.createElement("p")
      p2 = document.createElement("p");

  div.classList.add("col-md-6");
  h2.innerText = op;
  p1.innerText = instructions[op].syntax;
  p2.innerHTML = "<small>"+instructions[op].description+"</small>";

  div.appendChild(h2);
  div.appendChild(p1);
  div.appendChild(p2);
  loc.appendChild(div);
}

for (var instruction in instructions)
  appendDoc(document.getElementById("docs"), instruction);
