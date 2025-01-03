import React from "react";
import { Shape, Line } from "@/app/types";

type LineEditorProps = {
	shape: Line;
	index: number;
	updateShape: (index: number, updatedShape: Shape) => void;
	deleteShape: (index: number) => void;
};

const LineEditor: React.FC<LineEditorProps> = ({ shape, index, updateShape, deleteShape }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let newVal;

		if (name == "name" || name == "color") newVal = value;
		else newVal = Number(value);

		updateShape(index, { ...shape, [name]: newVal });
	};

	return (
		<div className="p-4 border rounded shadow-md mb-4">
			<label className="block mb-2">Name:</label>
			<input
				type="text"
				name="name"
				value={shape.name}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">X1:</label>
			<input
				type="number"
				name="start_x"
				value={shape.start_x}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Y1:</label>
			<input
				type="number"
				name="start_y"
				value={shape.start_y}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">X2:</label>
			<input
				type="number"
				name="end_x"
				value={shape.end_x || ""}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Y2:</label>
			<input
				type="number"
				name="end_y"
				value={shape.end_y || ""}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Thickness:</label>
			<input
				type="number"
				name="thickness"
				value={shape.thickness || ""}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Color:</label>
			<input
				type="color"
				name="color"
				value={shape.color}
				onChange={handleChange}
				className="mb-4 p-2 border rounded w-full h-10"
			/>
			<button
				onClick={() => deleteShape(index)}
				className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600"
			>
				Delete
			</button>
		</div>
	);
};

export default LineEditor;
