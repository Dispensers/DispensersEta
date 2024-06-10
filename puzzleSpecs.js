let puzzleSpecs = [
/*
	// 13.30
	{
		number: 8,
		solveBy: "20 Feb",
		dispenserSpec: [undefined, "d", "eue", "d", "euuSN", "d"],
		mapSpec: [[1,1,1,1,1,1,1,1,1,1],
				  [1,0,0,0,1,0,0,0,0,1],
				  [1,3,0,0,0,0,1,0,2,1],				
				  [1,0,0,1,0,0,0,0,0,1],
				  [1,1,1,1,1,1,1,1,1,1]
				 ],
		hintSpec: {coord: [4, 3], direction:"e"},
		solutionSpec: [4, 1, 4, 4, 3, 4, 5, 2, 2]
	},

	// V GOOD
	{
		number: 7,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "NuSe", "dde", "eU", "u"],
		mapSpec: [[1,1,1,1,1,1,1,1,1,1,1],
				  [1,0,0,1,0,0,1,0,2,0,1],
				  [1,0,3,0,0,1,0,1,0,0,1],
				  [1,1,0,0,1,0,1,0,0,0,1],
				  [1,1,1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [2, 3], direction:"u"},
		solutionSpec: [1, 1, 1, 1, 2, 2, 2, 4, 3, 3]
	},

	// ?
	{
		number: 6,
		solveBy: "20 Feb",
		dispenserSpec: [undefined, "NWS", "WUDU", "SeD"],
		mapSpec: [[1,1,1,1,1,1,1,1],
				  [1,0,1,0,0,0,3,1],
				  [1,0,0,0,1,0,0,1],
				  [1,2,0,0,0,0,0,1],
				  [1,0,0,1,0,0,0,1],
				  [1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [4, 3], direction:"e"},
		solutionSpec: [3, 3, 1, 3, 2, 2, 2, 2, 1]
	},
	
	// GOOD 6.20
	{
		number: 5,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "due", "du", "eu", "N", "D"],
		mapSpec: [[1,1,1,1,1,1,1,1,1],
				  [1,0,0,1,0,0,0,2,1],
				  [1,3,0,0,0,0,1,0,1],
				  [1,0,0,1,0,1,0,0,1],
				  [1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [2, 3], direction:"u"},
		solutionSpec: [2, 2, 3, 1, 5, 3, 1, 1, 4]
	},
	
	// ?
	{
		number: 4,
		solveBy: "20 Feb",
		dispenserSpec: [undefined, "eue", "ddD", "W", "uUd"],
		mapSpec: [[1,1,1,1,1,1,1,1,1],
				  [1,0,0,0,0,0,1,1,1],
				  [1,0,1,0,0,0,0,1,1],
				  [1,0,0,3,0,0,0,0,1],
				  [1,0,0,0,0,0,0,2,1],
				  [1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [3, 3], direction:"u"},
		solutionSpec: [2, 1, 1, 4, 1, 4, 4, 2, 3, 2]
	},
	
	// ?
	{
		number: 3,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "US", "D", "DUUDU", "e", "u"],
		mapSpec: [[1,1,1,1,1,1,1,1,1,1],
				  [1,0,0,0,0,0,0,0,1,1],
				  [1,0,0,0,1,0,0,0,0,1],
				  [1,2,1,0,0,0,1,3,0,1],
				  [1,0,0,0,1,0,0,0,1,1],
				  [1,0,0,0,0,0,0,0,1,1],
				  [1,1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [2, 3], direction:"u"},
		solutionSpec: [3, 3, 1, 3, 3, 1, 3, 4, 2]
	},

	// Q EASY
	{
		number: 2,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "SUud", "D", "dueW"],
		mapSpec: [[1,1,1,1,1,1,1],
				  [1,0,3,1,0,0,1],
				  [1,0,0,0,2,0,1],
				  [1,0,0,1,0,0,1],
				  [1,0,0,1,0,0,1],
				  [1,0,0,0,0,0,1],
				  [1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [2, 3], direction:"u"},
		solutionSpec: [3, 1, 2, 3, 3, 3, 1, 1, 1]
	},
*/	
	{
		number: 1,
		publishedOn: "7 Jun 24",
		dispenserSpec: [undefined, "Nde", "ud", "du", "eS"],
		mapSpec: [[1,1,1,1,1,1,1,1,1,1],
				  [1,0,0,1,0,0,1,1,1,1],
				  [1,3,0,1,0,0,0,1,0,1],				
				  [1,0,0,0,0,0,1,0,2,1],
				  [1,1,1,1,1,1,1,1,1,1]
				 ],
		hintSpec: {coord: [3, 3], direction:"u"},
		solutionSpec: [1, 1, 3, 1, 2, 4, 2, 3, 4]
	},
	
	{
		number: 0,
		publishedOn: "10 Apr 24",
		dispenserSpec: [undefined, "ueUu", "e", "d", "ddSN"],
		mapSpec: [[1,1,1,1,1,1,1,1,1],
				  [1,0,0,0,0,0,0,0,1],
				  [1,3,0,1,0,1,0,1,1],
				  [1,1,0,1,0,0,2,0,1],
				  [1,0,0,0,0,0,0,0,1],
				  [1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [3, 5], direction:"e"},
		solutionSpec: [4, 3, 4, 4, 1, 4, 2, 1, 1]
	}
];

