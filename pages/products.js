const sortButton = document.getElementById('sort');
const itemsContainer = document.getElementById('items-container');
const sortByNameRadio = document.getElementById('sort-by-name');
const sortByPriceRadio = document.getElementById('sort-by-price');
const items = Array.from(itemsContainer.getElementsByClassName('item'));
let selectedItems = [];

function handleItemClick(event) {
    const item = event.currentTarget;
    const itemName = item.getAttribute('data-name');
    const itemPrice = item.getAttribute('data-price');

    const itemData = {
        name: itemName,
        price: parseFloat(itemPrice)
    };

    // Toggle selection
    if (item.classList.contains('selected')) {
        item.classList.remove('selected');
        selectedItems = selectedItems.filter(i => i.name !== itemData.name || i.price !== itemData.price);
    } else {
        item.classList.add('selected');
        selectedItems.push(itemData);
    }

    console.log(selectedItems);  // For debugging
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    
    const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);
    console.log(totalPrice)
    localStorage.setItem('sum',totalPrice)
    localStorage.setItem('itemLength',selectedItems.length)
}

items.forEach(item => {
    item.addEventListener('click', handleItemClick);
});

sortButton.addEventListener('click', () => {
    const sortByName = sortByNameRadio.checked;
    const sortByPrice = sortByPriceRadio.checked;

    if (sortByName) {
        items.sort((a, b) => {
            const nameA = a.getAttribute('data-name').toLowerCase();
            const nameB = b.getAttribute('data-name').toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    } else if (sortByPrice) {
        items.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB;
        });
    }

    itemsContainer.innerHTML = '';
    items.forEach(item => itemsContainer.appendChild(item));
});

const products = async()=>{
   
    let res = await fetch('/products',{
        headers:{
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify(
           selectedItems
        )
    }) 
}

