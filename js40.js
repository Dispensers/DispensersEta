/* -------- Main Window -------- */

class MainWindow {
	constructor() {
		console.log(`${window.innerHeight}px`);
		console.log(`${window.innerWidth}px`);
		console.log(`${window.devicePixelRatio}`);
		
		this.innerHeight = window.innerHeight;
		this.innerWidth = window.innerWidth;
		this.devicePixelRatio = window.devicePixelRatio;
	}
}

let mainWindow = new MainWindow();


/* -------- Utility Functions -------- */

function wait(duration) {
	return new Promise((resolve, reject) => {setTimeout(resolve, duration)});
}

function disableScrolling() {
	document.body.classList.add("DisableScrolling");
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	window.onscroll = function() {window.scrollTo(scrollLeft, scrollTop);};
}

function enableScrolling() {
	document.body.classList.remove("DisableScrolling");
	window.onscroll = function() {};
}


/* -------- Published -------- */

function publishedOnClick(eventObject) {
	console.log("publishedOnClick called", eventObject);
	const target = eventObject.target;
	target.style.color = "#551A8B";
	const id = target.id;
	indexAsString = id.split("-")[1];
	index = Number(indexAsString);
	console.log(id, indexAsString, index);

	disableScrolling();
	const newPunterPuzzle = new Puzzle(puzzleSpecs[index]);
	reconfigure(newPunterPuzzle);
	mainWall.show();	
	punter.solveBiz.wake();
}

class Published {
	constructor() {
		const publishedRef = document.querySelector("#iwTCPublishedPuzzles-2");
		for (let i = 0; i < puzzleSpecs.length; i++) {
			const puzzleSpec = puzzleSpecs[i];
			const puzzleRef = document.createElement("button");
			puzzleRef.id = "iwTCPublishedPuzzle-" + String(i);
			puzzleRef.type = "button";
			puzzleRef.style =
				"margin:0; padding:0.5em 0 0.5em 0; border:none; background-color:transparent; " +
				"box-sizing:border-box; width:12.5%; " +
				"font-size:2.5em; text-decoration-line:underline;";
			if (i == 0) {
				puzzleRef.style.color = "#551A8B";
			}
			else {
				puzzleRef.style.color = "#0000EE";
			}
			puzzleRef.append(String(puzzleSpec.number));
			puzzleRef.addEventListener("click", publishedOnClick);
			publishedRef.append(puzzleRef);
		}
	}
}


/* -------- Puzzle -------- */

class Puzzle {
	constructor(puzzleSpec) {
		this.number = puzzleSpec.number;
		this.publishedOn = puzzleSpec.publishedOn;
		this.dispenserFullSpec = puzzleSpec.dispenserSpec;
		this.mapSpec = puzzleSpec.mapSpec;
		this.hintSpec = puzzleSpec.hintSpec;
		this.solutionSpec = puzzleSpec.solutionSpec;
		this.numDispensers = this.dispenserFullSpec.length - 1;
		this.dispenserHeightSpec = [undefined];
		for (let i = 1; i <= this.numDispensers; i++) this.dispenserHeightSpec[i] = this.dispenserFullSpec[i].length;
		this.maxDispenserHeight = 1;
		for (let d = 1; d <= this.numDispensers; d++) {
			if (this.dispenserHeightSpec[d] > this.maxDispenserHeight) this.maxDispenserHeight = this.dispenserHeightSpec[d];
		};
		this.mapWidth = puzzleSpec.mapSpec[0].length;
		this.mapHeight = puzzleSpec.mapSpec.length;
	}
	
	deconstruct() {
	}
};


/* -------- Main Wall -------- */

const mainWallSpec = {
	mwNumGridColumns: 55,
	mwHeightAboveDoor: 9,

	mwdHeightAbovePanel: 10,
	mwdHeightBelowPanel: 18,

	mwdpHeightFixed: 7,
	mwdpContainerCompartmentHeight: 6,
	
	mwdptPointDimension: 5
};

