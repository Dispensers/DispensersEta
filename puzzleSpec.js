/*
let punterPuzzleSpec = {
	number: 12,
	solveBy: "6 Feb",
	dispenserSpec: [undefined, "26", "4*", "/05"],
	targetSpec: "200",
	hintSpec: {numDots: 3, symbol:"0", isHere: false},
	solutionExpression: "50/6*24",
	solutionDispenseSequence: [3, 3, 3, 1, 2, 1, 2]
};
*/
/*
let punterPuzzleSpec = {
	number: 15,
	solveBy: "13 Feb",
	dispenserSpec: [undefined, "-1", "4*1", "71"],
	targetSpec: "147",
	hintSpec: {numDots: 3, symbol:"7", isHere: false},
	solutionExpression: "11*14-7",
	solutionDispenseSequence: [1, 2, 2, 3, 2, 1, 3]
};
*/
/* TEST PUZZLE 1 - used on github 
let punterPuzzleSpec = {
	number: 13,
	solveBy: "20 Feb",
	dispenserSpec: [undefined, "Nde", "ud", "du", "eS"],
	//dispenserSpec: [undefined, "Nuded", "SSud"],
	mapSpec: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
              [1, 2, 0, 1, 0, 0, 0, 1, 0, 1],				
	          [1, 0, 0, 0, 0, 0, 1, 0, 9, 1],
		      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		     ],
	hintSpec: {coord: [3, 3], direction:"u"},
	solutionSpec: [1, 1, 3, 1, 2, 4, 2, 3, 4]
};
*/
/* TEST PUZZLE 2 
let punterPuzzleSpec = {
	number: 13,
	solveBy: "20 Feb",
	dispenserSpec: [undefined, "due", "du", "eu", "N", "D"],
	mapSpec: [[1,1,1,1,1,1,1,1,1],
			  [1,0,0,1,0,0,0,9,1],
			  [1,2,0,0,0,0,1,0,1],
			  [1,0,0,1,0,1,0,0,1],
			  [1,1,1,1,1,1,1,1,1]
			 ], 
	hintSpec: {coord: [2, 3], direction:"u"},
	solutionSpec: [2, 2, 3, 3, 5, 1, 1, 1, 4]
};
*/
/* TEST PUZZLE 3 - full map
let punterPuzzleSpec = {
	number: 13,
	solveBy: "20 Feb",
	dispenserSpec: [undefined, "duu", "Ud", "ed", "NSW"],

	mapSpec: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
              [1, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],				
	          [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 9, 1],
	          [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	          [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
		      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		     ],

	hintSpec: {coord: [2, 3], direction:"u"},
	solutionSpec: [2, 3, 1, 3, 1, 1, 1, 2, 2]
};
*/
/* TEST PUZZLE 4 third kin
let punterPuzzleSpec = {
	number: 13,
	solveBy: "20 Feb",
	//dispenserSpec: [undefined, "d", "Wue", "U", "ueSD"], 3 min
	//dispenserSpec: [undefined, "uUWD", "ueS", "e", "d"], 2.5 min
	dispenserSpec: [undefined, "d", "ueU", "S", "uWeD"], 5 min
	//dispenserSpec: [undefined, "uUee", "duW", "D", "S"], 20 min
	//dispenserSpec: [undefined, "UuWS", "uee", "d", "D"], 1 min
	mapSpec: [[1,1,1,1,1,1,1,1,1,1],
			  [1,0,0,0,1,1,0,0,0,1],
			  [1,0,0,0,2,1,9,0,0,1],
			  [1,0,0,0,1,0,1,0,0,1],
			  [1,0,0,0,0,0,0,0,0,1],
			  [1,1,1,1,1,1,1,1,1,1]
			 ], 
	hintSpec: {coord: [4, 3], direction:"e"},
	solutionSpec: [2, 4, 4, 3, 4, 1, 2, 4, 2]
};
*/
/* TEST PUZZLE 5 demo*/
let punterPuzzleSpec = {
	number: 13,
	solveBy: "20 Feb",
	//dispenserSpec: [undefined, "uNdSe", "Uedud"],
	dispenserSpec: [undefined, "ueUu", "e", "d", "ddSN"],
	mapSpec: [[1,1,1,1,1,1,1,1,1],
			  [1,0,0,0,0,0,0,0,1],
			  [1,2,0,1,0,1,0,1,1],
			  [1,1,0,1,0,0,9,0,1],
			  [1,0,0,0,0,0,0,0,1],
			  [1,1,1,1,1,1,1,1,1]
			 ], 
	hintSpec: {coord: [3, 5], direction:"e"},
	solutionSpec: [4, 3, 4, 4, 1, 4, 2, 1, 1]
};
/*
let punterPuzzleSpec = {
	number: 23,
	solveBy: "27 Feb",
	dispenserSpec: [undefined, "13", "5", "79", "-", "*"],
	targetSpec: "318",
	hintSpec: {numDots: 1, symbol:"9", isHere: false},
	solutionExpression: "9*37-15",
	solutionDispenseSequence: [3, 5, 1, 3, 4, 1, 2]
};
*/
/*
let punterPuzzleSpec = {
	number: 17,
	solveBy: "5 Mar",
	dispenserSpec: [undefined, "20", "/", "+8", "46"],
	targetSpec: "4.15",
	hintSpec: {numDots: 1, symbol:"9", isHere: false},
	solutionExpression: "86/40+2",
	solutionDispenseSequence: [3, 4, 2, 4, 1, 3, 1]
};
*/
/*
let punterPuzzleSpec = {
	number: 14,
	solveBy: "12 Mar",
	dispenserSpec: [undefined, "/61", "7", "91-8"],
	targetSpec: "53",
	hintSpec: {numDots: 1, symbol:"9", isHere: false},
	solutionExpression: "81-196/7",
	solutionDispenseSequence: [3, 1, 3, 3, 3, 1, 1, 2]
};
*/
/*
let punterPuzzleSpec = {
	number: 22,
	solveBy: "19 Mar",
	dispenserSpec: [undefined, "1", "2+", "3", "4-", "5"],
	targetSpec: "-28",
	hintSpec: {numDots: 1, symbol:"9", isHere: false},
	solutionExpression: "1-53+24",
	solutionDispenseSequence: [1, 4, 5, 3, 2, 2, 4]
};
*/
/*
let punterPuzzleSpec = {
	number: 16,
	solveBy: "?? Apr",
	dispenserSpec: [undefined, "5-1", "159", "-19"],
	targetSpec: "-37",
	hintSpec: {numDots: 1, symbol:"9", isHere: false},
	solutionExpression: "915-951-1",
	solutionDispenseSequence: [2, 1, 2, 1, 3, 1, 3, 3, 2]
};
*/

/* ================================================================= */



/*
let punterPuzzleSpec = {
	number: 99,
	solveBy: "30 Jan",
	dispenserSpec: [undefined, "/9", "6-", "38", "0", "1"],
	targetSpec: "28",
	solutionExpression: "90-186/3",
	solutionDispenseSequence: [1, 4, 2, 5, 3, 2, 1, 3]
};
*/
