import fs from "fs"
import inquirer from "inquirer";

const handlgetlanguage = (file) => {
	inquirer
		.prompt([ // ask which language the user speaks
			{
				type: 'list',
				name: 'language',
				message: "What language do you speak?",
				choices: ["english", "french"] // gives the user options to pick from
			}
		])
		.then(response => {
			console.log(file[response.language.toLowerCase()].greetings[Math.floor(Math.random() * 3)])
			handlegethowtheuserisfeeling(file[response.language.toLowerCase()]) // calls the next function
		})
}

const handlegethowtheuserisfeeling = (responses) => {
	inquirer
		.prompt([ // asks how the user is feeling
			{
				type: "input",
				name: "howisuser",
				message: responses.howisuser.question // gets the question from json file (so it can get the question in both French and English)
			}
		])
		.then(response => { // handles the response
			console.log(responses.howisuser[response.howisuser])

			handlegettheusersname(responses) // calls the next function
		})
}

const handlegettheusersname = (responses) => { // the function that handles the name question
	inquirer
		.prompt([ // asks the user for their name
			{
				type: "input",
				name: "name",
				message: responses.name.question
			}
		])
		.then(response => { // handles the response
			let result = responses.name.response.replace("[insert name]", response.name)
			result = result.replace("[insert letter]", response.name[0])
			console.log(result) // console logs the result after formating the input into the strings
			handlegetage(responses)
		})
}

const handlegetage = (responses) => {
	inquirer
		.prompt([ // asks the user for their age
			{
				type: "input",
				name: "age",
				message: responses.age.question
			}
		])
		.then(response => { // hanldes the response from the user
			if (parseInt(response.age) > 35){ // if the person is old then say they look young
				console.log(responses.age.agegreaterthan35.replace("[insert age]", response.age))
			} else { // if the person is young then say 'good for you'
				console.log(responses.age.agelessthan35.replace("[insert age]", response.age))
			}
			console.log(responses.byes[0]) // says bye to the user

			handlecheckifprogramwantstostop()
		})
}

const handlecheckifprogramwantstostop = () => { // the function that handles whether the user wants to run the program again
	inquirer
		.prompt([ // asks the user if they want to run the program again
			{
				type: "list",
				name: "doprogramagain",
				message: "Do you want to run the program again?",
				choices: ["yes", "no"]
			}
		])
		.then(response => { // hanldes the response
			if (response.doprogramagain === "yes"){
				main(fileVariable) // if the user wants the program to run again the main function will be recalled
			} else {
				process.exit() // if no then the program stops
			}
		})
}

const main = (file) => {
	console.clear()
	handlgetlanguage(file) // runs the first function of the 'chain'
}

let fileVariable

fs.readFile('languages.json', (err, data) => { // gets the responses from the language.json file
    if (err) throw err; // checks for errors
    let file = JSON.parse(data);
	fileVariable = file
	main(file) // parses the responses into the main function
});