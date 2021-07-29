// Get values from page
function getValues(){
    let loanAmount = document.getElementById("loanAmountInput").value;
    let months = document.getElementById("totalMonthsInput").value;
    let rate = document.getElementById("rateInput").value;

    if (loanAmount == ""){
        loanAmount = parseFloat(15000);
    } else {
        loanAmount = parseFloat(loanAmount);
    }

    if (months == ""){
        months = parseFloat(60);
    } else {
        months = parseFloat(months);
    }

    if (rate == ""){
        rate = parseFloat(3);
    } else {
        rate = parseFloat(rate);
    }
    
    // do loan calculations
    let resultsHTML = loanCalculations(loanAmount, rate, months);

    // display the html to screen
    displayResults(resultsHTML);
}

// Calculations
function loanCalculations(loanAmount, rate, months){
    let totalInterest = 0;
    let balance = loanAmount;
    let interestPayment = 0;
    let principalPayment;
   
    // Calculate the total monthly payment
    let monthExponent = -Math.abs(months);
    let monthlyPayment = (loanAmount * (rate/1200)) / (1-(1+(rate/1200))**(monthExponent));
    monthlyPayment = parseFloat(monthlyPayment);
    
    let html = "";
    
    for (let i = 1; i <= months; i++){
      let month = i;
      interestPayment = parseFloat(balance*(rate/1200));
      principalPayment = parseFloat(monthlyPayment - (balance * (rate/1200)));
      totalInterest = parseFloat((totalInterest + interestPayment));
      totalInterest = parseFloat(totalInterest);
      balance -= principalPayment;
      balance = parseFloat(balance);
    
      html += `<tr><td>${month}</td><td>${monthlyPayment}</td><td>${principalPayment.toFixed(2)}</td><td>${interestPayment.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`
    }
    
    let totalCost = loanAmount + totalInterest;

    return html;
}

// Display results
function displayResults(resultsHTML){
    document.getElementById("results").innerHTML = resultsHTML;
}