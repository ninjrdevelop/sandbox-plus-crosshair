import React from "react";

type CopySpanProps = {
	text: string;
	setExportString: (str: string) => void;
};

const CopySpan: React.FC<CopySpanProps> = ({ text, setExportString }) => {
	const handleCopy = () => {
		navigator.clipboard
			.writeText(text) // Copy the text to clipboard
			.then(() => {
				setExportString("");
				alert("Copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	return (
		<span onClick={handleCopy} className="cursor-pointer text-blue-500 underline">
			{text}
		</span>
	);
};

export default CopySpan;
