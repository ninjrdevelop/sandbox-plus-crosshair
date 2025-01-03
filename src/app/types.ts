export type Rectangle = {
	type: "rectangle";
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	thickness: number;
	name: string;
};

export type HollowRectangle = {
	type: "hollow-rectangle";
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	thickness: number;
	name: string;
};

export type Line = {
	type: "line";
	start_x: number;
	start_y: number;
	end_x: number;
	end_y: number;
	color: string;
	thickness: number;
	name: string;
};

export type Circle = {
	type: "circle";
	x: number;
	y: number;
	radius: number;
	color: string;
	name: string;
};

export type Shape = Rectangle | HollowRectangle | Line | Circle;

export type ShapeNames = Shape["type"];
