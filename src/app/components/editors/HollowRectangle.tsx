import React from "react";
import { HollowRectangle, Shape } from "@/app/types";

type HollowRectangleEditorProps = {
	shape: HollowRectangle;
	index: number;
	updateShape: (index: number, updatedShape: Shape) => void;
	deleteShape: (index: number) => void;
};

const HollowRectangleEditor: React.FC<HollowRectangleEditorProps> = ({
	shape,
	index,
	updateShape,
	deleteShape,
}) => {
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
			<label className="block mb-2">X:</label>
			<input
				type="number"
				name="x"
				value={shape.x}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Y:</label>
			<input
				type="number"
				name="y"
				value={shape.y}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Width:</label>
			<input
				type="number"
				name="width"
				value={shape.width || ""}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Height:</label>
			<input
				type="number"
				name="height"
				value={shape.height || ""}
				onChange={handleChange}
				className="mb-2 p-2 border rounded w-full"
			/>
			<label className="block mb-2">Thickness:</label>
			<input
				type="number"
				name="thickness"
				value={shape.thickness || ""}
				min={1}
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

export default HollowRectangleEditor;
