// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search");
var $recordCounter = document.querySelector("#recordCounter");
var $pages = document.querySelector("#pages");
var $loadBtn = document.querySelector("#load");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$loadBtn.addEventListener("click", handleReloadButtonClick);
$nextBtn.addEventListener("click", handleNextButtonClick);
$prevBtn.addEventListener("click", handlePrevButtonClick);
$pages.addEventListener("change", handlePagesChange);

// Set filteredAddresses to addressData initially
var filteredDataSet = dataSet;

var count = 0;

// Define Event handler functions
// handleNextButtonClick increments count and renders
function handleNextButtonClick() {
    count++;
    renderTable();
}
// handlePrevButtonClick decrements count and renders
function handlePrevButtonClick() {
    count--;
    renderTable();
}

// handlePagesChange renders for new record count selected
function handlePagesChange() {
    renderTable();
}

function handleReloadButtonClick() {
    count = 0;
    filteredDataSet = dataSet;
    $dateTimeInput.value = '';    
    renderTable();
}


// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  // clear previously rendered table
  $tbody.innerHTML = "";
  
    // Get number of records to be rendered
    var pages = Number(document.getElementById("pages").value);

    // Initialize local variables
    var start = count * pages + 1;
    var end = start + pages - 1;
    var btn;

    // Adjusts records displayed for end of data and state of Next button
    if (end > filteredDataSet.length) {
      end = filteredDataSet.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }

    // Adjusts state of Previous button
    if (start == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }

    // Displays record counts and loads records into table
    $recordCounter.innerText = "From Record: " + start + " to: " + end + " of " + filteredDataSet.length;
    // Outer loop loads specified number of records
  for (var i = 0; i < pages; i++) {
    // Get get the current address object and its fields 
    var info = filteredDataSet[i+(count*pages)];
    var fields = Object.keys(info);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the info object, create a new cell at set its inner text to be the current value at the current info's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = info[field];
    }
  }
}

function getData(dataset) {

  switch (dataset) {
  case "datetime":
   $datetimeInput.setAttribute("placeholder", "datetime");
   return "datetime";
   break;
  case "city":
    $datetimeInput.setAttribute("placeholder", "city");
    return "city";
    break;
  case "state":
    $datetimeInput.setAttribute("placeholder", "state");
    return "state";
    break;
  case "country":
    $datetimeInput.setAttribute("placeholder", "country");
    return "country";
    break;
  case "shape":
     $datetimeInput.setAttribute("placeholder", "shape");
     return "shape";
     break;
  default:
   
    break;
  }

}
//var info_keys = ["datetime", "city", "state", "country", "shape"]
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $datetimeInput.value.trim().toLowerCase();
  
   // Clear the input field
  //$datetimeInput.value = "";
   	
  // Set filteredAddresses to an array of all addresses whose "datetime" matches the filter
   inputValue = $datetimeInput.getAttribute("placeholder")
   console.log(inputValue);
  
  if(inputValue === "datetime") {
		  filteredDataSet = dataSet.filter(function(info) {
		  var info_datetime = info[inputValue].toLowerCase();

			// If true, add the address to the filteredAddresses, otherwise don't add it to 
		  return info_datetime === filterDate;
		  });
		   renderTable();
		  };
  if (inputValue === "city") {
		 filteredDataSet = dataSet.filter(function(info) {
		 var info_city  = info[inputValue].toLowerCase();

			// If true, add the address to the filteredAddresses, otherwise don't add it to 
		 return info_city === filterDate;
	});
	 renderTable();
	};
  if (inputValue === "state") {
		 filteredDataSet = dataSet.filter(function(info) {
		 var info_state  = info[inputValue].toLowerCase();

			// If true, add the address to the filteredAddresses, otherwise don't add it to 
		 return info_state === filterDate;
	});
	 renderTable();	
	};
  if (inputValue === "country") {
		 filteredDataSet = dataSet.filter(function(info) {
		 var info_country  = info[inputValue].toLowerCase();

			// If true, add the address to the filteredAddresses, otherwise don't add it to 
		 return info_country === filterDate;
	});
	 renderTable();
	};	
  if (inputValue === "shape") {
		 filteredDataSet = dataSet.filter(function(info) {
		 var info_shape  = info[inputValue].toLowerCase();

			// If true, add the address to the filteredAddresses, otherwise don't add it to 
		return info_shape === filterDate;
	});
	 renderTable();
	};
}

// Render the table for the first time on page load
renderTable();
