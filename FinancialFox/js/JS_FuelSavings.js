// JavaScript source code

//-------CURRENCY JQUERY PLUGIN----------------------------------------------
$(document).ready(function () {
    (function ($) {
        $.fn.currencyInput = function () {
            this.each(function () {
                var wrapper = $("<div class='currency-input' />");
                $(this).wrap(wrapper);
                $(this).before("<span class='currency-symbol'>$</span>");
                $(this).change(function () {
                    var min = parseFloat($(this).attr("min"));
                    var max = parseFloat($(this).attr("max"));
                    var value = this.valueAsNumber;
                    if (value < min)
                        value = min;
                    else if (value > max)
                        value = max;
                    $(this).val(value.toFixed(2));
                });
            });
        };
    })(jQuery);
});

$(document).ready(function () {
    $('input.currency').currencyInput();
});
//-----------------------------------------------------------------------------
$(document).ready(function () {
    $("#Unit_Selector").change(function(){
        //Initialize Variables and Arrays
        var Unit;                           //Stores which unit was selected
        var FuelEconomy = new Array(3);     //Creates a fueleconomy array with 3 entries
        var cost = new Array(9);            //Creates a total fuel cost array with 9 entries
        var savings = new Array(9);         //Creates a cost savings array with 9 entries
        var MaxMPG;                         //The least fuel efficient fuel ecomony listed (of the 3 cars)
        var distanceKM = [300, 1000, 2500]; //Array with the distances stored ***The distances are divided by 100 to account for L/100km -> L/km***
        var distanceMi = [15000, 50000, 150000]; //Array with the distances stored in Miles
        var distance = new Array(3);
        var max_tier1;
        var max_tier2;
        var max_tier3;
        var min_tier1;
        var min_tier2;
        var min_tier3;
        //----------------------------------

        //----------------------------------
        //Determine which Unit is chosen
        Unit = $("#Unit_Selector option:selected").val();
        //----------------------------------
        // If MPG is selected.......
        if (Unit == "MPG") {

            // Change the text of the instructions and labels
            $("#Step2B").text("Choose Fuel Price ($/Gal)");
            $("#Step5B").text("Fuel Economy (MPG)");
            $("#label_15k").text("15,000 Miles Driven");
            $("#label_50k").text("50,000 Miles Driven");
            $("#label_150k").text("150,000 Miles Driven");
        };
        //----------------------------------
        // If L/100KM is selected....
        if (Unit == "L/100KM") {

            // Change the text of the instructions and labels
            $("#Step2B").text("Choose Fuel Price ($/L)");
            $("#Step5B").text("Fuel Economy (L/100KM)");
            $("#label_15k").text("30,000 KM Driven");
            $("#label_50k").text("100,000 KM Driven");
            $("#label_150k").text("250,000 KM Driven");
        };
        //----------------------------------
    });
    //----------------------------------
    // Make sure the Fuel Economy goes to zero if it is left blank or has wrong values
    $(".Economy").blur(function () {
        if ($(this).val() =="")
        {
            $(this).val(0);
        }
    });
    //============When the BUTTON is clicked============
    $("#button_calc").click(function main() {
        //----------------------------------
        //Initialize Variables and Arrays
        var Unit;                           //Stores which unit was selected
        var gasprice = new Array(3);                       //Chosen fuel price
        var FuelEconomy = new Array(3);     //Creates a fueleconomy array with 3 entries
        var cost = new Array(9);            //Creates a total fuel cost array with 9 entries
        var cost_str = new Array(9);        //Array that will hold the cost in string format with a $ symbol
        var savings = new Array(9);         //Creates a cost savings array with 9 entries
        var MaxMPG;                         //The least fuel efficient fuel ecomony listed (of the 3 cars)
        var distanceKM = [30000, 100000, 250000]; //Array with the distances stored ***The distances are divided by 100 to account for L/100km -> L/km***
        var distanceMi = [15000, 50000, 150000]; //Array with the distances stored in Miles
        var distance;
        //----------------------------------
        //Determine which Unit is chosen
        Unit = $("#Unit_Selector option:selected").val();
        //----------------------------------
        //Grab input values
        //----- Grabs the gas price
        gasprice = $(".gasprice").map(function () {
            //Check to make sure it's a valid number
            if (gasprice <= 0) {           //makes sure the gas price makes sense
                sweetAlert({
                    title: "Gas Isn't Free!",
                    text: "Please enter a gas price above 0 cents.",
                    type: "error",
                });
                throw 'Gas Price Error';                       //exits the code
            }
            return $(this).val();                //This grabs the element value and .get() puts it into array
        }).get();
        console.log("The gas prices are...")   //Console
        console.log(gasprice[0])                     //Console
        console.log(gasprice[1])                     //Console
        console.log(gasprice[2])                     //
        //------ Get Fuel Economy values into Array
        FuelEconomy = $(".Economy").map(function () {
            //Check to make sure it's a valid number
            if ($(this).val() == '') {
                isNumber('error');
            }
            //---
            if ($(this).val() < 0) {             // Checks for negative 
                sweetAlert({                     // Messagebox
                    title: "Unacceptable Fuel Economy",
                    text: "Please use a fuel economy greater than zero.",
                    type: "error",
                });
                throw 'stop';                          //Code stops if error is present (if statement = satisfied)
            }
            return $(this).val();                //This grabs the element value and .get() puts it into array
        }).get();
        console.log("The Fuel Economy Values are...")   //Console
        console.log(FuelEconomy[0])                     //Console
        console.log(FuelEconomy[1])                     //Console
        console.log(FuelEconomy[2])                     //

        //==========================
        //clear all OUTPUT boxes (not INPUTS)
        $(".Cost").each(function (index, value) {
            $(this).val(0);
        });
        $(".Savings").each(function (index, value) {
            $(this).val(0);
        });
        //----------------------------------
        //Calculate for MPG

        if (Unit == "MPG") {

            //----------
            //Calculate Costs
            distance = distanceMi;
            for (var i = 0; i < 9; i++) {
                if (i < 3)                   //Calculate for only 15k Mi
                {
                    cost[i] = 1 / (FuelEconomy[i]) * gasprice[i] * distance[0];
                    console.log(cost[i])                     //Console
                }
                if (i < 6 & i > 2)           //Calculate for only 50k Mi
                {
                    cost[i] = 1 / (FuelEconomy[i - 3]) * gasprice[i-3]* distance[1];
                    console.log(cost[i])                     //Console
                }
                if (i < 9 & i > 5)           //Calculate for only 150k Mi
                {
                    cost[i] = 1 / (FuelEconomy[i - 6]) * gasprice[i-6] * distance[2];
                    console.log(cost[i])     //Console
                }

                if (cost[i] == Infinity) {   //Infinity occurs when the FuelEconomy is zero (blank) and the eqn divides by zero
                    cost[i] = 0;            //Leave any with no listed fuel economy as blank
                }
                //Round to nearest dollar
                cost_str [i] = '$' + cost[i].toFixed(0);      //Rounds to nearest dollar and adds $
                console.log(cost[i])                     //Console
            }
        };
        //----------------------------------
        //Calculate for L/100KM

        //----------
        //Calculate Costs

        if (Unit == "L/100KM") {
            distance = distanceKM;

            for (var i = 0; i < 9; i++) {
                if (i < 3)                   //Calculate for only 30k KM
                {
                    cost[i] = (FuelEconomy[i]) * gasprice[i] * distance[0] / 100;
                    console.log(cost[i])                     //Console
                }
                if (i < 6 & i > 2)           //Calculate for only 100k KM
                {
                    cost[i] = (FuelEconomy[i - 3]) * gasprice[i-3] * distance[1] /100;
                    console.log(cost[i])                     //Console
                }
                if (i < 9 & i > 5)           //Calculate for only 250k KM
                {
                    cost[i] =(FuelEconomy[i - 6]) * gasprice[i-6] * distance[2] /100;
                    console.log(cost[i])     //Console
                }

                if (cost[i] == Infinity) {   //Infinity occurs when the FuelEconomy is zero (blank) and the eqn divides by zero
                    cost[i] = "";            //Leave any with no listed fuel economy as blank
                }
                else {
                    //Round to nearest dollar
                    cost_str[i] = '$' + cost[i].toFixed(0);      //Rounds to nearest dollar and adds $
                    console.log(cost[i])                     //Console
                }
            }
        };

        //----------
        //Calculate Savings

        max_tier1 = Math.max(cost[0], cost[1], cost[2]);
        max_tier2 = Math.max(cost[3], cost[4], cost[5]);
        max_tier3 = Math.max(cost[6], cost[7], cost[8]);
        console.log("Tier 1 max =" + max_tier1); //console
        console.log("Tier 3 max =" + max_tier3); //console

        min_tier1 = Math.min(cost[0], cost[1], cost[2]);
        min_tier2 = Math.min(cost[3], cost[4], cost[5]);
        min_tier3 = Math.min(cost[6], cost[7], cost[8]);
        console.log("Tier 1 min =" + min_tier1); //console
        console.log("Tier 3 min =" + min_tier3); //console

        for (var i = 0; i < 9; i++) {
            if (i < 3) {
                savings[i] = max_tier1 - cost[i];        // Difference from biggest to largest
                if (cost[i] == 0) { savings[i] = 0; }  //Make sure that the cost isn't 0
                savings[i] = '$' + savings[i].toFixed(0);  //Adds $ and rounds to dollar
            }
            if (i > 2 & i < 6) {
                savings[i] = max_tier2 - cost[i];        // Difference from biggest to largest
                if (cost[i] == 0) { savings[i] = 0; }  //Make sure that the cost isn't 0
                savings[i] = '$' + savings[i].toFixed(0);  //Adds $ and rounds to dollar
            }
            if (i > 5 & i < 9) {
                savings[i] = max_tier3 - cost[i];        // Difference from biggest to largest
                if (cost[i] == 0) { savings[i] = 0; }  //Make sure that the cost isn't 0
                savings[i] = '$' + savings[i].toFixed(0);  //Adds $ and rounds to dollar
            }
        };

        //----------------------------------
        // Ouput values to cells
        $(".Cost").each(function (index, value) {
            $(this).val(cost_str[index]);
        });
        $(".Savings").each(function (index, value) {
            $(this).val(savings[index]);
        });
            //----------------------------------

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
        return "no_error";
    }
};


$(document).ready(function () {
    $("#Disclaimer").fancybox({
//        width: "90%",
    });
});