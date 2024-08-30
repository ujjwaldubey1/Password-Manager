import React, { useState } from "react"

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<nav className="py-4">
			<div className="myContainer flex justify-between items-center">
				<div className="logo font-bold text-xl">
					rem<span className="text-green-600">Pass</span>
				</div>
				{/* Desktop Menu */}
				<ul className="hidden md:flex space-x-6">
					<li>
						<a className="underlin hover:text-green-600 transition" href="#">
							Home
						</a>
					</li>
					<li>
						<a className="underlin hover:text-green-600 transition" href="#">
							About
						</a>
					</li>
					<li>
						<a className="underlin hover:text-green-600 transition" href="#">
							Contact
						</a>
					</li>
					<li>
						<a className="underlin hover:text-green-600 transition" href="#">
							Sign
						</a>
					</li>
				</ul>
				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-green-600 focus:outline-none">
						{/* Icon for mobile menu (hamburger) */}
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>
			</div>
			{/* Mobile Menu (Dropdown) */}
			{isOpen && (
				<ul className="md:hidden bg-gray-100 space-y-4 mt-4 px-4">
					<li>
						<a
							className=" block text-center hover:text-green-600 transition"
							href="#">
							Home
						</a>
					</li>
					<li>
						<a
							className=" block text-center hover:text-green-600 transition"
							href="#">
							About
						</a>
					</li>
					<li>
						<a
							className=" block text-center hover:text-green-600 transition"
							href="#">
							Contact
						</a>
					</li>
					<li>
						<a
							className="block text-center hover:text-green-600 transition"
							href="#">
							Sign
						</a>
					</li>
				</ul>
			)}
		</nav>
	)
}
