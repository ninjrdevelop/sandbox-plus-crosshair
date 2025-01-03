import { Rectangle, HollowRectangle, Line, Circle } from "./types";

export function newRectangle(num: number) {
	return {
		type: "rectangle",
		x: 0,
		y: 0,
		width: 100,
		height: 50,
		color: "#000000",
		thickness: 1,
		name: "Rectangle " + num,
	} as Rectangle;
}

export function newHollowRectangle(num: number) {
	return {
		type: "hollow-rectangle",
		x: 0,
		y: 0,
		width: 100,
		height: 50,
		color: "#000000",
		thickness: 1,
		name: num + ". Hollow Rectangle",
	} as HollowRectangle;
}

export function newLine(num: number) {
	return {
		type: "line",
		start_x: 0,
		start_y: 0,
		end_x: 5,
		end_y: 5,
		width: 100,
		height: 50,
		color: "#000000",
		thickness: 1,
		name: num + ". Line",
	} as Line;
}

export function newCircle(num: number) {
	return {
		type: "circle",
		x: 0,
		y: 0,
		radius: 4,
		color: "#000000",
		name: num + ". Circle",
	} as Circle;
}

function hexToRgb(hex: string): string {
	// Remove the # if present
	hex = hex.replace("#", "");

	// Parse the hex string into RGB components
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return `${r};${g};${b}`;
}

export function saveRectangle(shape: Rectangle | HollowRectangle, isHollow: boolean): string {
	let retVal = "(rect;";

	retVal += `${hexToRgb(shape.color.toString())};`; // Color
	retVal += `${shape.x};${shape.y};`; // X/Y
	retVal += `${shape.width};${shape.height};`; // Width/Height
	retVal += `${shape.thickness};`; // Thickness
	retVal += `${isHollow ? "0" : "1"})`;

	return retVal;
}

export function saveLine(shape: Line): string {
	let retVal = "(line;";

	retVal += `${hexToRgb(shape.color.toString())};`; // Color
	retVal += `${shape.start_x};${shape.start_y};`; // X/Y Start
	retVal += `${shape.end_x};${shape.end_y};`; // X/Y End
	retVal += `${shape.thickness})`;

	return retVal;
}

export function saveCircle(shape: Circle): string {
	let retVal = "(circle;";

	retVal += `${hexToRgb(shape.color.toString())};`; // Color
	retVal += `${shape.x};${shape.y};`; // X/Y
	retVal += `${shape.radius * 2};${shape.radius * 2}`; // Width/Height
	retVal += `)`;

	return retVal;
}
