import "./index.css"
import { useState, useEffect } from "react"

function Payment() {
    const [people, setPeople] = useState([]);
    const [amount, setAmounts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [checkAllValues, setCheckAllValues] = useState(false);
    const [totalAmountResult, setTotalAmountResult] = useState(0);
    const [payment, setPayment] = useState([]);
    let totalAmount = 0;
    const [rows, setRows] = useState([]);
    let namesArr = [];
    let rowsArr = [];
    let amountArr = [];

    useEffect(() => {
        const quantityInput = document.querySelector(".quantity");
        setQuantity(quantityInput);
        setRows([]);

        if (quantityInput !== undefined) {
            quantityInput.addEventListener('input', () => {
                if (!(quantityInput.value.length > 0)) {       
                    setCheckAllValues(false);
                }
            })
        }
    }, [quantity])

    const handleChange = () => {
        const peopleNames = document.querySelectorAll(".name");
        const amounts = document.querySelectorAll(".amount");
        const quantityInput = document.querySelector(".quantity");
        setPeople(peopleNames);
        setQuantity(quantityInput);
        setCheckAllValues(false);

        for (let i = 0; i < parseFloat(quantity.value); i++) {
            totalAmount += parseFloat(amounts[i].value);
            namesArr.push(peopleNames[i].value)
            amountArr.push(parseFloat(amounts[i].value))
        }
        setAmounts(amountArr);

        const paymentPerPerson = (totalAmount / parseFloat(quantity.value)).toFixed(2)

        namesArr.forEach((person, i) => {
            rowsArr.push(`${person} ${((amountArr[i] - paymentPerPerson) > 0 ? 'debe recibir' : 'debe pagar')}: $${Math.abs(parseFloat((amountArr[i].toFixed(2) - paymentPerPerson).toFixed(2)))}`);
        })
        setRows(rowsArr);

        /* check if an imput is empty */


        /* Checking all inputs are completed */
        if (isNaN(totalAmount) || namesArr.includes('') || (quantity.value === '')) {
            setCheckAllValues(false);
            inputsNotCompletedFrase()
        } else {
            setTotalAmountResult(totalAmount)
            setCheckAllValues(true);
        }
    }

    const paymentResults = () => {
        const payments2 = {}
        const paymentRows = [];

        people.forEach((person, i) => {
            payments2[people[i].value] = amount[i];
        })

        function splitPayments(payments) {
            const people = Object.keys(payments);
            const valuesPaid = Object.values(payments);

            const sum = valuesPaid.reduce((acc, curr) => curr + acc);
            const mean = sum / people.length;

            const sortedPeople = people.sort((personA, personB) => payments[personA] - payments[personB]);
            const sortedValuesPaid = sortedPeople.map((person) => payments[person] - mean);

            let i = 0;
            let j = sortedPeople.length - 1;
            let debt;

            while (i < j) {
                debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
                sortedValuesPaid[i] += debt;
                sortedValuesPaid[j] -= debt;

                paymentRows.push(`${sortedPeople[i]} le debe a ${sortedPeople[j]} $${debt.toFixed(2)}`);

                if (sortedValuesPaid[i] === 0) {
                    i++;
                }

                if (sortedValuesPaid[j] === 0) {
                    j--;
                }
            }
            setPayment(paymentRows)
        }
        splitPayments(payments2);

        /* muestro el resultado (escondido con css) */
        const resultBox = document.querySelector('.paymentSection')
        resultBox.style.display = 'block';
    }

    const copyToClipboard = () => {
        const copyContent = document.querySelectorAll('.copyRow')
        let copyArr = [];
        copyArr.push('Pagos a realizar: \n')
        copyContent.forEach((row, i) => {
            copyArr.push(row.innerHTML + '\n')
        })

        navigator.clipboard.writeText(copyArr)
    }

    const inputsNotCompletedFrase = () => {
        const inputNotCompleted = document.querySelector('.inputNotCompleted');
        inputNotCompleted.innerHTML = "Debes completar todos los campos para obtener el resultado final";
        inputNotCompleted.style.color = 'red';
    }




    return (
        <div >
            {
                (checkAllValues) ?
                    <div className='paymentCard'>
                        <button className="button" onClick={handleChange}>Obtener resultado</button>

                        <div>
                            <p className="totalTitle">
                                Total: ${totalAmountResult}
                            </p>
                            {
                                rows.length > 0 && rows.map((row, i) => {
                                    return (
                                        <div className="resultRow" key={i}>
                                            <span>{row}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div>
                            <h3 className="paymentDistribution">Distribución de pagos</h3>
                            <button className="button" id="paymentDistribution" onClick={paymentResults} >Obtener distribución de pagos</button>
                            <div className="paymentSection">
                                <div className="copyTitle">Haga click para copiar al portapapeles</div>
                                <div className="copySection" onClick={copyToClipboard}>
                                    {
                                        payment.length > 0 && payment.map((paymentRow, i) => {
                                            return (
                                                <div className="paymentRow" key={i + 'key'}>
                                                    <span className="copyRow" key={i + 'copyKey'}>{paymentRow}</span>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className="hide">Copiado</div>
                            </div>

                            <div className="bottomSpace"></div>
                        </div>

                    </div>
                    :
                    <div className='paymentCard'>
                        <button className="button" onClick={handleChange}>Obtener resultado</button>
                        <p className="inputNotCompleted"></p>
                    </div>
            }
        </div>
    );

}

export default Payment;