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
*/
	{
		number: 7,
		publishedOn: "19 Jul 24",
		dispenserSpec: [undefined, "NuSe", "dde", "eU", "u"],
		mapSpec: [[1,1,1,1,1,1,1,1,1,1,1],
				  [1,0,0,1,0,0,1,0,2,0,1],
				  [1,0,3,0,0,1,0,1,0,0,1],
				  [1,1,0,0,1,0,1,0,0,0,1],
				  [1,1,1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [1, 7], direction:"d"},
		solutionSpec: [1, 1, 1, 1, 2, 2, 2, 4, 3, 3]
	},
	{
		number: 6,
		publishedOn: "12 Jul 24",
		dispenserSpec: [undefined, "NWS", "WUDU", "SeD"],
		mapSpec: [[1,1,1,1,1,1,1,1],
				  [1,0,1,0,0,0,3,1],
				  [1,0,0,0,1,0,0,1],
				  [1,2,0,0,0,0,0,1],
				  [1,0,0,1,0,0,0,1],
				  [1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [3, 2], direction:"W"},
		solutionSpec: [3, 3, 1, 3, 2, 2, 2, 2, 1]
	},
	{
		number: 5,
		publishedOn: "5 Jul 24",
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
	{
		number: 4,
		publishedOn: "28 Jun 24",
		dispenserSpec: [undefined, "eue", "ddD", "W", "uUd"],
		mapSpec: [[1,1,1,1,1,1,1,1,1],
				  [1,0,0,0,0,0,1,1,1],
				  [1,0,1,0,0,0,0,1,1],
				  [1,0,0,3,0,0,0,0,1],
				  [1,0,0,0,0,0,0,2,1],
				  [1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [3, 6], direction:"d"},
		solutionSpec: [2, 1, 1, 4, 1, 4, 4, 2, 3, 2]
	},	
	{
		number: 3,
		publishedOn: "21 Jun 24",
		dispenserSpec: [undefined, "US", "D", "DUUDU", "e", "u"],
		mapSpec: [[1,1,1,1,1,1,1,1,1,1],
				  [1,0,0,0,0,0,0,0,1,1],
				  [1,0,0,0,1,0,0,0,0,1],
				  [1,2,1,0,0,0,1,3,0,1],
				  [1,0,0,0,1,0,0,0,1,1],
				  [1,0,0,0,0,0,0,0,1,1],
				  [1,1,1,1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [3, 4], direction:"U"},
		solutionSpec: [3, 3, 1, 3, 3, 1, 3, 4, 2]
	},
	{
		number: 2,
		publishedOn: "14 Jun 24",
		dispenserSpec: [undefined, "SUud", "D", "dueW"],
		mapSpec: [[1,1,1,1,1,1,1],
				  [1,0,3,1,0,0,1],
				  [1,0,0,0,2,0,1],
				  [1,0,0,1,0,0,1],
				  [1,0,0,1,0,0,1],
				  [1,0,0,0,0,0,1],
				  [1,1,1,1,1,1,1]
				 ], 
		hintSpec: {coord: [3, 2], direction:"u"},
		solutionSpec: [3, 1, 2, 3, 3, 3, 1, 1, 1]
	},	
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

