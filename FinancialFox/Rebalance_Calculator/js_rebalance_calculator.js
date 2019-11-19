// JavaScript source code
$(document).ready(function () {

//========== PAGE CONTROLS ==============
	var page = 1 //Set the page to 1
	var keyPressAllowed = true;
	localStorage.setItem("keyPressAllowed",keyPressAllowed);
   console.log("On initialization the page number is: " + page);
	
	$("#continue , #calculate").click(function(){
        console.log("Continue was clicked, the page when clicked is: " + page);
		  if (page === 1){
			CreatePage2(); //Number of Items
		}
        if (page === 2){
            var goToNextPage = CheckRequired(2);
            if( goToNextPage == 0){
                //do nothing 
            }
            else{
                CreatePage3(); //Target allocation (%)           
            }
        }
        if (page === 3){           
            var FilledBoolean = CheckRequired(3);
          
            var PercentBoolean = StorePercents(); //Grab the percents and store them and check for errors
            
            goToNextPage = FilledBoolean * PercentBoolean;
            console.log("FilledBoolean:" + FilledBoolean + " AND PercentBoolean:" + PercentBoolean);
            console.log("goToNextPage: " + goToNextPage );
            
            if( goToNextPage == 0){
                //do nothing 
            }
            else{
                CreatePage4(); //Current values
            }
        }
        if (page === 4){
          //For now do nothing since page 5 is not item dependent
            var FilledBoolean = CheckRequired(4); //Make sure required fields are filled
				var ValuesBoolean = StoreValues(); //Grabs the item values, stores them and checks for errors
				
				goToNextPage = FilledBoolean * ValuesBoolean;
            console.log("FilledBoolean:" + FilledBoolean + " AND ValuesBoolean:" + ValuesBoolean);
            console.log("goToNextPage: " + goToNextPage );
				
            if( goToNextPage == 0){
                //do nothing since there is an error
            }
            else{ 
					CreatePage5(); //Calculate Button
				}
        	}
        if (page === 5){
				var FilledBoolean = CheckRequired(5);
				var AddedBoolean = StoreAdded();
				
				goToNextPage = FilledBoolean * AddedBoolean;
				
            if ( goToNextPage == 0 ){
					//do nothing since there is an error
				}
				else{
					 CreatePage6(); //Outputs
				}
		  	}
		  if (page === 6){
			  //Do nothing because there is no page 7
			  return;
		  } 
      if (goToNextPage != 0){
		var oldpage = page; //store the current page number
        console.log("var oldpage = " + oldpage);
		page += 1; //Increase page number
        
		TurnPage(oldpage, page); //Run the function that chances the page

      }
	});
//----------------------------
function TurnPage(oldpage, nextpage ){
	var pageIdOld = "#page" + oldpage; //create ID that will be used to call the page
	var pageId = "#page" + nextpage;
	
	$(pageIdOld).fadeOut("400", function(){
		$(pageId).fadeIn("400", function(){
			 $(pageId + ' input[type!=hidden]:first').focus();
			 var keyPressAllowed = true;
			 localStorage.setItem("keyPressAllowed",keyPressAllowed);
		});
	});
};
//----------------------------
function CheckRequired(pagenum){ //This checks to make sure all required inputs are filled
  var pagename = "#page" + pagenum;
  console.log(pagename);
  
  var reqlength = $(pagename + ' .required').length;
    //console.log(reqlength); //This displays how many items had required values in console
  var value = $(pagename + ' .required').filter(function () {
        return this.value != '';
    });

  if (value.length>=0 && (value.length !== reqlength)) {
        alert('Please fill out all required fields.');
        return false;
        //TODO: Add code that stops it from going to next page
    } else {
        console.log('Everything on page ' + pagenum + ' has a value.');
        return true;
    }
  return goToNextPage; 
};
//----------------------------
function CreatePage2(){
	//Determine number of items
	var items = $("#itemcounter").val();
	for (i=1; i <= items; i++){
		var idname = "item_name" + i;
		var DOMcode = "<input id=" + idname + " type=\"text\" class=\"itemname required\" placeholder=\"Name of Item " + i + "\" title=\"Give this item a nickname.\">";
		$(DOMcode).appendTo("#page2");
	};
	//If too many items, show the scroll message
	var totalHeight = 0;
	var pageHeight  = $("div .page:visible").outerHeight();
	$("div:visible fieldset input, div:visible fieldset output").each(function(){
    totalHeight = totalHeight + $(this).outerHeight(true); 
	});
	if (totalHeight >= pageHeight + 20){ 
		$("#scrollicon").css({"display":"block","position": "absolute", "bottom": "70px", "right": "35px", "color": "red"});	
	}
	//------------------------------------------
    return;
};
//----------------------------
function CreatePage3(){
  //Determine the desired percentages
  var items = $("#itemcounter").val();
	for (i=1; i <= items; i++){
        //Show the items with names
        var tempid = "item_name" + i;
        var givenname = $("#" + tempid).val();
        console.log("given name for item " + i + "is: " + givenname);
        var DOMcode = "<output id=" + tempid + "output\" type=\"text\" class=\"itemname\" title=\"Label for Item " + i + " which is known as " + givenname +"\">" + givenname + "</output>";
		$(DOMcode).appendTo("#page3leftside");
      
      
        //Add the inputs for desired percentages
		var idname = "item_percent" + i;
		var DOMcode = "<input id=" + idname + " type=\"number\" min=\"0\" max=\"100\" class=\"item_percent required\" placeholder=\"Item " + i + " Percentage\" title=\"What % of a balanced portfolio would you like this item to be?\" required />";
		$(DOMcode).appendTo("#page3rightside");
	}
   
	//If too many items, show the scroll message
	var totalHeight = 0;
	var pageHeight  = $("div .page:visible").outerHeight();
	$("div:visible fieldset input, div:visible fieldset output").each(function(){
    totalHeight = totalHeight + $(this).outerHeight(true); 
	});
	if (totalHeight >= pageHeight + 20){ 
		$("#scrollicon").css({"display":"block","position": "absolute", "bottom": "70px", "right": "35px", "color": "red"});	
	}
	//------------------------------------------
    return;
}
//----------------------------/
function CreatePage4(){
  //Determine the curent
  var items = $("#itemcounter").val();
	for (i=1; i <= items; i++){
        //Show the items with names
        var tempid = "item_name" + i;
        var givenname = $("#" + tempid).val();
        console.log("given name for item " + i + "is: " + givenname);
        var DOMcode = "<output id=" + tempid + "output\" type=\"text\" class=\"itemname\" title=\"Label for Item " + i + " which is known as " + givenname +"\">" + givenname + " </output>";
		$(DOMcode).appendTo("#page4leftside");
      
      
        //Add the inputs for desired percentages
		var idname = "item_value" + i;
		var DOMcode = "<input id=" + idname + " type=\"number\" min=\"0\" class=\"item_value required\" placeholder=\"$0.00\" title=\"What is the current value of this item? (" + givenname + ")\" required />";
		$(DOMcode).appendTo("#page4rightside");
	}
   
	//If too many items, show the scroll message
	var totalHeight = 0;
	var pageHeight  = $("div .page:visible").outerHeight();
	$("div:visible fieldset input, div:visible fieldset output").each(function(){
    totalHeight = totalHeight + $(this).outerHeight(true); 
	});
	if (totalHeight >= pageHeight + 20){ 
		$("#scrollicon").css({"display":"block","position": "absolute", "bottom": "70px", "right": "35px", "color": "red"});	
	}
	//------------------------------------------
    return;
}
//----------------------------
 function CreatePage5(){
   $("#continue").show().fadeOut(100, function() {
   $("#calculate").hide().fadeIn(400);
  //For now do nothing since page 5 is not item dependent
 } 
)};
//----------------------------
 function CreatePage6(){
   
  //Hide Continue Button, show Calculate
	 $("#calculate").fadeOut(50);
	 
  //Determine the curent number of items
  var items = $("#itemcounter").val();
   
   
   for (i=1; i <= items; i++){
        //Show the items with names
        var tempid = "item_name" + i;
        var givenname = $("#" + tempid).val();
        console.log("given name for item " + i + "is: " + givenname);
        var DOMcode = "<output id=" + tempid + "output\" type=\"text\" class=\"itemname\" title=\"Label for Item " + i + " which is known as " + givenname +"\">" + givenname + " </output>";
		$(DOMcode).appendTo("#page6leftside");
      
        //TODO: Create and fill the final results into output fields
     
        //Show the results as outputs
        var tempidoutput = "item_buysell" + i;
//        var givenname = $("#" + tempid).val();
        console.log("given name for item " + i + "is: " + givenname);
        var DOMcode = "<output id=" + tempidoutput + " type=\"text\" class=\"item_buysell\" title=\"Item " + i + " which is known as " + givenname +"\"></output>";
		$(DOMcode).appendTo("#page6rightside");
	}
   
	//If too many items, show the scroll message
	var totalHeight = 0;
	var pageHeight  = $("div .page:visible").outerHeight();
	$("div:visible fieldset input, div:visible fieldset output").each(function(){
    totalHeight = totalHeight + $(this).outerHeight(true); 
	});
	if (totalHeight >= pageHeight + 20){ 
		$("#scrollicon").css({"display":"block","position": "absolute", "bottom": "70px", "right": "35px", "color": "red"});	
	}
	//------------------------------------------
	 
  	// Run the function that will do the calculations
  	DoTheMath(items);
   
	return;
};
//======= END OF PAGE CONTROLS ===========
//----------------------------------------
	$("*").keypress(function(event){
		var keyPressAllowed = JSON.parse(localStorage.getItem("keyPressAllowed"));
		if(event.keyCode == 13 && keyPressAllowed == true){
			  event.preventDefault();
			  console.log("keyPressAllowed: " + keyPressAllowed);
			  $("#continue:visible").click();
			  $("#calculate:visible").click();
			  var keyPressAllowed = false;
			  localStorage.setItem("keyPressAllowed",keyPressAllowed);
			  return false;
	  }
	});
 //---------------------------------------
});  //end of document ready
  

