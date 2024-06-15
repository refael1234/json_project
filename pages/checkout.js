const approveButton = document.getElementById('approve');

const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
const userName = localStorage.getItem('userName');
console.log(userName);
console.log(selectedItems);

const itemCount = localStorage.getItem('itemLength');
const totalPrice = localStorage.getItem('sum');

document.getElementById('total-product').textContent = itemCount || 0;
document.getElementById('total-price').textContent = totalPrice || '0.00';

const checkout = async () => {
    const response = await fetch('/buy', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            userName,
            selectedItems
        })
    });

    const result = await response.json();
    if (result.message === 'Products added successfully') {
        localStorage.removeItem('selectedItems');
        localStorage.removeItem('userName');
        localStorage.removeItem('itemLength');
        localStorage.removeItem('sum');
        alert('Purchase successful. You have been logged out.');
       
    } else {
        alert(result.message);
    }
};

