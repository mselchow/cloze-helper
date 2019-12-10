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
			currentStep = "%100%" + htmlEscape(document.getElementById("ansA").value) + "#" + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansA").value) + "#" + incorrectText;
		}
		clozeCode += currentStep;
	}
	//Add answer text B if not empty
	if (document.getElementById("ansB").value != "") {
		if (document.getElementById("ansBB").checked) {
			currentStep = "%100%" + htmlEscape(document.getElementById("ansB").value) + "#" + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansB").value) + "#" + incorrectText;
		}
		clozeCode += currentStep;
	}
	//Add answer text C if not empty
	if (document.getElementById("ansC").value!= "") {
		if (document.getElementById("ansCC").checked) {
			currentStep = "%100%" + htmlEscape(document.getElementById("ansC").value) + "#" + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansC").value) + "#" + incorrectText;
		}
		clozeCode += currentStep;
	}
	//Add answer text D if not empty
	if (document.getElementById("ansD").value != "") {
		if (document.getElementById("ansDD").checked) {
			currentStep = "%100%" + htmlEscape(document.getElementById("ansD").value) + "#" + correctText;
		} else {
			currentStep = "~" + htmlEscape(document.getElementById("ansD").value) + "#" + incorrectText;
		}
		clozeCode += currentStep;
	}

	//Set Cloze code final value
	document.getElementById("clozecode").value = question + clozeCode + "}";
}


/*
	This function does the opposite of the remediate function. Given a set of
	remediation inputs, it will deconstruct it into its original steps.
*/

function unclozify() {
	// Gets the remediation from whichever field is not empty
	var remediation = (document.getElementById("correct").value == "") ? document.getElementById("incorrect").value : document.getElementById("correct").value;

	// Loop through for all 5 step textboxes
	for (var i = 1; i <= 5; i++) {
		// Generate a dynamic regex with i
		var pattern = new RegExp("Step " + i + "<\\/a><\\/h3>\\n?<div>\\n?([^]*?)<\\/div>", "gm");

		// Run the expression for a match
		var matches = pattern.exec(remediation);

		// If match found, update the right element using a dynamic id
		var id = "step" + i;
		if (matches != null) {
			document.getElementById(id).value = matches[1];
		}
	}
}


/*
	This function is called on button click and clears the output textbox.
*/

function clearAll() {
	//Set the output text to blank
	document.getElementById("clozecode").value = "";

	//Set the input text to blank
	document.getElementById("question").value = "";
	document.getElementById("ansA").value = "";
	document.getElementById("ansB").value = "";
	document.getElementById("ansC").value = "";
	document.getElementById("ansD").value = "";
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
		.replace(/\//g, '\\/')
		.replace(/}/g, '\\}');
}
