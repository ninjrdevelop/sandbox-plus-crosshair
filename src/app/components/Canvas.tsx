import React, { useEffect, useRef, useState } from "react";
import { Shape } from "../types";

type CanvasProps = {
	shapes: Shape[];
};

const images = ["images/bricks.jpg", "images/grass.jpg", "images/pavement.jpg"];

const Canvas: React.FC<CanvasProps> = ({ shapes }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [backgroundImage, setBackgroundImage] = useState<string>("images/bricks.jpg");

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const canvasCenterX = canvas.width / 2;
		const canvasCenterY = canvas.height / 2;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw background image if available
		if (backgroundImage) {
			const img = new Image();
			img.src = backgroundImage;
			img.onload = () => {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				shapes.forEach((shape) => {
					ctx.beginPath();
					ctx.fillStyle = shape.color;
					ctx.strokeStyle = shape.color;
					if (shape.type === "rectangle") {
						ctx.fillRect(
							canvasCenterX + shape.x - shape.width / 2,
							canvasCenterY + shape.y - shape.height / 2,
							shape.width,
							shape.height
						);
					} else if (shape.type === "circle") {
						ctx.arc(
							canvasCenterX + shape.x - shape.radius / 2,
							canvasCenterY + shape.y - shape.radius / 2,
							shape.radius,
							0,
							Math.PI * 2
						);
						ctx.fill();
					} else if (shape.type === "hollow-rectangle") {
						ctx.lineWidth = shape.thickness;
						// ctx.strokeRect(
						// 	canvasCenterX + shape.x - shape.width / 2,
						// 	canvasCenterY + shape.y - shape.height / 2,
						// 	shape.width,
						// 	shape.height
						// );

						ctx.moveTo(canvasCenterX + shape.x, canvasCenterY + shape.y);
						ctx.lineTo(canvasCenterX + shape.x + shape.width, canvasCenterY + shape.y);
						ctx.lineTo(
							canvasCenterX + shape.x + shape.width,
							canvasCenterY + shape.y + shape.height
						);
						ctx.lineTo(canvasCenterX + shape.x, canvasCenterY + shape.y + shape.height);
						ctx.lineTo(canvasCenterX + shape.x, canvasCenterY + shape.y);
						ctx.stroke();
					} else if (shape.type === "line") {
						ctx.lineWidth = shape.thickness;
						ctx.moveTo(canvasCenterX + shape.start_x, canvasCenterY + shape.start_y);
						ctx.lineTo(canvasCenterX + shape.end_x, canvasCenterY + shape.end_y);
						ctx.stroke();
					}
					ctx.closePath();
				});
			};
		}
	}, [backgroundImage, shapes]);

	return (
		<div>
			<div>
				{images.map((name) => (
					<button
						onClick={() => setBackgroundImage(name)}
						className={`${
							backgroundImage == name ? "bg-blue-700" : "bg-blue-500"
						} text-white p-2 ml-1 w-auto hover:bg-blue-600`}
						key={name}
					>
						{name.replaceAll("images/", "").replaceAll(".jpg", "")}
					</button>
				))}
			</div>
			<canvas ref={canvasRef} width={500} height={500} className="border shadow-lg" />
		</div>
	);
};

export default Canvas;
