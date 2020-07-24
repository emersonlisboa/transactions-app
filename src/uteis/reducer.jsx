function getTotalTransaction(transactions) {
    return transactions.reduce((accumulator, current) => {
        return accumulator + current.value;
    }, 0);
}

function getTotalExpenses(transactions) {
    const newTransactions = transactions.filter((value) => value.type === '-')
    return newTransactions.reduce((accumulator, current) => {
        return accumulator + current.value;
    }, 0);
}

function getTotalIncome(transactions) {
    const newTransactions = transactions.filter((value) => value.type !== '-')
    return newTransactions.reduce((accumulator, current) => {
        return accumulator + current.value;
    }, 0);
}

function getTransactionCount(transactions) {

    return transactions.length;

}


export { getTotalTransaction, getTotalExpenses, getTotalIncome, getTransactionCount };