import Container from "./layout/Container"

function Header() {
	return (
		<header className="border-o">
			<Container>
				<div className="flex justify-between items-center">
					<div className="border-o flex-1">
						left
					</div>
					<div className="border-o flex-1"> 
						right
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header