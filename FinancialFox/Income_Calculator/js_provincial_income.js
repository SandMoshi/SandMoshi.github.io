/*

Copyright 2016 - www.FinancialFox.ca - Created by SandM

This is the Javacript and Jquery code for the provincial income app. All the scripting required should be located in just this file.

*/


//--------------------
  //This will make sure only 1 checkbox is selected (deselects others)
    $("input[name='paytype1']").change(function(){
      //Makes all the checkboxes into 1 group
      var group = "input[name='paytype1']";
      //If you select one, it deselects the others in the group
      if($(this).is(':checked')){
        $(group).not($(this)).attr("checked",false); //unchecks others  
      };
    });
  //----
    $("input[name='paytype2']").change(function(){
      //Makes all the checkboxes into 1 group
      var group = "input[name='paytype2']";
      //If you select one, it deselects the others in the group
      if($(this).is(':checked')){
        $(group).not($(this)).attr("checked",false); //unchecks others  
      };
    });
//--------------------
   //Initialize all the required variables
   $("#calculate").on("click", function() {
      var Province1;
      var Province2;
      var Income1;
      var Income2;
      var PayType1;
      var PayType2;
      var TotalTaxes1;
      var TotalTaxes2;
      var NetPay1;
      var NetPay2;
    //--------------------
    //Get the values from the fields
     Province1 = $("select[name=province1]").val();
     Province2 = $("select[name=province2]").val();
     Income1 = $("input[name=income1]").val();
     Income2 = $("input[name=income2]").val();
     PayType1 = $("input[name='paytype1']:checked").val();
     PayType2 = $("input[name=paytype2]:checked").val();
     TotalTaxes1 = $("output[name=taxes1]").val();
     TotalTaxes2 = $("output[name=taxes2]").val();
     NetPay1 = $("output[name=netincome1]").val();
     NetPay2 = $("output[name=netincome2]").val();
     

       console.log(Province2);
       console.log(Province1);
       console.log(Income1);
       console.log(PayType1);
       console.log(PayType2);
/*       console.log();
       console.log();*/     
    //--------------------
      //Make sure the required fields are filled
      //----- Same Province
		  /* if (Province1 == Province2){
			 swal({   title: "Provinces are the Same",   text: "You have selected the same province for each job offer. Your tax rate will be the same.",   type: "error",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Okay",   closeOnConfirm: true });
			 
			 throw new Error("Provinces Should not be the same");
		  };*/
      //----- Income
		  if (Income1 == 0 &&  Income2 == 0){
			 swal({   title: "Income Required",   text: "You are required to enter at least one income",   type: "error",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Okay",   closeOnConfirm: true });
			 
			 throw new Error("Both Income Inputs were blank");
		  };
      //----- Checkboxes
		  if (Income1 >0 && PayType1 == undefined){
				swal({   title: "Income Type Required",   
						   text: "Please select salary or hourly for each income entered.",   
						   type: "error",   
						   showCancelButton: false,   
						   confirmButtonColor: "#DD6B55",   confirmButtonText: "Okay",   
						   closeOnConfirm: true });
		  
			 throw new Error("Both Income Inputs were blank")}
	  
		  else if (Income2 > 0 &&  PayType2 == undefined){
				swal({   title: "Income Type Required",   
						text: "Please select salary or hourly for each income entered.",   
						type: "error",   
						showCancelButton: false,   
						confirmButtonColor: "#DD6B55",   
						confirmButtonText: "Okay",   
						closeOnConfirm: true });

				throw new Error("Both Income Inputs were blank")};
	 //--------------------
	  //Convert hourly wage to annual salary based on 40hr/wk fulltime
	  if (PayType1 == "Hourly") {
		 var HourlyIncome = Income1;
		 //Salary = Wage ($/h) * 40h/wk * 52 wk/year
		 Income1 = HourlyIncome * 40 * 52;
		 console.log(HourlyIncome + " $/h is " + Income1 + " $/year");
	  }
	  if (PayType2 == "Hourly") {
		 var HourlyIncome = Income2;
		 //Salary = Wage ($/h) * 40h/wk * 52 wk/year
		 Income2 = HourlyIncome * 40 * 52;
		 console.log(HourlyIncome + " $/h is " + Income2 + " $/year");
	  }
	 //--------------------
			// Setup the variables required for the calculations
				var PersonalExemption1;
            var PersonalExemption2;
//            var ON = [[],[]] ;
            var Provinces = {
              ON: [[0.0505,0.0915,0.1116,0.1216,0.1316],[41536,41539,66925,70000,220000]],
              AB: [[0.1,0.12,0.13,0.14,0.15],[125000,25000,50000,100000,300000]],
              BC: [[0.0506,0.077,0.105,0.1229,0.147],[38210,38211,11320,18802,106543]],
              MB: [[0.108,0.1275,0.174],[31000,36000,67000]],
              NB: [[0.0968,0.1482,0.1625,0.1784,0.21,0.2575],[40492,40493,50679,18336,100000,250000]],
              NL: [[0.077,0.125,0.133,0.143,0.153],[35148,35147,55205,50200,175700]],
              NS: [[0.0879,0.1495,0.1667,0.175,0.21],[29590,29590,33820,57000,150000]],
              PE: [[0.098,0.138,0.167],[31984,31985,63969]],
              QC: [[0.16,0.20,0.24,0.2575],[42390,42390,18370,103150]],
              SK: [[0.11,0.13,0.15],[44601,82829,127430]],
              NT: [[0.059,0.086,0.122,0.1405],[41011,41013,51329,133353]],
              NU: [[0.04,0.07,0.09,0.115],[43176,43175,54037,140388]],
              YT: [[0.064,0.09,0.109,0.128,0.15],[45282,45281,49825,359612,500000]],
            };
    
       console.log("Fifth Tax Level: " + Provinces["ON"][1][4]);
    
   //--------------------
     //     console.log()
     //Determine the province used
     console.log(Provinces);
     console.log(Provinces[Province1]);
     console.log(Provinces[Province1][1][4]);    
     console.log(Provinces[Province2]);
     console.log(Provinces[Province2][1][4]);
  //---------------------
    //Determine how many tax brackets the chosen province has then calculate tax
    if(Province1.match(/^(ON|YT|NL|NS|AB|BC)$/)){
     //These Provinces have 5 brackets
          var Bracket1 = Provinces[Province1][1][0];
          var Bracket2 = Bracket1 + Provinces[Province1][1][1];
          var Bracket3 = Bracket2 + Provinces[Province1][1][2];
          var Bracket4 = Bracket3 + Provinces[Province1][1][3];
          var Bracket5 = Provinces[Province1][1][4];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
          console.log("Bracket 4: " + Bracket4);
          console.log("Bracket 5: " + Bracket5);
     //Determine tax payable
        if (Income1 <= Bracket1){
           TotalTaxes1 = Income1 * Provinces[Province1][0][0];
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket2){
           TotalTaxes1 = ((Income1 - Bracket1)  * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket3){
           TotalTaxes1 = ((Income1 - Bracket2)  * Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket4){
           TotalTaxes1 = ((Income1 - Bracket3)  * Provinces[Province1][0][3]) + ((Bracket3 - Bracket2)* Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 > Bracket5){
           TotalTaxes1 = ((Income1 - Bracket4)  * Provinces[Province1][0][4]) + ((Bracket4 - Bracket3)* Provinces[Province1][0][3] ) + ((Bracket3 - Bracket2)* Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
    }
    else if(Province1.match(/^(NU|NT|QC)$/)) {
     //These provinces only have 4 brackets
          var Bracket1 = Provinces[Province1][1][0];
          var Bracket2 = Bracket1 + Provinces[Province1][1][1];
          var Bracket3 = Bracket2 + Provinces[Province1][1][2];
          var Bracket4 = Provinces[Province1][1][3];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
          console.log("Bracket 4: " + Bracket4);
     //Determine tax payable
        if (Income1 <= Bracket1){
           TotalTaxes1 = Income1 * Provinces[Province1][0][0];
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket2){
           TotalTaxes1 = ((Income1 - Bracket1)  * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket3){
           TotalTaxes1 = ((Income1 - Bracket2)  * Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 > Bracket4){
           TotalTaxes1 = ((Income1 - Bracket3)  * Provinces[Province1][0][3]) + ((Bracket3 - Bracket2)* Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
    }
    else if(Province1.match(/^(PE|MB|SK)$/)) {
     //These provinces only have 3 brackets
          var Bracket1 = Provinces[Province1][1][0];
          var Bracket2 = Bracket1 + Provinces[Province1][1][1];
          var Bracket3 = Provinces[Province1][1][2];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
     //Determine tax payable
        if (Income1 <= Bracket1){
           TotalTaxes1 = Income1 * Provinces[Province1][0][0];
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket2){
           TotalTaxes1 = ((Income1 - Bracket1)  * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 > Bracket3){
           TotalTaxes1 = ((Income1 - Bracket2)  * Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
    }
    else if(Province1.match(/^(NB)$/)){
     //These Provinces have 6 brackets
          var Bracket1 = Provinces[Province1][1][0];
          var Bracket2 = Bracket1 + Provinces[Province1][1][1];
          var Bracket3 = Bracket2 + Provinces[Province1][1][2];
          var Bracket4 = Bracket3 + Provinces[Province1][1][3];
          var Bracket5 = Bracket4 + Provinces[Province1][1][4];
          var Bracket6 = Provinces[Province1][1][5];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
          console.log("Bracket 4: " + Bracket4);
          console.log("Bracket 5: " + Bracket5);
          console.log("Bracket 6: " + Bracket6);
     //Determine tax payable
        if (Income1 <= Bracket1){
           TotalTaxes1 = Income1 * Provinces[Province1][0][0];
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket2){
           TotalTaxes1 = ((Income1 - Bracket1)  * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket3){
           TotalTaxes1 = ((Income1 - Bracket2)  * Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket4){
           TotalTaxes1 = ((Income1 - Bracket3)  * Provinces[Province1][0][3]) + ((Bracket3 - Bracket2)* Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 <= Bracket5){
           TotalTaxes1 = ((Income1 - Bracket4)  * Provinces[Province1][0][4]) + ((Bracket4 - Bracket3)* Provinces[Province1][0][3] ) + ((Bracket3 - Bracket2)* Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
        else if (Income1 > Bracket6){
           TotalTaxes1 = ((Income1 - Bracket5)  * Provinces[Province1][0][5]) +((Bracket5 - Bracket4)* Provinces[Province1][0][4] ) + ((Bracket4 - Bracket3)* Provinces[Province1][0][3] ) + ((Bracket3 - Bracket2)* Provinces[Province1][0][2]) +((Bracket2 - Bracket1) * Provinces[Province1][0][1]) + (Bracket1 * Provinces[Province1][0][0]);
           console.log("$" + TotalTaxes1);
        }
    }
    //--------------------
    // Repeat for Second Province
    //---------------------
    //Determine how many tax brackets the chosen province has then calculate tax
    if(Province2.match(/^(ON|YT|NL|NS|AB|BC)$/)){
     //These Provinces have 5 brackets
          var Bracket1 = Provinces[Province2][1][0];
          var Bracket2 = Bracket1 + Provinces[Province2][1][1];
          var Bracket3 = Bracket2 + Provinces[Province2][1][2];
          var Bracket4 = Bracket3 + Provinces[Province2][1][3];
          var Bracket5 = Provinces[Province2][1][4];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
          console.log("Bracket 4: " + Bracket4);
          console.log("Bracket 5: " + Bracket5);
     //Determine tax payable
        if (Income2 <= Bracket1){
           TotalTaxes2 = Income2 * Provinces[Province2][0][0];
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket2){
           TotalTaxes2 = ((Income2 - Bracket1)  * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket3){
           TotalTaxes2 = ((Income2 - Bracket2)  * Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket4){
           TotalTaxes2 = ((Income2 - Bracket3)  * Provinces[Province2][0][3]) + ((Bracket3 - Bracket2)* Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 > Bracket5){
           TotalTaxes2 = ((Income2 - Bracket4)  * Provinces[Province2][0][4]) + ((Bracket4 - Bracket3)* Provinces[Province2][0][3] ) + ((Bracket3 - Bracket2)* Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
    }
    else if(Province2.match(/^(NU|NT|QC)$/)) {
     //These provinces only have 4 brackets
          var Bracket1 = Provinces[Province2][1][0];
          var Bracket2 = Bracket1 + Provinces[Province2][1][1];
          var Bracket3 = Bracket2 + Provinces[Province2][1][2];
          var Bracket4 = Provinces[Province2][1][3];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
          console.log("Bracket 4: " + Bracket4);
     //Determine tax payable
        if (Income2 <= Bracket1){
           TotalTaxes2 = Income2 * Provinces[Province2][0][0];
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket2){
           TotalTaxes2 = ((Income2 - Bracket1)  * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket3){
           TotalTaxes2 = ((Income2 - Bracket2)  * Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 > Bracket4){
           TotalTaxes2 = ((Income2 - Bracket3)  * Provinces[Province2][0][3]) + ((Bracket3 - Bracket2)* Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
    }
    else if(Province2.match(/^(PE|MB|SK)$/)) {
     //These provinces only have 3 brackets
          var Bracket1 = Provinces[Province2][1][0];
          var Bracket2 = Bracket1 + Provinces[Province2][1][1];
          var Bracket3 = Provinces[Province2][1][2];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
     //Determine tax payable
        if (Income2 <= Bracket1){
           TotalTaxes2 = Income2 * Provinces[Province2][0][0];
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket2){
           TotalTaxes2 = ((Income2 - Bracket1)  * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 > Bracket3){
           TotalTaxes2 = ((Income2 - Bracket2)  * Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
    }
    else if(Province2.match(/^(NB)$/)){
     //These Provinces have 6 brackets
          var Bracket1 = Provinces[Province2][1][0];
          var Bracket2 = Bracket1 + Provinces[Province2][1][1];
          var Bracket3 = Bracket2 + Provinces[Province2][1][2];
          var Bracket4 = Bracket3 + Provinces[Province2][1][3];
          var Bracket5 = Bracket4 + Provinces[Province2][1][4];
          var Bracket6 = Provinces[Province2][1][5];

          console.log("Bracket 1: " + Bracket1);
          console.log("Bracket 2: " + Bracket2);
          console.log("Bracket 3: " + Bracket3);
          console.log("Bracket 4: " + Bracket4);
          console.log("Bracket 5: " + Bracket5);
          console.log("Bracket 6: " + Bracket6);
     //Determine tax payable
        if (Income2 <= Bracket1){
           TotalTaxes2 = Income2 * Provinces[Province2][0][0];
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket2){
           TotalTaxes2 = ((Income2 - Bracket1)  * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket3){
           TotalTaxes2 = ((Income2 - Bracket2)  * Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket4){
           TotalTaxes2 = ((Income2 - Bracket3)  * Provinces[Province2][0][3]) + ((Bracket3 - Bracket2)* Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 <= Bracket5){
           TotalTaxes2 = ((Income2 - Bracket4)  * Provinces[Province2][0][4]) + ((Bracket4 - Bracket3)* Provinces[Province2][0][3] ) + ((Bracket3 - Bracket2)* Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
        else if (Income2 > Bracket6){
           TotalTaxes2 = ((Income2 - Bracket5)  * Provinces[Province2][0][5]) +((Bracket5 - Bracket4)* Provinces[Province2][0][4] ) + ((Bracket4 - Bracket3)* Provinces[Province2][0][3] ) + ((Bracket3 - Bracket2)* Provinces[Province2][0][2]) +((Bracket2 - Bracket1) * Provinces[Province2][0][1]) + (Bracket1 * Provinces[Province2][0][0]);
           console.log("$" + TotalTaxes2);
        }
    }
    //--------------------
    
    // Find the net income
     NetPay1 = Income1 - TotalTaxes1;
     NetPay2 = Income2 - TotalTaxes2;
    
    // Round all the numbers
     NetPay1 = Math.round(NetPay1);
     NetPay2 = Math.round(NetPay2);
     TotalTaxes1 = Math.round(TotalTaxes1);
     TotalTaxes2 = Math.round(TotalTaxes2);
    
    // Determine which is bigger
    if (NetPay1 > NetPay2){
      var ProvinceName = $("select[name=province1]").find(":selected").text();
      var difference = NetPay1 - NetPay2;
      difference = commaSeparateNumber(difference);
      var winner = "The " + ProvinceName + " job pays " + difference + " more!"
      console.log(winner);
      $("#OutputMessage").text(winner);
    }
    else if (NetPay1 < NetPay2){
      var ProvinceName = $("select[name=province2]").find(":selected").text();
      var difference = NetPay2 - NetPay1;
      difference = commaSeparateNumber(difference);
      var winner = "The " + ProvinceName + " job pays " + difference + " more!"
      console.log(winner);
      $("#OutputMessage").text(winner);
    }
    else if (NetPay1 == NetPay2){
     $("#OutputMessage").text("Both Jobs Pay the Same!");
    }
    
    //Convert all the integers to currency strings (with $ and commas)
     NetPay1 = commaSeparateNumber(NetPay1);
     NetPay2 = commaSeparateNumber(NetPay2);
    
     TotalTaxes1 = commaSeparateNumber(TotalTaxes1);
     TotalTaxes2 = commaSeparateNumber(TotalTaxes2);
    //-------------------
    // Send data to the Output fields
    $("output[name='taxes1']").val(TotalTaxes1);
    $("output[name='taxes2']").val(TotalTaxes2);
    $("output[name='netincome1']").val(NetPay1);
    $("output[name='netincome2']").val(NetPay2);
    
});
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
	 
//--------------------
  //This will make the middle section appear once Calculate is clicked
  $("#calculate").on("click", function(){
    if ( $("#bottom").is(":hidden")){
        $("#bottom").slideDown("slow");
      if($(window).width() < 992){
        //do nothing to margin to of #window
        //Show which Job each of the "details" is for
        var ProvinceName1 = $("select[name=province1]").find(":selected").text();
        var ProvinceName2 = $("select[name=province2]").find(":selected").text();
        $("#job1_details").html(ProvinceName1);
        $("#job2_details").html(ProvinceName2);
      }
      else
		if ($(window).width() > 900){
			$("#window").css("margin-top","10vh");
		}
		if ($(window).height() < 900){
           $("#window").css("margin-top","5vh");
		}
    }
  });




//This will make the disclaimer popup
   document.getElementById("Disclaimer").onclick = function () {
       sweetAlert({title:"Disclaimer", text:"This is an unofficial calculator, it is the user's responsibility to ensure the calculations are accurate.\n\nThe user is responsible for confirming the accuracy of this program's results. It is the user's responsibility to verify the taxes they will owe with the CRA (Canada Revenue Agency) before making any decisions. This tool is meant to be used as an educational tool only. From time to time, this application may become outdated as the tax-laws change. It is the user's responsibilty to double check the numbers given by this tool.\n\nThis tool does not take into account rebates, grants, spousal income, etc.\n\nBy using this website and all the tools and information found within, the user agrees that FinancialFox.ca and it's operators are not responsible or liable for anything.\n\nCreated for www.financialfox.ca \u00A9 2016", allowOutsideClick: "true", allowEscapeKey:"true", showConfirmButton:"false"})
   };
   $("#Disclaimer").on("click", function(){
     if($(window).width() < 992){
        $(".sweet-alert").css({
          position : "absolute",
          top: 0,
          "margin-top": "10px"});
        $(".sweet-alert h2").css({
          margin: "0px 0px 10px 0px"
        });
      };
   });
//----------------------------