"use client";

import React, { useState } from "react";
import Canvas from "./components/Canvas";
import ShapeEditor from "./components/ShapeEditor";
import { Shape, ShapeNames } from "./types";
import {
	newCircle,
	newHollowRectangle,
	newLine,
	newRectangle,
	saveCircle,
	saveLine,
	saveRectangle,
} from "./functions";

const App: React.FC = () => {
	const [shapes, setShapes] = useState<Shape[]>([
		{
			type: "circle",
			x: -2,
			y: -2,
			color: "#FFFFFF",
			radius: 3,
			name: "Default Circle",
		},
	]);

	const [newType, setNewType] = useState<ShapeNames>("rectangle");
	const handleNewTypeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewType(e.target.value as ShapeNames);
	};

	const addShape = () => {
		let newShape;

		if (newType == "rectangle") newShape = newRectangle(shapes.length);
		else if (newType == "hollow-rectangle") newShape = newHollowRectangle(shapes.length);
		else if (newType == "line") newShape = newLine(shapes.length);
		else if (newType == "circle") newShape = newCircle(shapes.length);

		if (newShape == undefined) return;

		setShapes([...shapes, newShape]);
	};

	const exportToString = () => {
		let expString = "";

		for (const shape of shapes) {
			if (shape.type == "rectangle" || shape.type == "hollow-rectangle")
				expString += saveRectangle(shape, shape.type == "hollow-rectangle");
			if (shape.type == "line") expString += saveLine(shape);
			if (shape.type == "circle") expString += saveCircle(shape);
		}

		console.log(expString);
	};

	const updateShape = (index: number, updatedShape: Shape) => {
		const newShapes = shapes.slice();
		newShapes[index] = updatedShape;
		setShapes(newShapes);
	};

	const deleteShape = (index: number) => {
		setShapes(shapes.filter((_, i) => i !== index));
	};

	const moveUp = (index: number) => {
		if (index > 0) {
			const newShapes = [...shapes];
			[newShapes[index - 1], newShapes[index]] = [newShapes[index], newShapes[index - 1]];
			setShapes(newShapes);
		}
	};

	const moveDown = (index: number) => {
		if (index < shapes.length - 1) {
			const newShapes = [...shapes];
			[newShapes[index + 1], newShapes[index]] = [newShapes[index], newShapes[index + 1]];
			setShapes(newShapes);
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row gap-4 p-4">
			<div className="flex-1 flex justify-center items-center">
				<Canvas shapes={shapes} />
			</div>
			<div className="flex-1 p-4 rounded shadow-lg">
				<h2 className="text-lg font-bold mb-4">Shape Editor</h2>
				<div className="flex gap-2 items-center">
					<select
						value={newType}
						onChange={handleNewTypeSelected}
						className="p-2 border rounded"
					>
						<option value="rectangle">Rectangle</option>
						<option value="hollow-rectangle">Hollow Rectangle</option>
						<option value="line">Line</option>
						<option value="circle">Circle</option>
					</select>
					<button
						onClick={addShape}
						className="bg-blue-500 text-white p-2 rounded w-auto hover:bg-blue-600"
					>
						Add New Shape
					</button>
				</div>
				{shapes.map((shape, index) => (
					<ShapeEditor
						key={index}
						shape={shape}
						index={index}
						shapeCount={shapes.length}
						updateShape={updateShape}
						deleteShape={deleteShape}
						moveUp={moveUp}
						moveDown={moveDown}
					/>
				))}
				<div>
					<button
						onClick={exportToString}
						className="bg-blue-500 text-white p-2 rounded w-auto hover:bg-blue-600"
					>
						Export to String
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