class MainWall {
	constructor(mainWallSpec, punterPuzzle) {
		this.wallRef = document.querySelector("#mainWall");
		this.doorRef = document.querySelector("#mwDoor");
		this.panelRef = document.querySelector("#mwdPanel");
		
		this.dispenserRefsInUse = []
		const dispensersId = "#mwdpDispensers-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers);
		const dispensersRef = document.querySelector(dispensersId);
		this.dispenserRefsInUse.push(dispensersRef);
		dispensersRef.style.display = `grid`;
		//+2 for dispenser bottom cosmetics
		const dispensersHeight = (mainWallSpec.mwdpContainerCompartmentHeight * punterPuzzle.maxDispenserHeight) + 2;
		dispensersRef.style.height = `${dispensersHeight}em`;
		
		for (let d = 1; d <= punterPuzzle.numDispensers; d++) {
			const numItems = punterPuzzle.dispenserHeightSpec[d];
			const containerId = "#mwdpdContainer-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers) + "-" + String(d) + String(numItems);
			const containerRef = document.querySelector(containerId);
			this.dispenserRefsInUse.push(containerRef);
			containerRef.style.display = `block`;
			const borderId = "#mwdpdBorder-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers) + "-" + String(d) + String(numItems);
			const borderRef = document.querySelector(borderId);
			this.dispenserRefsInUse.push(borderRef);
			borderRef.style.display = `block`;
			for (let i = 1; i <= numItems; i++) {
				const itemId = "#mwdpdItem-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers) + "-" + String(d) + String(i);
				const itemRef = document.querySelector(itemId);
				this.dispenserRefsInUse.push(itemRef);
				itemRef.style.display = `block`;
			}
		}

		const territoryRef = document.querySelector("#mwdpTerritory");
		const territoryEmHeight = (punterPuzzle.mapHeight - 2) * mainWallSpec.mwdptPointDimension;
		territoryRef.style.height = `${territoryEmHeight}em`;
		territoryRef.style.gridTemplateRows = `repeat(${territoryEmHeight}, 1fr)`;

		const panelStyle = this.panelRef.style.cssText;
		this.frPanelDispensers = String(dispensersHeight);
		this.frPanelTerritory = String(territoryEmHeight);
		let newPanelStyle = panelStyle.replace(/999/, this.frPanelDispensers);
		newPanelStyle = newPanelStyle.replace(/888/, this.frPanelTerritory);
		this.panelRef.style.cssText = newPanelStyle;
		const panelHeight = mainWallSpec.mwdpHeightFixed + dispensersHeight + territoryEmHeight;
		this.panelRef.style.height = `${panelHeight}em`;

		const doorStyle = this.doorRef.style.cssText;
		this.frDoorPanel = String(panelHeight);
		const newDoorStyle = doorStyle.replace(/999/, this.frDoorPanel);
		this.doorRef.style.cssText = newDoorStyle;
		const doorHeight = mainWallSpec.mwdHeightAbovePanel + panelHeight + mainWallSpec.mwdHeightBelowPanel;
		this.doorRef.style.height = `${doorHeight}em`;

		const wallStyle = this.wallRef.style.cssText;
		this.frWallDoor = String(doorHeight);
		const newWallStyle = wallStyle.replace(/999/, this.frWallDoor);
		this.wallRef.style.cssText = newWallStyle;
		const wallHeight = mainWallSpec.mwHeightAboveDoor + doorHeight;
		this.wallRef.style.height = `${wallHeight}em`;


		let innerDimension = 0
		let gridDimension = 0
		if ((mainWindow.innerHeight / wallHeight) <= (mainWindow.innerWidth / mainWallSpec.mwNumGridColumns)) {
			innerDimension = mainWindow.innerHeight;
			gridDimension = wallHeight;
		}
		else {
			innerDimension = mainWindow.innerWidth;
			gridDimension = mainWallSpec.mwNumGridColumns;
		}

		const percent = innerDimension / 100;
		let fontSize = 0;
		let reducingInnerDimension = innerDimension + 1;
		do {
			reducingInnerDimension = reducingInnerDimension - 1;
			fontSize = Math.trunc((reducingInnerDimension / gridDimension) * mainWindow.devicePixelRatio) / mainWindow.devicePixelRatio;
			console.log('mw fontSize', fontSize);
		} while ((innerDimension - (fontSize * gridDimension)) < (2 * percent));
		console.log('mw final fontSize', fontSize);
		this.wallRef.style.fontSize = `${fontSize}px`;
		this.fontSize = fontSize;

		this.height = this.fontSize * wallHeight
		const spareHeight = mainWindow.innerHeight - this.height;
		console.log('mw spareHeight', spareHeight);
		const deviceSpareHeight = spareHeight * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareHeight', deviceSpareHeight);
		const roundedDeviceSpareHeight = Math.trunc(deviceSpareHeight / 2) * 2;
		console.log('mw roundedDeviceSpareHeight', roundedDeviceSpareHeight);
		const roundedSpareHeight = roundedDeviceSpareHeight / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareHeight', roundedSpareHeight);
		this.topPosition = roundedSpareHeight / 2;
		this.wallRef.style.top = `${this.topPosition}px`;

		this.width = this.fontSize * mainWallSpec.mwNumGridColumns
		const spareWidth = mainWindow.innerWidth - this.width;
		console.log('mw spareWidth', spareWidth);
		const deviceSpareWidth = spareWidth * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareWidth', deviceSpareWidth);
		const roundedDeviceSpareWidth = Math.trunc(deviceSpareWidth / 2) * 2;
		console.log('mw roundedDeviceSpareWidth', roundedDeviceSpareWidth);
		const roundedSpareWidth = roundedDeviceSpareWidth / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareWidth', roundedSpareWidth);
		this.leftPosition = roundedSpareWidth / 2;
		this.wallRef.style.left = `${this.leftPosition}px`;
	}

	show() {
		this.wallRef.style.display = `grid`;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
		for (let ref of this.dispenserRefsInUse) {
			ref.style.display = 'none'
		}
		
		const panelStyle = this.panelRef.style.cssText;
		const regExpDispensers = new RegExp(this.frPanelDispensers);
		console.log(regExpDispensers)
		let unspecifiedPanelStyle = panelStyle.replace(regExpDispensers, '999');
		const regExpTerritory = new RegExp(this.frPanelTerritory);
		console.log(regExpTerritory)
		unspecifiedPanelStyle = unspecifiedPanelStyle.replace(regExpTerritory, '888');
		console.log(unspecifiedPanelStyle);
		this.panelRef.style.cssText = unspecifiedPanelStyle;
		
		const doorStyle = this.doorRef.style.cssText;
		const regExpPanel = new RegExp(this.frDoorPanel);
		const unspecifiedDoorStyle = doorStyle.replace(regExpPanel, '999');
		console.log(unspecifiedDoorStyle);
		this.doorRef.style.cssText = unspecifiedDoorStyle;
		
		const wallStyle = this.wallRef.style.cssText;
		const regExpWall = new RegExp(this.frWallDoor);
		const unspecifiedWallStyle = wallStyle.replace(regExpWall, '999');
		console.log(unspecifiedWallStyle);
		this.wallRef.style.cssText = unspecifiedWallStyle;
	}
}


/* -------- Info Wall -------- */

function backOnClick() {
	infoWall.hide();
	//disableScrolling();
	mainWall.show();
	disableScrolling();
	}

function demonstrationOnClick () {
	demo.enter();
	}

