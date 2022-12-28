let form = document.querySelector("#my-form");
let amount = document.querySelector('#amount');
let discriptiton = document.querySelector('#discriptiton');
let category = document.querySelector('#category');
let count = 0;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    count = count + 1;
    expence = {
        amount: amount.value,
        discriptiton: discriptiton.value,
        category: category.value
    }
    document.querySelector("#my-form").reset(); // to reset the form
    axios.post('https://crudcrud.com/api/648066324f9d4ca996bd64e4ad9fe536/appointmentData', expence)
        .then((result) => {
            console.log(result);
            // calling the funtion to display the created user
            addExpence(result.data);
        }).catch((err) => {
            console.log(err);
        });
})

function addExpence(expence) {
    var expenceId = expence._id;
    //
    const parentNode = document.getElementById("items");
    //
    const childHTML = `<li id=${expence._id}>Amount: ${expence.amount}, Discriptiton: ${expence.discriptiton}, Category: ${expence.category}<button class="form-control bg-dark text-white  border-info" onclick="deleteExpence('${expence._id}')">delete</button><button class="form-control bg-dark text-white  border-info" onclick="editExpence('${expence.amount}','${expence.discriptiton}','${expence.category}','${expence._id}')">Edit</button></li>`;
    //
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    //
}
function editExpence(amount, discriptiton, category, expenceId) {
    document.getElementById('amount').value = amount;
    document.getElementById('discriptiton').value = discriptiton;
    document.getElementById('category').value = category;
    //deleteUser(userId);
    removeUserFromScreen(expenceId);
    axios.put("https://crudcrud.com/api/648066324f9d4ca996bd64e4ad9fe536/appointmentData/" + expenceId, {
        'amount': document.getElementById('amount').value,
        'discriptiton': document.getElementById('discriptiton').value,
        'category': document.getElementById('category').value
    })
        .then((res) => {
            console.log(res);
            deleteExpence(expenceId);
            removeUserFromScreen(expenceId);
        })
        .catch((err) => {
            console.log(err);
        })
}
function deleteExpence(expenceId) {
    axios.delete(`https://crudcrud.com/api/648066324f9d4ca996bd64e4ad9fe536/appointmentData/${expenceId}`)
        .then((res) => {
            console.log(res);
            removeUserFromScreen(expenceId);
        })
        .catch((err) => {
            console.log(err);
        })
}
function removeUserFromScreen(expenceId) {
    const parentNode = document.getElementById("items");
    const childNodeToBeDeleted = document.getElementById(expenceId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}

function showUser1() {
    axios.get('https://crudcrud.com/api/648066324f9d4ca996bd64e4ad9fe536/appointmentData')
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                addExpence(res.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

showUser1();

