import React, { useState } from 'react'
import Heading from './Heading.jsx'


function App(){

	const [bizNames, setBizNames] = useState('click below to get a business name!')

	function getRandoNum(min, max){
		max = max + 1
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	async function generateName(){
		setBizNames('Loading...')

		let and_sign = getRandoNum(0, 1)
		if (and_sign == 0){
			and_sign = "+"
		} else {
			and_sign = "&"
		}

		let syllables_word1 = getRandoNum(1,2)
		let syllables_word2

		if (syllables_word1 == 1){
			syllables_word2 = getRandoNum(1,2)
		} else {
			syllables_word2 = 1
		}

		let word1
		let word2

		fetch('https://random-word-api.herokuapp.com/word?number=6')
		.then(res => res.json())
		.then(async(randomwords) => {

			let topics = `${randomwords[0]},${randomwords[1]},poop,${randomwords[2]},fart}`

			const response = await fetch(`https://api.datamuse.com/words?topics=${topics}&max=200&md=ps`)
			const data = await response.json()
			

			topics = `${randomwords[3]},sludge,${randomwords[4]},${randomwords[5]},pee}`

			const response2 = await fetch(`https://api.datamuse.com/words?topics=${topics}&max=200&md=ps`)
			const data2 = await response2.json()
			

			async function findSingleWord(data, syllables){
				for(let i = 0; i<data.length; i++){
					if (data[i].numSyllables == syllables && data[i].tags.includes('n')){
						return data[i].word
					}
				}
			}

			word1 = await findSingleWord(data, syllables_word1)
			word2 = await findSingleWord(data2, syllables_word2)

			setBizNames(word1 + " " + and_sign + " " + word2)
		})
	}

	function BizName(props){
		if (bizNames == 'click below to get a business name!'){
			return <>
				<div className="biztextcontainer">
					<div>
						<p>{props.bizNames}</p>
					</div>
				</div>
			</>
		} else if (bizNames == 'Loading...'){
			return <>
				<div className="loadingcontainer">
					<div className="loadingbox">
						
						<div className="spinner">
							<div className="double-bounce1"></div>
							<div className="double-bounce2"></div>
						</div>
					</div>
				</div>
			</>
		} else {
			return <>
				<div className="namegeneratedcontainer">
					<div>
						<p>{props.bizNames}</p>
					</div>
				</div>
			</>
		}
	}

	return (<>
		<Heading/>
		<BizName bizNames={bizNames} />
		<div className="buttoncontainer">
			<button onClick={generateName}>Generate Name!</button>
		</div>
		
	</>)
}

export default App;
