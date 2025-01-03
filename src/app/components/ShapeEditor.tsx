import React, { useState } from "react";
import { Shape } from "../types";
import RectangleEditor from "./editors/Rectangle";
import HollowRectangleEditor from "./editors/HollowRectangle";
import LineEditor from "./editors/Line";
import CircleEditor from "./editors/Circle";

type ShapeEditorProps = {
	shape: Shape;
	index: number;
	shapeCount: number;
	updateShape: (index: number, updatedShape: Shape) => void;
	deleteShape: (index: number) => void;
	moveUp: (index: number) => void;
	moveDown: (index: number) => void;
};

function capFirstLetter(str: string) {
	return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).replaceAll("-", " ");
}

const ShapeEditor: React.FC<ShapeEditorProps> = ({
	shape,
	index,
	shapeCount,
	updateShape,
	deleteShape,
	moveUp,
	moveDown,
}) => {
	const [collapsed, setCollapsed] = useState(false); // Track if the editor is collapsed or open

	const toggleCollapse = () => {
		setCollapsed(!collapsed); // Toggle collapsed state
	};

	const handleMoveUp = (e: { stopPropagation: () => void }) => {
		e.stopPropagation(); // Prevent the parent onClick from firing
		moveUp(index);
	};

	const handleMoveDown = (e: { stopPropagation: () => void }) => {
		e.stopPropagation(); // Prevent the parent onClick from firing
		moveDown(index);
	};

	return (
		<div className="border rounded p-4 mb-4">
			<div
				className="cursor-pointer bg-gray-200 p-2 rounded mb-2 flex justify-between items-center"
				onClick={toggleCollapse}
			>
				<h3 className="font-bold">
					{(collapsed ? "Show " : "Hide ") +
						`'${shape.name}' (${capFirstLetter(shape.type)}) Editor`}
				</h3>

				<div className="flex space-x-2">
					{index > 0 && (
						<button
							className="bg-gray-300 p-2 rounded hover:bg-gray-400"
							onClick={handleMoveUp}
						>
							<span className="text-xl">↑</span>
						</button>
					)}
					{index < shapeCount - 1 && (
						<button
							className="bg-gray-300 p-2 rounded hover:bg-gray-400"
							onClick={handleMoveDown}
						>
							<span className="text-xl">↓</span>
						</button>
					)}
				</div>
			</div>
			{!collapsed && shape.type == "rectangle" && (
				<RectangleEditor
					shape={shape}
					index={index}
					updateShape={updateShape}
					deleteShape={deleteShape}
				/>
			)}
			{!collapsed && shape.type == "hollow-rectangle" && (
				<HollowRectangleEditor
					shape={shape}
					index={index}
					updateShape={updateShape}
					deleteShape={deleteShape}
				/>
			)}
			{!collapsed && shape.type == "line" && (
				<LineEditor
					shape={shape}
					index={index}
					updateShape={updateShape}
					deleteShape={deleteShape}
				/>
			)}
			{!collapsed && shape.type == "circle" && (
				<CircleEditor
					shape={shape}
					index={index}
					updateShape={updateShape}
					deleteShape={deleteShape}
				/>
			)}
		</div>
	);
};

export default ShapeEditor;
