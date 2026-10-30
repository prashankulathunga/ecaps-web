
function Container({children}: {children:any}) {

	return (
		<div className="w-full max-w-7xl mx-auto border-o">
			{children}
		</div>
	)
}

export default Container