class InfoWall {
	constructor(topPosition, leftPosition, fontSize, punterPuzzle) {
		this.wallRef = document.querySelector("#infoWall");

		this.wallRef.style.top = `${topPosition}px`;
		this.wallRef.style.left = `${leftPosition}px`;
		this.wallRef.style.fontSize = `${fontSize}px`;

		const puzzleDataRef = document.querySelector("#iwPuzzleData");
		puzzleDataRef.innerHTML = "<strong>Puzzle " + String(punterPuzzle.number) + "&emsp;&boxh;&emsp;published on " + punterPuzzle.publishedOn + "</strong>";

		this.separator2Ref = document.querySelector("#iwSeparator-2");
		this.separator2TopPosition = undefined;

		this.controlBack = new Control("#iwCtrlBack", backOnClick);
		this.controlBack.enable();
		this.controlBack.unfade();		
		this.controlDemo = new Control("#iwdCtrlDemonstration", demonstrationOnClick);
		this.controlDemo.enable();
		this.controlDemo.unfade();
	}
	
	show() {
		this.wallRef.style.display = `grid`;
		const separator2Rect = this.separator2Ref.getBoundingClientRect();
		this.separator2TopPosition = separator2Rect.top;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
		this.wallRef.style.display = `none`;
		this.controlDemo.deconstruct();
		this.controlBack.deconstruct();
	}
}


/* -------- Cross/Tick -------- */

function crossTickFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashCrossTick(crossTickRef, solveBiz) {
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	crossTickFlashed(solveBiz)
}

class CrossTick {
	constructor(crossTickId) {
		this.ref = document.querySelector(crossTickId);
	}
	
	showTick(solveBiz) {
		this.ref.innerHTML = "<strong>&check;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	showCross(solveBiz) {
		this.ref.innerHTML = "<strong>&cross;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	hide() {
		this.ref.style.display = `none`;
	}
	
	deconstruct() {
		this.ref.style.display = `none`;
	}
}


/* -------- Dispensers -------- */

class DispenserItem {
	constructor(dispenser, direction) {
		this.dispenser = dispenser;
		this.direction = direction;
	}
	
	deconstruct() {
	}
}

class Dispenser {
	constructor(itemSequence, itemIdRoot) {
		this.itemImageLookUp = [];
		this.itemImageLookUp["N"] = "dispenserDirectionN.svg";
		this.itemImageLookUp["u"] = "dispenserDirectionNE.svg";
		this.itemImageLookUp["e"] = "dispenserDirectionE.svg";
		this.itemImageLookUp["d"] = "dispenserDirectionSE.svg";
		this.itemImageLookUp["S"] = "dispenserDirectionS.svg";
		this.itemImageLookUp["D"] = "dispenserDirectionSW.svg";
		this.itemImageLookUp["W"] = "dispenserDirectionW.svg";
		this.itemImageLookUp["U"] = "dispenserDirectionNW.svg";
		
		this.itemQueue = [];
		for (let i = 0; i < itemSequence.length; i++) {
			const item = new DispenserItem(this, itemSequence[i]);
			this.itemQueue.unshift(item);
		}

		this.itemRefs = [];
		for (let i = 1; i <= itemSequence.length; i++) {
			const itemId = itemIdRoot + String(i);
			const itemRef = document.querySelector(itemId);
			this.itemRefs.push(itemRef);
		}
		
		this.container = [];
		for (let i = 0; i < this.itemQueue.length; i++) this.container[i] = this.itemQueue[i];
				
		this.numItemsInContainer = this.itemQueue.length;
	}

	refresh() {
		for (let i = 0; i < this.container.length; i++) {
			if (this.container[i] == null) {
				this.itemRefs[i].style.display = `none`;
			}
			else {
				this.itemRefs[i].style.display = `block`;
				this.itemRefs[i].src = this.itemImageLookUp[this.container[i].direction];
			}
		}
	}
	
	reset() {	
		this.container = [];
		for (let i = 0; i < this.itemQueue.length; i++) this.container[i] = this.itemQueue[i];
		this.numItemsInContainer = this.itemQueue.length;
	}
	
	takeItem() {
		const item = this.container.shift();
		this.container.push(null);
		this.numItemsInContainer--;
		return item;
	}
	
	replaceItem() {
		this.container.pop();
		const item = this.itemQueue[this.itemQueue.length - this.numItemsInContainer - 1];
		this.container.unshift(item);
		this.numItemsInContainer++;		
	}
	
	peekAtItem() {
		return this.container[0];
	}

	deconstruct() {
		for (let item of this.itemQueue) {
			item.deconstruct();
		}
	}
}


/* -------- Territory -------- */

class Territory {
	constructor(territoryRootId, abstractMap) {
		const maxUnboundedWidthEven = 10;
		const maxUnboundedWidthOdd = 9;
		const unboundedWidth = abstractMap[0].length - 2;
		const unboundedHeight = abstractMap.length - 2;
		this.rowAdjustment = -1;
		
		if ((unboundedWidth % 2) == 0) {
			this.columnAdjustment = ((maxUnboundedWidthEven - unboundedWidth) / 2) - 1;
			this.svgPointLookUp = [];
			this.svgPointLookUp[0] = "territoryEvenDot.svg"
			this.svgPointLookUp[1] = "territoryEvenBlocker.svg"
			this.svgPointLookUp[3] = "territoryEvenStart.svg"
			this.svgPointLookUp[2] = "territoryEvenFinish.svg"
			this.pointIdRoot = territoryRootId + "EvenPoint-";
			this.lineIdRoot = territoryRootId + "EvenLine-";
		}
		else {
			this.columnAdjustment = ((maxUnboundedWidthOdd - unboundedWidth) / 2) - 1;
			this.svgPointLookUp = [];
			this.svgPointLookUp[0] = "territoryOddDot.svg"
			this.svgPointLookUp[1] = "territoryOddBlocker.svg"
			this.svgPointLookUp[3] = "territoryOddStart.svg"
			this.svgPointLookUp[2] = "territoryOddFinish.svg"
			this.pointIdRoot = territoryRootId + "OddPoint-";
			this.lineIdRoot = territoryRootId + "OddLine-";
		}

		this.pointRefs = []
		for (let r = 1; r <= unboundedHeight; r++) {
			const row = this.convertRow(r);
			for (let c = 1; c <= unboundedWidth; c++) {
				const column = this.convertColumn(c);
				const pointRef = document.querySelector(this.pointIdRoot + String(row) + String(column));
				this.pointRefs.push(pointRef);
				const pointValue = abstractMap[r][c];
				pointRef.src = this.svgPointLookUp[pointValue]
				pointRef.style.display = `block`;
			}
		}

		this.directionLookUp = [];
		this.directionLookUp["N"] = "N";
		this.directionLookUp["u"] = "NE";
		this.directionLookUp["e"] = "E";
		this.directionLookUp["d"] = "SE";
		this.directionLookUp["S"] = "S";
		this.directionLookUp["D"] = "SW";
		this.directionLookUp["W"] = "W";
		this.directionLookUp["U"] = "NW";
		
		this.lineRefs = [];
	}
	
