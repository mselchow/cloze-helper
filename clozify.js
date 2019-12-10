/*
	This function is called on button click and pulls together the question and answers to generate
	Cloze code for Moodle.

	Clozify() will only pull in answers for the text boxes that
	have text in them.
*/

function clozify() {
	//Sets up the initial Cloze code
	var initialClozeCode = "{1:MCVS:";

	var currentStep = "";
	var clozeCode = "";
	var question = "";

	//Go through each text field and add each section to the clozeCode
	if (document.getElementById("question").value != "") {
		question = htmlEscape(document.getElementById("question").value) + "<br />";
	}
	if (document.getElementById("ansA").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 2</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("ansA").value) + '\n</div>\n';
		clozeCode += currentStep;
	}
	if (document.getElementById("ansB").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 3</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("ansB").value) + '\n</div>\n';
		clozeCode += currentStep;
	}
	if (document.getElementById("ansC").value!= "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 4</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("ansC").value) + '\n</div>\n';
		clozeCode += currentStep;
	}
	if (document.getElementById("ansD").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 5</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("ansD").value) + '\n</div>\n';
		clozeCode += currentStep;
	}

	//Set Cloze code final value
	document.getElementById("clozecode").value = question + initialClozeCode + clozeCode + "}";
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
	Replaces all occurrences of common characters with their HTML-friendly
	equivalents. This will replace the following: <, >, -.
*/

function htmlEscape(str) {
	return String(str);
		//.replace(/</g, '&lt;')
		//.replace(/>/g, '&gt;')
		//.replace(/-/g, '&minus;');
}
