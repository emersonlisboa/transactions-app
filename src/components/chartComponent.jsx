import React from 'react'
import Chart from "react-google-charts";

export default function simpleChart(props) {

    const totalExpenses = props.Expenses
    const totalIncome = props.Income
    return (

        <div>

            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Movimentações', 'R$'],
                    ['Despesas', totalExpenses],
                    ['Receitas', totalIncome],

                ]}
                options={{
                    title: "Movimentações",
                    // Just add this option
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    )
}
