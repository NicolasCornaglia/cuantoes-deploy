import './index.css';

function UserCard() {

    const validationNames = () => {
        const nameInput = document.querySelectorAll('.name');
        const nameTitle = document.querySelectorAll('.nameTitle');

        for (let i = 0; i < nameInput.length; i++) {
            

            if (nameInput[i].value !== "") {
                nameInput[i].classList.add("checked");
            } else {
                nameInput[i].classList.remove("checked");
            }

            let repeatNameArr = [];
            nameInput.forEach(name => {
                repeatNameArr.push(name.value)
            });

            repeatNameArr.splice(repeatNameArr.indexOf(nameInput[i].value), 1);

            if (repeatNameArr.includes(nameInput[i].value)) {
                nameTitle[i].innerHTML = 'Nombre repetido:';
                nameTitle[i].style.color = 'red'
                nameInput[i].classList.remove("checked");
            } else {
                nameTitle[i].innerHTML = 'Nombre:';
                nameTitle[i].style.color = 'white';
            }
        };
    }

    const validationAmounts = () => {
        const amountInput = document.querySelectorAll('.amount');

        for (let i = 0; i < amountInput.length; i++) {
            if (isNaN(amountInput[i].value) || amountInput[i].value === '') {
                amountInput[i].classList.remove("checked");
            } else if (!isNaN(amountInput[i].value)) {
                amountInput[i].classList.add("checked");
            }
        };
    };

    return (
        <div className="card">
            <div>
                <h4 className="title nameTitle">Nombre:</h4>
                <input className="name" name="name" placeholder='Nombre o apodo' onInput={validationNames} />
                <h4 className="title">Pago:</h4>
                <input className="amount" name='pricePaid' placeholder='Cuanto pagó' type="number" onInput={validationAmounts} />
            </div>
        </div>
    );
}

export default UserCard;
