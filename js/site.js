// Collect Values
function getValues() {
  let loanAmount = document.getElementById('loanAmount').value;
  let loanLength = document.getElementById('loanLength').value;
  let loanRate = document.getElementById('loanRate').value;

  loanAmount = Number(loanAmount);
  loanLength = Number(loanLength);
  loanRate = Number(loanRate);

  let monthlyPayment = getMonthlyPayment(loanAmount, loanLength, loanRate);

  displayLoan(monthlyPayment);

  let monthlyPayments = calculateLoan(monthlyPayment, loanAmount, loanLength, loanRate);

  displayPaymentSchedule(monthlyPayments, totalCost);

}

// gets one single payment
function getMonthlyPayment(loanAmount, loanLength, loanRate) {

  let monthlyPayment = loanAmount * (loanRate / 1200) / (1 - (1 + loanRate / 1200) ** (-loanLength));

  return monthlyPayment;

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
function displayLoan(monthlyPayment, totalCost) {

  let monthlyPaymentPar = document.getElementById('monthlyPayment');
  monthlyPaymentPar.innerHTML = monthlyPayment.toFixed(2);

}

function displayPaymentSchedule(monthlyPayments) {

  let tableRows = '';

  for (let i = 1; i < monthlyPayments.length; i++) {
    tableRows += `<tr>
      <td>${monthlyPayments[i].month.toFixed(2)}</td>
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