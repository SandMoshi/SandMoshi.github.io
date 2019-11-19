// JavaScript source code
$(document).ready(function () {
    
    UpdateText(); //This will update the app text to show the proper current year 
  
  
    $("#calculate").click(function main() {
        //Initialize Variables and Arrays
        var DAY;
        var MONTH;
        var YEAR;
        var YEARint;
        var thisYear;
        var YSI;
        var Age;
        var first_year;
        var elig_years;
        var net_contributions = 0;
        var contributions = 0;
        var year_contribution = 0;
        var withdrawals = 0;
        var year_withdrawal = 0;
        var TFSA_Limit_Actual = 0;
        var Next_TFSA_Limit_Actual = 0;
        var YOB;
        var Age;
        var Birthdate;
        var BirthMonth; var BirthDay;
        var now;
        var NumError;
        var money_inputs = [contributions, withdrawals, year_contribution,year_withdrawal];

        //==========================
        //Get date values from Input BOXES
        Birthdate = new Date($("#birthdate").val());
                console.log("Birthdate: " + Birthdate);  //console
        now = new Date();
      
        BirthMonth = Birthdate.getMonth()+1;
        BirthDay = Birthdate.getDate();
                console.log("Birth Month is " + BirthMonth);
                console.log("Birth Day is " + BirthDay);
  
        MONTH = now.getMonth()+1;
                console.log("Current month is: " + MONTH);  //console
        DAY = now.getDate();
                console.log("Current date is: " + DAY);  //console
        thisYear = now.getFullYear();
               console.log("This year is: " + thisYear); //console
      
        YEAR = Birthdate.getFullYear();
                console.log("Birth Year:" + YEAR);  //console

        if (BirthMonth == "12" && BirthDay == "31"){
          BirthMonth = 1;
          BirthDay = 1;
          YEAR = YEAR + 1;
                console.log("Birth Year is " + YEAR);
        }
        if (Birthdate == "")
        {
            sweetAlert({
                title: "No Birthdate Selected!",
                text: "Please choose a birthdate.",
                type: "error",
            });
            return false;
        }
        else if (Birthdate == "Invalid Date")
        {
            sweetAlert({
                title: "Invalid Birthday!",
                text: "Please check your birthdate.",
                type: "error",
            });
            return false;
        }
       
        //==========================
        //Get contribution values from Input BOXES
        contributions = $('#ContributionsToDate').val();
        withdrawals = $('#WithdrawalsToDate').val();
        year_contribution = $('#ContributionsThisYear').val();
        year_withdrawal = $('#WithdrawalsThisYear').val();
            console.log("Contributions to date: " + contributions);  //console
            console.log("This years contributions: " + year_contribution);  //console
            console.log("This years withdrawals: " + year_withdrawal);  //console
        //==========================
        //Do some MATH
        net_contributions = contributions - withdrawals;
            console.log("Net Contributions to Date: " + net_contributions);  //console
        year_net_contributions = year_contribution - year_withdrawal;
            console.log("This Year's Net Contributions: " + year_net_contributions);  //console
        //----Calculate some time dependent variables
        YSI = thisYear - 2008; //Use 2008 beacuse this way it accounts for 2009 as a year you can contribute
        Age = thisYear - YEAR;
               console.log("YSI: " + YSI);  //console
               console.log("Age: " + Age);  //console

        var TFSA_Limit = 0;

        if (Age - YSI + 1 >= 18) //Already 18 years old at inception (will have max room)
        {
            elig_years = YSI; //Eligible in 18th year
            TFSA_Limit = (5000 * 4) + (5500 * 2) + 10000 + (5500 * (YSI - 7)); //Max TFSA Limit (Includes this Year)
        }
        else {
            elig_years = thisYear - (YEAR + 18) + 1; //Eligible in 18th year

            if (elig_years <= 0) //Too young to receive a TFSA
            {
                TFSA_Limit = 0;
                sweetAlert({
                    title: "Sorry, You are too young!",
                    text: "You must be turning 18 or older this year to have a TFSA account.",
                    type: "error",
                });
                return false;
            }
            else {
                first_year = thisYear - elig_years + 1; //First year you can contribute
                    console.log("First Year to contribute was: " + first_year);
                if (first_year > 2012 && first_year <2015) {
                    TFSA_Limit = 5500 * (2014 - first_year + 1) + 10000  + (5500 * (thisYear - 2015)) ; //Started at $5500 per year
                }
                else if (first_year == 2015) {
                    TFSA_Limit = 10000 + (5500 * (thisYear - 2015)); //$10000 per year 
                }
                else if (first_year > 2015) {
                    TFSA_Limit = (5500 * (thisYear - 2015)); //$10000 per year
                }
                else if (first_year > 2009 && first_year < 2013) {
                    TFSA_Limit = 10000 + 5500 * (thisYear - 2012 - 1) + 5000 * (2012 - first_year + 1); //Amount you can contribute (maximum)
                }
              }
            }   
        //---
        //Check to make sure numbers don't include symbols/letters
        NumError = isNumber(contributions);
        if (NumError == 'error') {
            return;
        }
        NumError = isNumber(withdrawals);
        if (NumError == 'error') {
            return;
        }
        NumError = isNumber(year_contribution);
        if (NumError == 'error') {
            return;
        }
        NumError = isNumber(year_withdrawal);
        if (NumError == 'error') {
            return;
        }
        //---
        //==========================
        // This checks to see if you've over contributed or have bad input values
        if (withdrawals > 0 & contributions == 0) {
            sweetAlert({
                title: "Unnacceptable Withdrawals!",
                text: "You cannot withdraw money when your contributions are zero.",
                type: "error",
            });
            return;
        }
        else if (net_contributions > TFSA_Limit) {
            sweetAlert({
                title: "Possible Overcontribution",
                text: "Your net contributions exceed your original TFSA limit. \nThis may indicate that you've over-contributed in the past. \nPlease check your numbers.",
                type: "warning",
            });
        }
        else if (withdrawals < 0 | contributions < 0) {
            sweetAlert({
                title: "Unacceptable Inputs",
                text: "You cannot have a negative contribution or withdrawal amount.\nPlease check your numbers.",
                type: "error",
            });
            return;
        }
        else if (withdrawals > contributions) {
			  alert ("withdraws are greater than deposits");
            sweetAlert({
                title: "Possible Over-Withdrawal!",
                text: "Your withdrawal amount exceeds your total contributions. \n\nThis may be a result of your contributions growing while in the TFSA which is normal. \n\nPlease check your numbers and click OK to continue.",
                type: "warning",
            });
        }
        else if (year_net_contributions > contributions) {
			   console.log("year net contributions are "+ year_net_contributions);
			   console.log("total net contributions are "+ net_contributions);
            sweetAlert({
                title: "Careful!",
                text: "Your contributions this year are more than your \ntotal net contributions. \n\nHowever, this is possible in certain situations. \nPlease check your numbers... \n\nContinue if they are correct.",
                type: "warning",
            });
        }
        else if (year_withdrawal > withdrawals) {
            sweetAlert({
                title: "Unacceptable Inputs",
                text: "Your withdrawal this year cannot be more than your \nwithdrawals to date.\nPlease check your numbers.",
                type: "error",
            });
            throw 'year_net_contributions > net_contributions';
        }
        //==========================
        //Do some MATH
        TFSA_Limit_Actual = TFSA_Limit - contributions + (withdrawals - year_withdrawal);
        if (elig_years > 0) {
           Next_TFSA_Limit_Actual = Number(TFSA_Limit_Actual) + Number(year_withdrawal) + Number(5500); // Your next year's limit
        }
        else
        {
            Next_TFSA_Limit_Actual = 0;
        }
        //==========================
        //Rounding and Formatting
        console.log(TFSA_Limit_Actual);  //console
        if (TFSA_Limit % 1 === 0){ /*Removes decimals if whole number*/
          TFSA_Limit = '$' + TFSA_Limit.toFixed(0); //Editing of initial TFSA limit
        }
        else{
        TFSA_Limit = '$' + TFSA_Limit.toFixed(2); //Editing of initial TFSA limit
        }
        //---------
        console.log(Next_TFSA_Limit_Actual);  //console
        if (TFSA_Limit_Actual % 1 === 0){  /*Removes decimals if whole number*/
          TFSA_Limit_Actual = '$' + TFSA_Limit_Actual.toFixed(0); //Editing of initial TFSA limit    
        }
        else {
          TFSA_Limit_Actual = '$' + TFSA_Limit_Actual.toFixed(2);           //Rounds to 2 decimals
        }
        //---------
        if (Next_TFSA_Limit_Actual % 1 === 0){ /*Removes decimals if whole number*/
          Next_TFSA_Limit_Actual = '$' + Next_TFSA_Limit_Actual.toFixed(0); //Editing of initial TFSA limit
        }
        else {
          Next_TFSA_Limit_Actual = '$' + Next_TFSA_Limit_Actual.toFixed(2); //Rounds to 2 decimals
        }
      
        //==========================
        //Output values to boxes
        $("#output_MaxTFSA").val(TFSA_Limit);
        $("#output_TFSAlimit").val(TFSA_Limit_Actual);
        $("#output_TFSAfuture").val(Next_TFSA_Limit_Actual);
        //==========================
        //==========================
        UpdateMessage(TFSA_Limit_Actual);
        DropDown();
    });
});

