function showReflectsKnownRatesDateStr(lang)
{
	var elReflectsDate = document.getElementById("reflectsDateElement");
	if (elReflectsDate)
	{
		var reflectsKnownRatesDateStr = eval("reflectsKnownRatesDateStr_"+lang);
		elReflectsDate.innerHTML = reflectsKnownRatesDateStr;
	}
}

function addcommas(x) {
	var newstring="";
	x=x+"c"
	for (i=0 ; i<x.length-1 ; i++) {
		if ((x.length-i)%3 == 1  &  i != 0) {
			newstring = newstring + "," + x.substring(i,i+1);
		} else {
			newstring = newstring + x.substring(i,i+1);
	}	}
	return newstring;
}

function formatnumber(a,b) {
	if (b == 0) {
		a=a;
		if (a == 0) { return "0"; }
		else if (a/Math.abs(a) == 1) { return addcommas(Math.round(a)); }
		else { return "(" + addcommas(Math.round(-a)) + ")"; }
	} else {
				
		if (a == 0) { return "$0"; }
		else if (a/Math.abs(a) == 1) { return "$" + addcommas(Math.round(a)); }
		else { return "($" + addcommas(Math.round(-a)) + ")"; }		
		
	}	
}


////////////////////////////////////
//	formatWithDollarSign
//	Description: 	Adds a dollar sign in the proper spot depending on the language currently used.
//	Inputs:			amount - value to pre/append the dollar sign to 
////////////////////////////////////
function formatWithDollarSign(amount)
{
	switch(Globals.Utilities.getCurrentSiteLanguage())
		{
			case Globals.LanguageType.fr:
				return amount + "$";
			break;
			case Globals.LanguageType.en:
			default:
				return "$" + amount;
			break;
		}
}

function unformat(x)
{
	var newvalue = 0;
	for (i=0 ; i<x.length ; i++)
	{
		y = x.substring(i,i+1);
		if (y == '0' | y == '1' | y == '2' | y == '3' | y == '4' | y == '5' | y == '6' | y == '7' | y == '8' | y == '9')
		{
			newvalue = 10*newvalue + Number(x.substring(i,i+1));
		}
		else if (y == '.')
		{
			return (newvalue);
		}
	}
	return (newvalue);
}

function isnotint(a) {
	if ( (navigator.appName != "Netscape") && (parseInt(navigator.appVersion)<=3) ) {
		for (k=0 ; k<a.length ; k++) {
			if (a.substring(k,k+1) < "0" | a.substring(k,k+1) > "9") {
				if (a.substring(k,k+1) != "," & a.substring(k,k+1) != "$" & a.substring(k,k+1) != "%")
				return true;
	}	}	}
	return false;
}

function formatpercent(a) {
	var string = Math.round(a*10000)/100 + "00x";
	if (string.indexOf(".") == -1) { string = string.substring(0,string.length-3) + ".00x"; }
	string = string.substring(0,string.indexOf(".")+3) + "%";
	return string;
}

function formatpercentSimple(a) {
	return unformat(a) + "%"
}


function taxfromcharts(chart, a, b) {
	var rmaxlen = eval("range_max_"+chart+"[a].length");
	if (b <= 0) { return 0; }
	for (i=0 ; i<rmaxlen ; i++) { 
		var rmax = eval("range_max_"+chart+"[a][i]");
		var btax = eval("basic_tax_"+chart+"[a][i]");
		var rmin = eval("range_min_"+chart+"[a][i]");
		var itax = eval("incometax_"+chart+"[a][i]");
		if (b <= rmax) {
			return btax+(b-rmin)*itax;
		}
	}
	return btax+(b-rmin)*itax;
}

function ratefromcharts(chart, a, b) {
	var rminlen = eval("range_min_"+chart+"[a].length");
	for (i=0 ; i<rminlen ; i++) {
		var rmax = eval("range_max_"+chart+"[a][i]");
		var itax = eval("incometax_"+chart+"[a][i]");
		if (b <= rmax) {
			return itax;
	}	}
	return 0;
}

function capgainsfromcharts(chart, a, b) {
	var rminlen = eval("range_min_"+chart+"[a].length");
	for (i=0 ; i<rminlen ; i++) {
		var rmax = eval("range_max_"+chart+"[a][i]");
		var capg = eval("capgains_"+chart+"[a][i]");
		if (b <= rmax) {
			return capg;
	}	}
	return 0;
}

function elgdivratefromcharts(chart, a, b) {
	var rminlen = eval("range_min_"+chart+"[a].length");
	for (i=0 ; i<rminlen ; i++) {
		var rmax = eval("range_max_"+chart+"[a][i]");
		var divr = eval("elgdivrate_"+chart+"[a][i]");
		if (b <= rmax) {
			return divr;
	}	}
	return 0;
}


function othdivratefromcharts(chart, a, b) {
	var rminlen = eval("range_min_"+chart+"[a].length");
	for (i=0 ; i<rminlen ; i++) {
		var rmax = eval("range_max_"+chart+"[a][i]");
		var divr = eval("othdivrate_"+chart+"[a][i]");
		if (b <= rmax) {
			return divr;
	}	}
	return 0;
}


function divratefromcharts(chart, a, b) {
	var rminlen = eval("range_min_"+chart+"[a].length");
	for (i=0 ; i<rminlen ; i++) {
		var rmax = eval("range_max_"+chart+"[a][i]");
		var divr = eval("divrate_"+chart+"[a][i]");
		if (b <= rmax) {
			return divr;
	}	}
	return 0;
}
