import React, { useState, useEffect } from "react"
import { FaTrash } from "react-icons/fa" // Import the trash icon

export default function Manager() {
	const [showCurrPassword, setShowCurrPassword] = useState(false)
	const [showPrevPassword, setShowPrevPassword] = useState(false)
	const [siteURL, setSiteURL] = useState("")
	const [prevPassword, setPrevPassword] = useState("")
	const [currPassword, setCurrPassword] = useState("")
	const [storedPasswords, setStoredPasswords] = useState([])

	// Toggle visibility for current password
	const toggleCurrPassword = () => {
		setShowCurrPassword(!showCurrPassword)
	}

	// Toggle visibility for previous password
	const togglePrevPassword = () => {
		setShowPrevPassword(!showPrevPassword)
	}

	// Save password to localStorage and update the list
	const handleSave = () => {
		const newEntry = {
			siteURL,
			prevPassword,
			currPassword,
		}

		// Fetch existing entries or initialize an empty array
		const existingEntries = JSON.parse(localStorage.getItem("passwords")) || []
		existingEntries.push(newEntry)
		localStorage.setItem("passwords", JSON.stringify(existingEntries))

		// Update state to display the new entry
		setStoredPasswords(existingEntries)

		// Clear input fields
		setSiteURL("")
		setPrevPassword("")
		setCurrPassword("")
	}

	// Delete an entry by index
	const handleDelete = (index) => {
		// Remove entry from the list
		const updatedEntries = storedPasswords.filter((_, i) => i !== index)

		// Update localStorage and state
		localStorage.setItem("passwords", JSON.stringify(updatedEntries))
		setStoredPasswords(updatedEntries)
	}

	// Load saved passwords from localStorage when component mounts
	useEffect(() => {
		const existingEntries = JSON.parse(localStorage.getItem("passwords")) || []
		setStoredPasswords(existingEntries)
	}, [])

	return (
		<>
			{/* Background */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
			</div>

			{/* Container */}
			<div className="myContainer bg-slate-200 max-w-4xl mx-auto p-4 rounded-md shadow-lg">
				<p className="text-center text-lg font-semibold">Password Manager</p>

				{/* Input Form */}
				<div className="flex text-white flex-col pl-1">
					<input
						className="rounded-md px-3 my-4 text-black w-full"
						type="text"
						placeholder="Enter Site Name"
						value={siteURL}
						onChange={(e) => setSiteURL(e.target.value)}
					/>

					<div className="flex flex-col md:flex-row gap-4">
						{/* Previous Password Input */}
						<div className="relative w-full">
							<input
								className="text-black rounded-md px-3 my-4 w-full pr-10"
								type={showPrevPassword ? "text" : "password"}
								placeholder="Previous Password"
								value={prevPassword}
								onChange={(e) => setPrevPassword(e.target.value)}
							/>
							{/* Toggle Visibility */}
							<span
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
								onClick={togglePrevPassword}>
								{showPrevPassword ? "🙈" : "👁️"}
							</span>
						</div>

						{/* Current Password Input */}
						<div className="relative w-full">
							<input
								className="text-black rounded-md px-3 my-4 w-full pr-10"
								type={showCurrPassword ? "text" : "password"}
								placeholder="Current Password"
								value={currPassword}
								onChange={(e) => setCurrPassword(e.target.value)}
							/>
							{/* Toggle Visibility */}
							<span
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
								onClick={toggleCurrPassword}>
								{showCurrPassword ? "🙈" : "👁️"}
							</span>
						</div>
					</div>

					{/* Save Button */}
					<button
						className="bg-green-700 text-white py-2 px-4 rounded-md my-8 w-full md:w-auto"
						onClick={handleSave}>
						Save
					</button>
				</div>

				{/* Display stored passwords */}
				<div className="my-8">
					{storedPasswords.map((entry, index) => (
						<div
							key={index}
							className="relative p-4 bg-slate-200 rounded-md shadow-md mb-4 flex flex-col justify-between"
							style={{
								boxShadow: "8px 8px 15px #b1b1b1, -8px -8px 15px #ffffff", // Neumorphic shadow
							}}>
							{/* Delete Button */}
							<button
								className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-700"
								onClick={() => handleDelete(index)}
								style={{
									boxShadow: "3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff", // Neumorphic shadow for button
								}}>
								<FaTrash />
							</button>

							{/* Display Password Info */}
							<div>
								<p>
									<strong>Site Name:</strong> {entry.siteURL}
								</p>
								<p>
									<strong>Previous Password:</strong> {entry.prevPassword}
								</p>
								<p>
									<strong>Current Password:</strong> {entry.currPassword}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