	convertRow(abstractRow) {
		return abstractRow + this.rowAdjustment;
	}

	convertColumn(abstractColumn) {
		return abstractColumn + this.columnAdjustment;
	}
	
	displayLine(coord, direction) {
		const directionLookUp = [];
		directionLookUp["N"] = "N";
		directionLookUp["u"] = "NE";
		directionLookUp["e"] = "E";
		directionLookUp["d"] = "SE";
		directionLookUp["S"] = "S";
		directionLookUp["D"] = "SW";
		directionLookUp["W"] = "W";
		directionLookUp["U"] = "NW";

		const row = this.convertRow(coord.row);
		const column = this.convertColumn(coord.column);
		const lineId = this.lineIdRoot + String(row) + String(column) + "-" + directionLookUp[direction];
		const lineRef = document.querySelector(lineId);
		lineRef.style.display = `block`;
		this.lineRefs.push(lineRef);
	}

	//could optimise this now that deconstruct() requires a list of line refs
	undisplayLine(coord, direction) {
		const row = this.convertRow(coord.row);
		const column = this.convertColumn(coord.column);
		const lineId = this.lineIdRoot + String(row) + String(column) + "-" + this.directionLookUp[direction];
		const lineRef = document.querySelector(lineId);
		lineRef.style.display = `none`;		
		const index = this.lineRefs.indexOf(lineRef);
		if (index != -1) this.lineRefs.splice(index, 1);
	}

	deconstruct() {
		for (let pointRef of this.pointRefs) {
			pointRef.style.display = `none`;
		}	
		for (let lineRef of this.lineRefs) {
			lineRef.style.display = `none`;
		}	
	}
}


/* -------- AbstractMap -------- */

class AbstractCoord {
	constructor(row, column) {
		this.row = row;
		this.column = column;
	}
	
	deconstruct() {
	}
}

class AbstractLine {
	constructor(territory, coord, direction){
		this.territory = territory;
		this.coord = coord;
		this.direction = direction;
		territory.displayLine(coord, direction);
	}

	undisplay() {
		this.territory.undisplayLine(this.coord, this.direction);
	}
	
	deconstruct() {
	}
}

class AbstractMap {
	constructor(puzzle, territoryRootId) {
		this.map = puzzle.mapSpec;
		this.territory = new Territory(territoryRootId, this.map);
		
		for (let r = 0; r < puzzle.mapHeight; r++) {
			for (let c = 0; c < puzzle.mapWidth; c++) {
				const pointValue = this.map[r][c];
				if (pointValue == 3) {
					this.pathStartCoord = new AbstractCoord(r, c);
				}
				else if (pointValue == 2) {
					this.pathFinishCoord = new AbstractCoord(r, c);
				}
			}
		}

		this.pathCoords = [this.pathStartCoord];
		this.pathLines = [];
		this.dispenserItems = [];

		this.temporaryLine = null;

		this.coordAdjustmentsLookUp = [];
		this.coordAdjustmentsLookUp["N"] = [-1, 0];
		this.coordAdjustmentsLookUp["u"] = [-1, +1];
		this.coordAdjustmentsLookUp["e"] = [0, +1];
		this.coordAdjustmentsLookUp["d"] = [+1, +1];
		this.coordAdjustmentsLookUp["S"] = [+1, 0];
		this.coordAdjustmentsLookUp["D"] = [+1, -1];
		this.coordAdjustmentsLookUp["W"] = [0, -1];
		this.coordAdjustmentsLookUp["U"] = [-1, -1];
		
		this.crossoversLookUp = [];
		this.crossoversLookUp["u"] = [["N", "d"], ["e", "U"]];
		this.crossoversLookUp["U"] = [["N", "D"], ["W", "u"]];
		this.crossoversLookUp["d"] = [["S", "u"], ["e", "D"]];
		this.crossoversLookUp["D"] = [["S", "U"], ["W", "d"]];
	}

	reset() {
		for (let i = 0; i < this.pathLines.length; i++) {
			this.pathLines[i].undisplay();
		}
		this.pathCoords = [this.pathStartCoord];
		this.pathLines = [];
		this.dispenserItems = [];
	}

	getNextCoord(coord, direction) {
		const adjustments = this.coordAdjustmentsLookUp[direction];
		const nextCoord = new AbstractCoord(coord.row + adjustments[0], coord.column + adjustments[1]);
		return nextCoord;
	}

	getPathLength() {
		return this.pathLines.length;
	}

	areCoordsEqual(coord1, coord2) {
		return (coord1.row == coord2.row) && (coord1.column == coord2.column);
	}
	
	isCoordInPath(coord) {
		for (let i = 0; i < this.pathCoords.length; i++) {
			const pathCoord = this.pathCoords[i];
			if (this.areCoordsEqual(coord, pathCoord)) return true;
		}
		return false;
	}

