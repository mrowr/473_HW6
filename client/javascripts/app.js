//https://gist.github.com/ProfAvery/c5db1692c457c526601c#file-config-js
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

function showResults(score) {
	"use strict";

	var $output = $("<p>").html("Results:" + 
		"<br>Your choice: " + score.player + 
		"<br>Opponent's choice: " + score.server + 
		"<br><br>Outcome: " + score.outcome + 
		"<br><br>Wins: " + score.wins + 
		"<br>Losses: " + score.losses + 
		"<br>Ties: " + score.ties);

	return $output;
}

function getResults(response) {
	"use strict";

	var $result;

	$.getJSON(response, function(score) {
		$("main .results").empty();
		$result = showResults(score);
		$("main .results").append($result);
	});
}

var main = function () {
	"use strict";

	$("#rock").click(function () {
		getResults("/play/rock");
	});
	$("#paper").click(function () {
		getResults("/play/paper");
	});
	$("#scissors").click(function () {
		getResults("/play/scissors");
	});
	$("#spock").click(function () {
		getResults("/play/spock");
	});
	$("#lizard").click(function () {
		getResults("/play/lizard");
	});
};

$(document).ready(main);
/*
var main = function () {
	"use strict";

	var insertCountsIntoDOM = function (counts) {
		$("p").text("awesome: " + counts.awesome);
	};

	setInterval(function () {
		$.getJSON("/counts.json", insertCountsIntoDOM);
	}, 5000);

	$.getJSON("/counts.json", insertCountsIntoDOM);
};

$(document).ready(main);
*/