function isNumber(obj)  //Checks for non numeric characters the obj supplied
{
    if (obj.match(/[^.\d]/)) {
        sweetAlert({
            title: "Unacceptable Inputs",
            text: "Your number inputs cannot contain letters, symbols, or commas.\nPlease remove them.",
            type: "error",
        });
        return "error";
    }
};

//--------------------
//--------------------
//This function converts the number to currency formatting (commas)
  function commaSeparateNumber(val){
    console.log("Input number is: " + val);
     val = "$" + val.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    console.log("This number now looks like this: " + val);
    return val;
  }
//--------------------
//	 
function DropDown(){
    if ( $("#bottom").is(":hidden")){
        $("#bottom").slideDown("slow");
        $("#window").css("margin-top","11vh");
	  if ($(window).height() < 690){
			$("#window").css("margin-top","0px");
	   }
	  else{
			//This will re-center the window
	        $('#window').css('margin-top','60px'); //previously 11vh
	  }
    }
	
};

function UpdateText(){
          var now  = new Date();
          var thisYear = now.getFullYear();
          var nextYear = thisYear + 1;
          $("#thisyear1").text(thisYear + " TFSA Deposits:");
          $("#thisyear2").text(thisYear + " TFSA Withdrawals:");
          $("#thisyear3").text(thisYear + " Remaining Contribution Room:");
          $("#nextyear1").text(nextYear + " Remaining Contribution Room:");
   
};