//----------------------------
function StorePercents(){
  var BList = [];             //contains values fom Col B
  var totalpercent = 0;
  //Get Inputs from Boxes
  $("input.item_percent").each(function () {          //Grabs the values from Col B
      console.log("Number of item percent inputs: " + $(this).val());
      if (!$(this).val()) {
          //sweetAlert({
          //    title: "Did you use a symbol/text in the Target % boxes?",
          //    text: "Numbers within text may be read.",
          //    type: "warning",
          //    showCancelButton: true,
          //    confirmButtoncolor: "#008080",
          //    confirmButtonText: "Continue",
          //    closeOnConfirm: true
          //});
       $(this).val(0);
      }
      BList.push($(this).val());
  });
  console.log(BList); 
  localStorage.setItem("BList",JSON.stringify(BList));
  //---
  //--Check BList for errors
  var nonegatives = true;
  $.each(BList, function () {
            totalpercent += parseFloat(this);       //Sums the percents
            if (parseFloat(this) < 0) {             //Error if $ is negative
                sweetAlert({
                     title: "Your Target Percent cannot be negative!",
                     text:  'Please fix your "Target %" Values',
                     type:  "error",
                });
					 nonegatives = false;
                return nonegatives;                              //exits
            }
   });
   
	if (totalpercent < 100) {
            percentmissing = 100 - totalpercent;  //Calculates missing percent
            percentmissing = percentmissing.toFixed(2); //Rounds to 2 decimals
            sweetAlert({
                title: "Your target percentages don't add up to 100%.",
                text: "You are missing " + percentmissing + " percent.",
                type: "error",
            })
            return false;                             //exits
		}
	 if (totalpercent > 100) {
            percentmissing = totalpercent - 100;   //Calculates missing percent
            percentmissing = percentmissing.toFixed(2); //Rounds to 2 decimals
            sweetAlert({
                title: "Your target percentages total more than 100%.",
                text: "You need to remove " + percentmissing + " percent.",
                type: "error",
            })
            return false;                             //exits
	 	}
	 if (nonegatives === false){
		 return false;
	 }
	 else{
          return true;
	 	}
    //---
}
//----------------------------
function StoreValues(){
	 var CList = [];             //contains values from Col C
	 //--------------------
	 // Put each item value in the array
        $("input.item_value").each(function () {            //Grabs the values from Col C
            if (!$(this).val()) {
                $(this).val(0);
            }
            CList.push($(this).val());
        });
	  console.log(CList);
	  localStorage.setItem("CList",JSON.stringify(CList));
     //-------------------
	  // Check for errors
	  // Make sure no negative values exist in Col C
			$.each(CList, function () {
            if (parseFloat(this) < 0) {
                sweetAlert({
                    title: "You cannot have negative values!",
                    text: "Please make sure each portfolio item has a postive value.",
                    type: "error",
                })
             	return NoErrors = false;                         //exits
            }
				else{
					return NoErrors = true;
				}
        });
	 if (NoErrors === false){
		  return false;
	 }
	 else{
		  return true
	 };
}
//-----End of StoreValues function---------
//-----------------------------------------
function StoreAdded(){
	 //---- 
	 //Store the added investment value
	 var Total_Money = 0;
    var Added_Investment = 0;
	 Added_Investment = $("#item_investing").val();    //Assigns Added Investment a value
        if (!$("#item_investing").val())
            {
              Added_Investment = 0
        }
        ///------------------------------------
	 	  var CList = JSON.parse(localStorage.getItem("CList"));
        $.each(CList, function () {
            Total_Money += parseFloat(this);        //Sums Col C
        });
	 
        Total_Money += parseFloat(Added_Investment); //Adds investment amount to Col C sum
	 
	 	  localStorage.setItem("TotalMoney", Total_Money);
	 	  console.log("Added Investment Amount: " + Added_Investment);
	 	  console.log("Total Value of Portfolio is: " + Total_Money);
        ///------------------------------------
        ///------------------------------------
        ///Make sure Added_Invesment is positive, otherwise only give WARNING
            if (Added_Investment < 0) {
                sweetAlert({
                    title: "Your Added Investment is Negative!",
                    text: "This means you want to remove money from your portfolio.",
                    confirmButtonText: "Okay.",
                    showCancelButton: false,
                    type: "warning",
                });
            }
            if (Total_Money < 0) {
                throw (
                sweetAlert({
                    title: "Your Portfolio has Negative VALUE!",
                    text: "Your portfolio cannot be worth less than $0...",
                    confirmButtonText: "Okay.",
                    showCancelButton: false,
                    type: "error",
                }));
					 return false;
            }
	 			else{
					 return true;
				}
}
//-----End of Store_Added function-------
//-----------------------------------------