	isLineInPath(coord, direction) {
		for (let i = 0; i < this.pathLines.length; i++) {
			const pathLine = this.pathLines[i];
			if (this.areCoordsEqual(coord, pathLine.coord) && direction == pathLine.direction) return true;
		}
		return false;
	}
	
	isAddLineValid(dispenserItem) {
		const startCoord = this.pathCoords[this.pathCoords.length - 1];
		const direction = dispenserItem.direction;
		const nextCoord = this.getNextCoord(startCoord, direction);
		//Revisit test
		if (this.isCoordInPath(nextCoord)) return false;
		const pointValue = this.map[nextCoord.row][nextCoord.column];
		//Blocker test
		if (pointValue == 1) return false;
		//Crossover test
		if ("uUdD".includes(direction)) {
			const crossovers = this.crossoversLookUp[direction];
			const coord1 = this.getNextCoord(startCoord, crossovers[0][0]);
			if (this.isLineInPath(coord1, crossovers[0][1])) return false;
			const coord2 = this.getNextCoord(startCoord, crossovers[1][0]);
			if (this.isLineInPath(coord2, crossovers[1][1])) return false;
		}
		return true;
	}
	
	addLine(dispenserItem) {
		this.dispenserItems.push(dispenserItem);
		const startCoord = this.pathCoords[this.pathCoords.length - 1];
		const direction = dispenserItem.direction;
		const line = new AbstractLine(this.territory, startCoord, direction);
		const finishCoord = this.getNextCoord(startCoord, direction);
		this.pathLines.push(line);
		this.pathCoords.push(finishCoord);
	}
	
	removeLine() {
		const line = this.pathLines.pop();
		line.undisplay();
		this.pathCoords.pop();
		return this.dispenserItems.pop();
	}
	
	addTemporaryLine(coord, direction) {
		this.temporaryLine = new AbstractLine(this.territory, coord, direction);
	}
	
	removeTemporaryLine() {
		this.temporaryLine.undisplay();
		this.temporaryLine = null;
	}
	
	isPathComplete() {
		const lastCoord = this.pathCoords[this.pathCoords.length - 1];
		return this.areCoordsEqual(lastCoord, this.pathFinishCoord);
	}
	
	deconstruct() {
		if (this.temporaryLine != null) this.temporaryLine.deconstruct();
		this.pathFinishCoord.deconstruct();
		this.pathStartCoord.deconstruct();
		this.territory.deconstruct();
	}
}


/* -------- Controls -------- */

class Control {
	constructor(id, onClick) {
	this.id = id;
	this.onClick = onClick;
	this.ref = document.querySelector(id);
	this.isEnabled = false;
	this.isFrozen = false;
	this.wasEnabledBeforeFreeze = undefined;
	}

	enable() {
		if (this.isFrozen) return;
		if (!this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
			this.isEnabled = true;
		}
	}
	
	disable() {
		if (this.isFrozen) return;
		if (this.isEnabled) {
			if (this.OnClick !== null) {
				this.ref.removeEventListener("click", this.onClick);
			}
			this.isEnabled = false;
		}
	}

	fade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `0.5`;
	}
	
	unfade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `1.0`;
	}
	
	freeze() {
		if (this.isFrozen) return;
		this.wasEnabledBeforeFreeze = this.isEnabled;
		if (this.isEnabled) {
			this.ref.removeEventListener("click", this.onClick);
			this.isEnabled = false;
		}
		this.isFrozen = true;
	}
	
	unfreeze() {
		this.isEnabled = this.wasEnabledBeforeFreeze;
		if (this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
		}
		this.isFrozen = false;
	}
	
	deconstruct() {
		console.log("Control.deconstruct called", this.id);
		this.ref.removeEventListener("click", this.onClick);
	}
}

function dispenseControlFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashDispenseControl(ref, flasherRef, solveBiz) {
	ref.style.display = `none`;
	await wait(300);
	flasherRef.style.display = `block`;
	await wait(300);
	flasherRef.style.display = `none`;
	await wait(300);
	flasherRef.style.display = `block`;
	await wait(300);
	flasherRef.style.display = `none`;
	ref.style.display = `block`;
	dispenseControlFlashed(solveBiz)
}

class DispenseControl extends Control {
	constructor(id, onClick) {
		super(id, onClick);
		this.ref.style.display = `block`;
		this.flasherRef = document.querySelector(id + "Flasher");
		this.flasherRef.style.display = `none`;
	}
	
	flash(solveBiz) {
		flashDispenseControl(this.ref, this.flasherRef, solveBiz);		
	}

	deconstruct() {
		this.ref.removeEventListener("click", this.onClick);
		this.ref.style.display = `none`;
		this.flasherRef.style.display = `none`;
	}
}


/* -------- Solve -------- */

class SolveIO {
	constructor(controls, crossTick) {
	this.controls = controls;
	this.crossTick = crossTick;
	}

	disableAllControls() {
		for (let name in this.controls) {
			this.controls[name].disable();
			this.controls[name].fade();
		}
	}

	disableControls(controls) {
		for (let i in controls) {
			this.controls[controls[i]].disable();
			this.controls[controls[i]].fade();
		}
	}
	
	enableAllControls() {
		for (let name in this.controls) {
			this.controls[name].enable();
			this.controls[name].unfade();
		}
	}

	enableControls(controls) {
		for (let i in controls) {
			this.controls[controls[i]].enable();
			this.controls[controls[i]].unfade();
		}
	}
	
	enableAllControlsExcept(exceptions) {
		for (let name in this.controls) {
			if (!exceptions.includes(name)) {
				this.controls[name].enable();
				this.controls[name].unfade();
			}
			else {
				this.controls[name].disable();
				this.controls[name].fade();
			}
		}
	}
	
	freezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].freeze();
		}
	}
	
	unfreezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].unfreeze();
		}
	}

	flashDispenseControl(name, solveBiz) {
		this.controls[name].flash(solveBiz);
	}
		
	hideCrossTick() {
		this.crossTick.hide();
	}
	
	showTick(solveBiz) {
		this.crossTick.showTick(solveBiz);
	}
	
	showCross(solveBiz) {
		this.crossTick.showCross(solveBiz);
	}
	
	deconstruct() {
	}
}

class SolveBiz {	
	constructor(puzzle, dispensers, abstractMap, io) {
		this.puzzle = puzzle;
		this.dispensers = dispensers;
		this.abstractMap = abstractMap;
		this.io = io;
				
		for (let i = 1; i <= puzzle.numDispensers; i++) this.dispensers[i].refresh();

		const hintSpec = this.puzzle.hintSpec;
		this.hintCoord = new AbstractCoord(hintSpec.coord[0], hintSpec.coord[1]);
		this.hintDirection = hintSpec.direction;
		this.hintNumShows = 3;
		this.hintNumShowsRemaining = undefined;
		this.hintShowing = undefined;

		this.solutionNextIndex = undefined;
		
		this.callbackResolve = undefined;

		this.sleep();
	}
	
	sleep() {
		this.io.disableAllControls();
	}
	
	wake() {
		this.io.enableAllControlsExcept(["Reset", "Undispense"]);
		//this.io.enableAllControlsExcept(["Reset", "Undispense", "Information"]);
	}
	
	freeze() {
		this.io.freezeAllControls();
	}
	
	unfreeze() {
		this.io.unfreezeAllControls();
	}

	updateDispenseControls() {
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			if (this.dispensers[i].numItemsInContainer == 0) {
				this.io.disableControls(["Dispense" + String(i)]);
			}
			else {
				this.io.enableControls(["Dispense" + String(i)]);
			}
		}
	}

	review() {
		this.updateDispenseControls();
		if (this.abstractMap.getPathLength() == 0) {
			this.io.disableControls(["Reset", "Undispense"]);
		}
		else {
			this.io.enableControls(["Reset", "Undispense"]);
		}
		if (this.abstractMap.isPathComplete()) {
			this.io.disableControls(["Undispense"]);
			this.freeze();
			this.io.showTick(this);
		}
	}

	reset() {
		this.abstractMap.reset();
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			const dispenser = this.dispensers[i];
			dispenser.reset();
			dispenser.refresh();
		}
		this.io.hideCrossTick();
	}

	dispenseClicked(dispenserNum) {
		const dispenser = this.dispensers[dispenserNum];
		const dispenserItem = dispenser.peekAtItem();
		if (this.abstractMap.isAddLineValid(dispenserItem)) {
			const dispenserItemTaken = dispenser.takeItem();
			this.abstractMap.addLine(dispenserItemTaken);
			dispenser.refresh();
			this.review();
		}
		else {
			this.io.flashDispenseControl("Dispense" + String(dispenserNum), this);
		}
	}

	undispenseClicked() {
		const dispenserItemRemoved = this.abstractMap.removeLine();
		const dispenser = dispenserItemRemoved.dispenser;
		dispenser.replaceItem();
		dispenser.refresh();
		this.review();
	}

	resetClicked() {
		this.reset();
		this.io.enableAllControlsExcept(["Reset", "Undispense"]);
	}

	hintTimerExpired() {
		if (this.hintShowing) {
			this.abstractMap.removeTemporaryLine();
			this.hintShowing = false;
			this.hintNumShowsRemaining--;
			if (this.hintNumShowsRemaining == 0) {
				this.io.enableAllControlsExcept(["Reset", "Undispense"]);
				return;
			}
		}
		else {
			this.abstractMap.addTemporaryLine(this.hintCoord, this.hintDirection);
			this.hintShowing = true;
		}
		setTimeout(punterHintTimerExpired, 1000);
	}
	
	hintClicked() {
		this.io.disableAllControls();
		this.io.hideCrossTick();
		if (this.abstractMap.getPathLength() == 0) {
			this.abstractMap.addTemporaryLine(this.hintCoord, this.hintDirection);
			this.hintShowing = true;
			this.hintNumShowsRemaining = this.hintNumShows;
		}
		else {
			this.reset();
			this.hintShowing = false;
			this.hintNumShowsRemaining = this.hintNumShows;
		}
		setTimeout(punterHintTimerExpired, 1000);
	}
	
	hintWithCallbackTimerExpired() {
		if (this.hintShowing) {
			this.abstractMap.removeTemporaryLine();
			this.hintShowing = false;
			this.hintNumShowsRemaining--;
			if (this.hintNumShowsRemaining == 0) {
				this.io.enableAllControlsExcept(["Reset", "Undispense"]);
				this.callbackResolve();
				return;
			}
		}
		else {
			this.abstractMap.addTemporaryLine(this.hintCoord, this.hintDirection);
			this.hintShowing = true;			
		}
		setTimeout(demoHintTimerExpired, 1000);
	}

	hintWithCallback() {
		return new 	Promise((resolve, reject) => {
								this.io.disableAllControls();
								this.callbackResolve = resolve;
								this.abstractMap.addTemporaryLine(this.hintCoord, this.hintDirection);
								this.hintShowing = true;
								this.hintNumShowsRemaining = this.hintNumShows;
								setTimeout(demoHintTimerExpired, 1000);
							}
					);
	}

	solutionShowItem(dispenser) {
		const itemTaken = dispenser.takeItem();
		this.abstractMap.addLine(itemTaken);
		dispenser.refresh();
	}

	solutionTimerExpired() {
		const dispenserNum = this.puzzle.solutionSpec[this.solutionNextIndex];
		const dispenser = this.dispensers[dispenserNum];
		this.solutionShowItem(dispenser);
		this.solutionNextIndex++;
		if (this.solutionNextIndex == this.puzzle.solutionSpec.length) {
			this.io.enableControls(["Information", "Reset"]);
			return;
		}
		setTimeout(punterSolutionTimerExpired, 1000);
	}

	solutionClicked() {
		this.io.disableAllControls();
		this.io.hideCrossTick();
		this.solutionNextIndex = 0;
		if (this.abstractMap.getPathLength() == 0) {
			setTimeout(punterSolutionTimerExpired, 500);
		}
		else {
			this.reset();
			setTimeout(punterSolutionTimerExpired, 750);
		}
	}

	solutionWithCallbackTimerExpired() {
		const dispenserNum = this.puzzle.solutionSpec[this.solutionNextIndex];
		const dispenser = this.dispensers[dispenserNum];
		this.solutionShowItem(dispenser);
		this.solutionNextIndex++;
		if (this.solutionNextIndex == this.puzzle.solutionSpec.length) {
			this.io.enableControls(["Reset"]);
			this.callbackResolve();
			return;
		}
		setTimeout(demoSolutionTimerExpired, 1000);
	}

	solutionWithCallback() {
		return new 	Promise((resolve, reject) => {
								this.io.disableAllControls();
								this.callbackResolve = resolve;
								this.solutionShowItem(this.dispensers[this.puzzle.solutionSpec[0]]);
								this.solutionNextIndex = 1;
								setTimeout(demoSolutionTimerExpired, 1000);
							}
					);
	}
	
	deconstruct() {
		this.hintCoord.deconstruct();
	}
}

