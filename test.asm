load $a 2
load $b 3
load $c 0
load $d 0
add $c $c $a
addi $d $d 1 # counter
ife $d $b 9
jmp 5
nop
