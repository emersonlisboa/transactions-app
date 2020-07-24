const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatNumber(numberToFormat) {
    return formatter.format(numberToFormat);
}

export { formatNumber };