/* -------- Punter -------- */

function punterInformationOnClick() {
	mainWall.hide();
	infoWall.show();
	enableScrolling();
}

function punterUndispenseOnClick() {punter.solveBiz.undispenseClicked();};
function punterResetOnClick() {punter.solveBiz.resetClicked();};
function punterHintOnClick() {punter.solveBiz.hintClicked();};
function punterHintTimerExpired() {punter.solveBiz.hintTimerExpired();};
function punterSolutionOnClick() {punter.solveBiz.solutionClicked();};
function punterSolutionTimerExpired() {punter.solveBiz.solutionTimerExpired();};

let punterDispenseOnClicks = [undefined,
							  function() {punter.solveBiz.dispenseClicked(1)},
							  function() {punter.solveBiz.dispenseClicked(2)},
							  function() {punter.solveBiz.dispenseClicked(3)},
							  function() {punter.solveBiz.dispenseClicked(4)},
							  function() {punter.solveBiz.dispenseClicked(5)},
							 ];

class Punter {
	constructor(puzzle) {
		this.puzzle = puzzle;
		
		this.dispensers = [undefined];
		const itemIdRoot = "#mwdpdItem-" + String(puzzle.maxDispenserHeight) + String(puzzle.numDispensers) + "-";
		for (let i = 1; i <= puzzle.numDispensers; i++) {
			const itemIdRootPlus = itemIdRoot + String(i);
			this.dispensers[i] = new Dispenser(puzzle.dispenserFullSpec[i], itemIdRootPlus);
		}
		for (let i = 1; i <= puzzle.numDispensers; i++) this.dispensers[i].refresh();

		this.abstractMap = new AbstractMap(puzzle, "#mwdpt");

		this.controls = [];
		this.controls["Information"] = new Control("#mwdCtrlInformation", punterInformationOnClick, null);
		this.controls["Hint"] = new Control("#mwdCtrlHint", punterHintOnClick, null);
		this.controls["Solution"] = new Control("#mwdCtrlSolution", punterSolutionOnClick, null);
		this.controls["Reset"] = new Control("#mwdCtrlReset", punterResetOnClick, null);
		this.controls["Undispense"] = new Control("#mwdCtrlUndispense", punterUndispenseOnClick);

		const dispenseIdRoot = "#mwdCtrlDispense-" + String(puzzle.numDispensers);
		for (let i = 1; i <= puzzle.numDispensers; i++) {
			const dispenseId = dispenseIdRoot + String(i);
			this.controls["Dispense" + String(i)] = new DispenseControl(dispenseId, punterDispenseOnClicks[i]);
		}

		this.crossTick = new CrossTick("#mwCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.solveBiz = new SolveBiz(puzzle, this.dispensers, this.abstractMap, this.solveIO);
	}
	
	deconstruct() {
		console.log("Punter.deconstruct called");
		this.solveBiz.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		
		console.log(this.controls);		
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
		
		this.abstractMap.deconstruct();
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			this.dispensers[i].deconstruct();
		}
	}
}


/* -------- Demo -------- */

function demoHintTimerExpired() {demo.solveBiz.hintWithCallbackTimerExpired();};
function demoSolutionTimerExpired() {demo.solveBiz.solutionWithCallbackTimerExpired();}

class Demo {
	constructor() {
		const puzzleSpec = {
			number: 13,
			solveBy: "20 Feb",
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
		};
		this.puzzle = new Puzzle(puzzleSpec);

		this.dispensers = [undefined];
		const itemIdRoot = "#iwdpdItem-" + String(this.puzzle.maxDispenserHeight) + String(this.puzzle.numDispensers) + "-";;
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			const itemIdRootPlus = itemIdRoot + String(i);
			this.dispensers[i] = new Dispenser(this.puzzle.dispenserFullSpec[i], itemIdRootPlus);
		}

		this.abstractMap = new AbstractMap(this.puzzle, "#iwdpt");
		