function UpdateMessage(val){
  $("#outputmessage").text("You can contribute " + val + " more this year!");
}



//This will make the disclaimer popup
   document.getElementById("Disclaimer").onclick = function () {
       sweetAlert({title:"", text:"This is an unofficial calculator, it is the user's responsibility to ensure the calculations are accurate.\n\nThe user is responsible for confirming the accuracy of this program's results. It is the user's responsibility to verify the most up to date TFSA limits with the CRA (Canada Revenue Agency) before making any decisions. This tool is meant to be used as an educational tool only. From time to time, this application may become outdated as the years or laws change. It is the user's responsibilty to double check the numbers given by this tool.\n\nThis tool does not take into account overcontributions, fees, or any data not inputted.\n\nBy using this website and all the tools and information found within, the user agrees that FinancialFox.ca and it's operators are not responsible or liable for anything.\n\nCreated for www.financialfox.ca \u00A9 2016",allowOutsideClick: "true", allowEscapeKey:"true",})
   };
   document.getElementById("DisclaimerText").onclick = function () {
       sweetAlert({title:"", text:"This is an unofficial calculator, it is the user's responsibility to ensure the calculations are accurate.\n\nThe user is responsible for confirming the accuracy of this program's results. It is the user's responsibility to verify the most up to date TFSA limits with the CRA (Canada Revenue Agency) before making any decisions. This tool is meant to be used as an educational tool only. From time to time, this application may become outdated as the years or laws change. It is the user's responsibilty to double check the numbers given by this tool.\n\nThis tool does not take into account overcontributions, fees, or any data not inputted.\n\nBy using this website and all the tools and information found within, the user agrees that FinancialFox.ca and it's operators are not responsible or liable for anything.\n\nCreated for www.financialfox.ca \u00A9 2016", allowOutsideClick: "true", allowEscapeKey:"true",})
   };
//----------------------------
