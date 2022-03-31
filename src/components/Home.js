import IndexGames from "./games/IndexGames"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<IndexGames msgAlert={props.msgAlert}/>
		</>
	)
}

export default Home
