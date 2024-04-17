// Collect Values
function getValues() {
  let loanAmount = document.getElementById('loanAmount').value;
  let loanLength = document.getElementById('loanLength').value;
  let loanRate = document.getElementById('loanRate').value;

  loanAmount = Number(loanAmount);
  loanLength = Number(loanLength);
  loanRate = Number(loanRate);

  let monthlyPayment = getMonthlyPayment(loanAmount, loanLength, loanRate);

  let totalCostOfLoan =  calculateTotalCostOfLoan(monthlyPayment, loanLength);

  let totalInterestOfLoan = calculateTotalInterestOfLoan(loanAmount, totalCostOfLoan)
  
  displayLoan(monthlyPayment, totalCostOfLoan, totalInterestOfLoan, loanAmount);

  let monthlyPayments = calculateLoan(monthlyPayment, loanAmount, loanLength, loanRate);

  displayPaymentSchedule(monthlyPayments, totalCost);

}

// gets one single payment
function getMonthlyPayment(loanAmount, loanLength, loanRate) {

  let monthlyPayment = loanAmount * (loanRate / 1200) / (1 - (1 + loanRate / 1200) ** (-loanLength));

  return monthlyPayment;

}

// get total interest
function calculateTotalCostOfLoan (monthlyPayment, loanLength) {

  let totalCostOfLoan = monthlyPayment * loanLength;
  
  return totalCostOfLoan;

}

// calculate total interest of Loan
function calculateTotalInterestOfLoan(loanAmount, totalCostOfLoan){
  
  let totalInterestOfLoan = totalCostOfLoan - loanAmount;
  
  return totalInterestOfLoan;
}

function calculateLoan(monthlyPayment, loanAmount, loanLength, loanRate) {
  let balance = loanAmount;
  let principle = 0;
  let interest = 0;
  let totalInterest = 0;

  let monthlyPayments = [];


  for (let i = 1; i <= loanLength; i++) {

    // calculate values
    let month = i;
    let interest = balance * (loanRate / 1200);
    principle = monthlyPayment - interest;
    totalInterest += interest;
    balance = balance - principle;

    // add values to obj
    let paymentRow = {
      month: month,
      payment: monthlyPayment,
      principle: principle,
      interest: interest,
      totalInterest: totalInterest,
      balance: balance
    };

    monthlyPayments.push(paymentRow);

  }

  return monthlyPayments;
}

// displaying main monthly payment
function displayLoan(monthlyPayment, totalCost, totalInterestOfLoan, loanAmount) {

  let monthlyPaymentPar = document.getElementById('monthlyPayment');
  monthlyPaymentPar.innerHTML = monthlyPayment.toFixed(2);

  let totalCostDisplay = document.getElementById('totalCost');
  totalCostDisplay.innerHTML = totalCost.toFixed(2);

  let totalInterestDisplay = document.getElementById('totalInterest');
  totalInterestDisplay.innerHTML = totalInterestOfLoan.toFixed(2);

  let totalPrincipleDisplay = document.getElementById('totalPrincipal');
  totalPrincipleDisplay.innerHTML = loanAmount.toFixed(2);

}

function displayPaymentSchedule(monthlyPayments) {

  let tableRows = '';

  for (let i = 0; i < monthlyPayments.length; i++) {
    tableRows += `<tr>
      <td>${monthlyPayments[i].month.toFixed(0)}</td>
      <td>${monthlyPayments[i].payment.toFixed(2)}</td>
      <td>${monthlyPayments[i].principle.toFixed(2)}</td>
      <td>${monthlyPayments[i].interest.toFixed(2)}</td>
      <td>${monthlyPayments[i].totalInterest.toFixed(2)}</td>
      <td>${monthlyPayments[i].balance.toFixed(2)}</td>
      </tr>`;
  }

  let scheduleBody = document.getElementById('scheduleBody');
  scheduleBody.innerHTML = tableRows;


}