import React, { useState, useEffect } from "react"
import { FaTrash } from "react-icons/fa" // Import the trash icon

export default function Manager() {
	const [showCurrPassword, setShowCurrPassword] = useState(false)
	const [showPrevPassword, setShowPrevPassword] = useState(false)
	const [siteURL, setSiteURL] = useState("")
	const [prevPassword, setPrevPassword] = useState("")
	const [currPassword, setCurrPassword] = useState("")
	const [storedPasswords, setStoredPasswords] = useState([])

	const toggleCurrPassword = () => {
		setShowCurrPassword(!showCurrPassword)
	}

	const togglePrevPassword = () => {
		setShowPrevPassword(!showPrevPassword)
	}

	const handleSave = () => {
		const newEntry = {
			siteURL,
			prevPassword,
			currPassword,
		}

		// Save the new entry to local storage
		const existingEntries = JSON.parse(localStorage.getItem("passwords")) || []
		existingEntries.push(newEntry)
		localStorage.setItem("passwords", JSON.stringify(existingEntries))

		// Update state to show the new entry on the screen
		setStoredPasswords(existingEntries)

		// Clear input fields
		setSiteURL("")
		setPrevPassword("")
		setCurrPassword("")
	}

	const handleDelete = (index) => {
		// Remove the entry at the specified index
		const updatedEntries = storedPasswords.filter((_, i) => i !== index)

		// Update local storage and state
		localStorage.setItem("passwords", JSON.stringify(updatedEntries))
		setStoredPasswords(updatedEntries)
	}

	useEffect(() => {
		// Retrieve stored passwords on initial render
		const existingEntries = JSON.parse(localStorage.getItem("passwords")) || []
		setStoredPasswords(existingEntries)
	}, [])

	return (
		<>
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
			</div>

			<div className="myContainer bg-slate-200 max-w-4xl mx-auto p-4 rounded-md shadow-lg">
				<p className="text-center text-lg font-semibold">Password Manager</p>

				<div className="flex text-white flex-col pl-1">
					<input
						className="rounded-md px-3 my-4 text-black w-full"
						type="text"
						placeholder="Enter Site Name"
						value={siteURL}
						onChange={(e) => setSiteURL(e.target.value)}
					/>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative w-full">
							<input
								className="text-black rounded-md px-3 my-4 w-full pr-10"
								type={showPrevPassword ? "text" : "password"}
								placeholder="Previous Password"
								value={prevPassword}
								onChange={(e) => setPrevPassword(e.target.value)}
							/>
							<span
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
								onClick={togglePrevPassword}>
								{showPrevPassword ? "🙈" : "👁️"}
							</span>
						</div>
						<div className="relative w-full">
							<input
								className="text-black rounded-md px-3 my-4 w-full pr-10"
								type={showCurrPassword ? "text" : "password"}
								placeholder="Current Password"
								value={currPassword}
								onChange={(e) => setCurrPassword(e.target.value)}
							/>
							<span
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
								onClick={toggleCurrPassword}>
								{showCurrPassword ? "🙈" : "👁️"}
							</span>
						</div>
					</div>
					<button
						className="bg-green-700 text-white py-2 px-4 rounded-md my-8 w-full md:w-auto"
						onClick={handleSave}>
						Save
					</button>
				</div>

				{/* Display stored passwords with neumorphic design */}
				<div className="my-8">
					{storedPasswords.map((entry, index) => (
						<div
							key={index}
							className="relative p-4 bg-slate-200 rounded-md shadow-md mb-4 flex flex-col justify-between"
							style={{
								boxShadow: "6px 6px 12px #b8b9be, -6px -6px 12px #ffffff",
							}}>
							<button
								className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
								onClick={() => handleDelete(index)}>
								<FaTrash />
							</button>
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