function DoTheMath(items){
        var EList = [];             //contains values from Col E
        var Etemp = 0;              //Placeholder variable
	 	  var BList = JSON.parse(localStorage.getItem("BList"));
	 	  var CList = JSON.parse(localStorage.getItem("CList"));
	 	  var Total_Money = JSON.parse(localStorage.getItem("TotalMoney"));
        ///------------------------------------
        /// CALCULATE THE FINAL VALUES
        $.each(BList, function (index) {
            Etemp = (parseFloat(this) * Total_Money / 100) - CList[index];
            Etemp = Etemp.toFixed(2);     //Rounds to 2 decimals
            if (Etemp < 0) {
                Estr = Etemp.toString(); //Convert to string
                var Enew = Estr.substring(0, 1) + '$' + Estr.substring(1, Estr.length);
            }
            else {
                Estr = Etemp.toString(); //Convert to string
                var Enew = '+ $' + Estr;
            }
            EList.push(Enew);
        });
        ///------------------------------------
        /// OUTPUT FINAL VALUES TO CELLS
	 	  console.log("Elist:" + EList);
        $("#page6 output.item_buysell").each(function (index) {
            $(this).val(EList[index]);
        });
        ///------------------------------------
	 	  //Store Elist
	 	  localStorage.setItem("EList",JSON.stringify(EList));
    };
  