		this.controls = [];
		this.controls["Information"] = new Control("#iwdCtrlInformation", null);
		this.controls["Hint"] = new Control("#iwdCtrlHint", null);
		this.controls["Solution"] = new Control("#iwdCtrlSolution", null);
		this.controls["Reset"] = new Control("#iwdCtrlReset", null);
		this.controls["Undispense"] = new Control("#iwdCtrlUndispense", null);
		this.controls["Dispense1"] = new DispenseControl("#iwdCtrlDispense-1", null);
		this.controls["Dispense2"] = new Control("#iwdCtrlDispense-2", null);
		this.controls["Dispense3"] = new Control("#iwdCtrlDispense-3", null);
		this.controls["Dispense4"] = new Control("#iwdCtrlDispense-4", null);

		this.crossTick = new CrossTick("#iwdCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.solveBiz = new SolveBiz(this.puzzle, this.dispensers, this.abstractMap, this.solveIO);
	}
	
	enter() {
		infoWall.controlBack.disable();
		infoWall.controlBack.fade();
		infoWall.controlDemo.disable();
		infoWall.controlDemo.fade();
		
		infoWall.separator2Ref.scrollIntoView({behavior:"smooth"});
		
		demoExecuteScript();
	}
	
	exit() {
		infoWall.controlBack.enable();
		infoWall.controlBack.unfade();
		infoWall.controlDemo.enable();
		infoWall.controlDemo.unfade();
		
		window.scrollTo({top:0, left:0, behavior:"smooth"});
	}
	
	deconstruct() {
		this.solveBiz.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			this.dispensers[i].deconstruct();
		}
		this.puzzle.deconstruct();
	}
}

const demoScript = [
	"Dispense1",
	"Pause",
	"Dispense2",
	"Pause",
	"Dispense3",
	"Pause",		
	"Pause",		
	"Undispense",
	"Pause",		
	"Undispense",
	"Pause",		
	"Undispense",
	"Pause",		
	"Pause",		
	"Dispense4",
	"Pause",		
	"Dispense3",
	"Pause",		
	"Dispense4",
	"Pause",		
	"Dispense4",
	"Pause",		
	"Dispense1",
	"Pause",		
	"Dispense2",
	"Pause",		
	"Dispense4",
	"Pause",		
	"Pause",		
	"Pause",		
	"Pause",		
	"Dispense1",
	"Pause",	
	"Pause",	
	"Pause",		
	"Pause",		
	"Undispense",
	"Pause",		
	"Undispense",
	"Pause",		
	"Dispense4",
	"Pause",		
	"Dispense2",
	"Pause",		
	"Dispense1",
	"Pause",		
	"Dispense1",
	"Pause",
	"Pause",
	"Pause",
	"Pause",
	"Reset",
	"Pause",
	"Pause",	
	"Hint",
	"Pause",
	"Pause",	
	"Solution"
];

function demoShowSpot(spotRef, opacity) {
	spotRef.style.display = `block`;
	spotRef.style.opacity = `${opacity}`;
	}
	
function demoHideSpot(spotRef) {
	spotRef.style.display = `none`;
	}

async function demoExecuteScript() {
	let spotRefLookUp = [];
	const iwdControls = ["Hint", "Solution", "Reset", "Undispense", "Dispense1", "Dispense2", "Dispense3", "Dispense4"]
	for (let control of iwdControls) spotRefLookUp[control] = document.querySelector("#iwdSpot" + control);
	for (let c = 1; c <= 4; c++) spotRefLookUp["Dispense" + String(c)] = document.querySelector("#iwdSpotDispense-" + String(c));
	
	const spotFadeSequence = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

	//waiting for smooth scroll to complete
	await wait(1000);
	disableScrolling();
	
	demo.solveBiz.wake();
	await wait(1000);
	for (let command of demoScript) {
		if (command === "Pause") {
			await wait(500);
			continue;
		}
		
		const control = command;
		const spotRef = spotRefLookUp[control];
		for (let opacity of spotFadeSequence) {
			demoShowSpot(spotRef, opacity);
			await wait(100);
		}
		
		switch(control) {
		case "Hint":
			await demo.solveBiz.hintWithCallback();
			break;
		case "Solution":
			await demo.solveBiz.solutionWithCallback();
			break;
		case "Reset":
			demo.solveBiz.resetClicked();
			break;
		case "Undispense":
			demo.solveBiz.undispenseClicked();
			break;
		case "Dispense1":
			demo.solveBiz.dispenseClicked(1);
			break;
		case "Dispense2":
			demo.solveBiz.dispenseClicked(2);
			break;
		case "Dispense3":
			demo.solveBiz.dispenseClicked(3);
			break;
		case "Dispense4":
			demo.solveBiz.dispenseClicked(4);
			break;
		}
		
		demoHideSpot(spotRef);
		await wait(1000);
	}
	
	await wait(1500);
	demo.solveBiz.reset();
	demo.solveBiz.sleep();	
	
	await wait(1000);
	enableScrolling();
	demo.exit();
}


/* -------- Configuration -------- */

let mainWall = undefined;
let punter = undefined;
let infoWall = undefined;
let demo = undefined;

function configure() {
	const punterPuzzle = new Puzzle(puzzleSpecs[0]);
	mainWall = new MainWall(mainWallSpec, punterPuzzle);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	demo = new Demo();	
}


function reconfigure(punterPuzzle) {
	demo.deconstruct();
	infoWall.deconstruct();
	punter.deconstruct();
	mainWall.deconstruct();
	mainWall = new MainWall(mainWallSpec, punterPuzzle);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	demo = new Demo();		
}


/* -------- Begin -------- */

const published = new Published();
configure();


/* -------- Preamble -------- */
/*
async function performPreamble() {
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	punter.solveBiz.unfreeze();
	disableScrolling();
}
*/

async function performPreamble() {
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;

	await wait(750);

	mainWall.hide();
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	//punter.solveBiz.unfreeze();
	punter.solveBiz.wake();
	disableScrolling();
}

infoWall.controlBack.freeze();
infoWall.controlDemo.freeze();
//punter.solveBiz.wake();
//punter.solveBiz.freeze();
performPreamble();


