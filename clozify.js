/*
	This function is called on button click and pulls together the question and answers to generate
	Cloze code for Moodle.

	Clozify() will only pull in answers for the text boxes that
	have text in them.
*/

function clozify() {
	var currentStep = "";
	var clozeCode = "{1:MCVS:";
	var question = "";

	//var correctText = "#That's correct!";
	//var incorrectText = "#Sorry, that's incorrect.";
	var correctText = "";
	var incorrectText = "";

	//Go through each text field and add each section to the clozeCode

	//Start by adding question text
	if (document.getElementById("question").value != "") {
		question = htmlEscape(document.getElementById("question").value) + "<br />\r\n";
	}
	//Add answer text A if not empty
	if (document.getElementById("ansA").value != "") {
		//If A is the correct answer, add correct answer Cloze code, otherwise add incorrect answer code
		if (document.getElementById("ansAA").checked) {
			currentStep = "~%100%" + htmlEscape(document.getElementById("ansA").value) + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansA").value) + incorrectText;
		}
		clozeCode += currentStep;
	}
	//Add answer text B if not empty
	if (document.getElementById("ansB").value != "") {
		if (document.getElementById("ansBB").checked) {
			currentStep = "~%100%" + htmlEscape(document.getElementById("ansB").value) + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansB").value) + incorrectText;
		}
		clozeCode += currentStep;
	}
	//Add answer text C if not empty
	if (document.getElementById("ansC").value!= "") {
		if (document.getElementById("ansCC").checked) {
			currentStep = "~%100%" + htmlEscape(document.getElementById("ansC").value) + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansC").value) + incorrectText;
		}
		clozeCode += currentStep;
	}
	//Add answer text D if not empty
	if (document.getElementById("ansD").value != "") {
		if (document.getElementById("ansDD").checked) {
			currentStep = "~%100%" + htmlEscape(document.getElementById("ansD").value) + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansD").value) + incorrectText;
		}
		clozeCode += currentStep;
	}

	//Set Cloze code final value
	document.getElementById("clozecode").value = question + clozeCode + "}";
}


/*
	This function does the opposite of the clozify function. Given a
	Cloze question, it will deconstruct it into its original question & answers.
*/

function unclozify() {
	// Get Cloze code from output box
	var clozeCode = document.getElementById("clozecode").value;

	// Get question text first
	var pattern = new RegExp("(.*)<br \/>", "gm");
	var matches = pattern.exec(clozeCode);
	if (matches != null) {
		document.getElementById("question").value = matches[1];
	}

	// Get remaining answer text
	pattern = new RegExp("S:~(.*)}");
	var answers_tmp = pattern.exec(clozeCode);
	// Index 1 represents the capture group
	var answers = answers_tmp[1].split("~");

	// Array for answer boxes
	var letters = ['A', 'B', 'C', 'D'];

	// Loop through as many times as there are answers
	for (var i = 0; i <= (answers.length - 1); i++) {
		// Set document ID dynamically based on letters array
		var id = "ans" + letters[i];

		// Check if this answer is the correct answer
		if (answers[i].startsWith("%100%")) {
			// Set radio button
			document.getElementById(id + letters[i]).checked = true;
			// Set answer text and slice out "%100%" text
			document.getElementById(id).value = answers[i].slice(5, answers[i].length);
		} else {
			document.getElementById(id).value = answers[i];
		}
	}
}


/*
	This function is called on button click and clears the output textbox upon user confirmation.
*/

function clearAll() {
	if (confirm("Clear all text?")) {
		//Set the output text to blank
		document.getElementById("clozecode").value = "";

		//Set the input text to blank
		document.getElementById("question").value = "";
		document.getElementById("ansA").value = "";
		document.getElementById("ansB").value = "";
		document.getElementById("ansC").value = "";
		document.getElementById("ansD").value = "";
	}
}

/*
	Replaces all occurrences of reserved Cloze characters with their
	escaped equivalents. This will replace the following: #, ", /, }, \
*/

function htmlEscape(str) {
	return String(str)
	  .replace(/\\/g, '\\\\')
		.replace(/#/g, '\\#')
		.replace(/"/g, '&quot;')
		.replace(/(\w)\//g, '$1\\/')
		.replace(/}/g, '\\}');
}
