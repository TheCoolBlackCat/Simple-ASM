function prefixLines() {
  var lines = input.value.split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    lines[i] += "HI";
  }
  console.dir(lines);
}

prefixLines();