//----------------------------
//----------------------------

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
};
//--------------------

$(document).ready(function () {
//This will make the disclaimer popup
   document.getElementById("Disclaimer").onclick = function () {
       sweetAlert({title:"", text:"This is an unofficial calculator, it is the user's responsibility to ensure the calculations are accurate.\nThe user is responsible for confirming the accuracy of this program's results. It is the user's responsibility to verify the outputs before making any decisions. This tool is meant to be used as an educational tool only.\nThis tool does not take into account overcontributions, fees, or any data not inputted.\nBy using this website and all the tools and information found within, the user agrees that FinancialFox.ca and it's operators are not responsible or liable for anything.\n\nCreated for www.financialfox.ca \u00A9 2016",allowOutsideClick: "true", allowEscapeKey:"true",})
   };
  
   document.getElementById("DisclaimerText").onclick = function () {
       sweetAlert({title:"", text:"This is an unofficial calculator, it is the user's responsibility to ensure the calculations are accurate.\nThe user is responsible for confirming the accuracy of this program's results. It is the user's responsibility to verify the outputs before making any decisions. This tool is meant to be used as an educational tool only.\nThis tool does not take into account overcontributions, fees, or any data not inputted.\nBy using this website and all the tools and information found within, the user agrees that FinancialFox.ca and it's operators are not responsible or liable for anything.\n\nCreated for www.financialfox.ca \u00A9 2016", allowOutsideClick: "true", allowEscapeKey:"true",})
   };
});

