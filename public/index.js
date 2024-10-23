
const weekcheck = (inpdate) =>{
    const inputDate = moment(inpdate);
    const now = moment();
    if (now.isoWeek() === inputDate.isoWeek() && now.year() === inputDate.year()) {
        return true;
    } else {
        return false;
    }}
    
function showby(type) {
    var value = $(`#showbyexact_${type}`).val();
    var change = document.querySelector('.change').value;
    var changeobj = JSON.parse(change);
    var showvalues = document.querySelector(`.showvalues_${type}`);
    console.log(value)
    console.log(showvalues)
    showvalues.replaceChildren();
    if(value == 'this-week'){
        changeobj.forEach(function (transaction) {
            var tdate = new Date(transaction.date);
            if(transaction.type==`${type}` && weekcheck(tdate)){
                showvalues.innerHTML += `<div class="${type.toLowerCase()} box2">
            <div>
              <strong>Title:</strong> ${transaction.title} <br />
              <strong>Amount:</strong> ${transaction.amount}
            </div>
            <div>
              <button
                type="button"
                class="viewbtn"
                onclick="viewTransaction(
              '${transaction.title}',
              '${transaction.description}',
              '${transaction.amount}',
              '${tdate.toDateString()}'
            )"
              >
                View
              </button>
              <button
                type="button"
                id="${transaction._id}"
                class="delbtn"
                onclick="deltrans('${transaction._id}')"
              >
                Delete
              </button>
            </div>
          </div>`
            }
        })
    }
    else if(value == 'this-month'){
        changeobj.forEach(function (transaction) {
            var tdate = new Date(transaction.date);
            var currdate = new Date();
            console.log(tdate.getMonth, currdate.getMonth);
            if(transaction.type==`${type}` && tdate.getMonth() == currdate.getMonth()){
                console.log(transaction);
                showvalues.innerHTML += `<div class="${type.toLowerCase()} box2">
            <div>
              <strong>Title:</strong> ${transaction.title} <br />
              <strong>Amount:</strong> ${transaction.amount}
            </div>
            <div>
              <button
                type="button"
                class="viewbtn"
                onclick="viewTransaction(
              '${transaction.title}',
              '${transaction.description}',
              '${transaction.amount}',
              '${tdate.toDateString()}'
            )"
              >
                View
              </button>
              <button
                type="button"
                id="${transaction._id}"
                class="delbtn"
                onclick="deltrans('${transaction._id}')"
              >
                Delete
              </button>
            </div>
          </div>`
            }
        })
    }
    else if(value == 'this-year'){
        changeobj.forEach(function (transaction) {
            var tdate = new Date(transaction.date);
            var currdate = new Date();
            if(transaction.type==`${type}` && tdate.getFullYear() == currdate.getFullYear()){
                console.log(transaction);
                showvalues.innerHTML += `<div class="${type.toLowerCase()} box2">
            <div>
              <strong>Title:</strong> ${transaction.title} <br />
              <strong>Amount:</strong> ${transaction.amount}
            </div>
            <div>
              <button
                type="button"
                class="viewbtn"
                onclick="viewTransaction(
              '${transaction.title}',
              '${transaction.description}',
              '${transaction.amount}',
              '${tdate.toDateString()}'
            )"
              >
                View
              </button>
              <button
                type="button"
                id="${transaction._id}"
                class="delbtn"
                onclick="deltrans('${transaction._id}')"
              >
                Delete
              </button>
            </div>
          </div>`
            }
        })
    }
    else{
        changeobj.forEach(function (transaction) {
            var tdate = new Date(transaction.date);
            var currdate = new Date();
            if(transaction.type==`${type}`){
                console.log(transaction);
                showvalues.innerHTML += `<div class="${type.toLowerCase()} box2">
            <div>
              <strong>Title:</strong> ${transaction.title} <br />
              <strong>Amount:</strong> ${transaction.amount}
            </div>
            <div>
              <button
                type="button"
                class="viewbtn"
                onclick="viewTransaction(
              '${transaction.title}',
              '${transaction.description}',
              '${transaction.amount}',
              '${tdate.toDateString()}'
            )"
              >
                View
              </button>
              <button
                type="button"
                id="${transaction._id}"
                class="delbtn"
                onclick="deltrans('${transaction._id}')"
              >
                Delete
              </button>
            </div>
          </div>`
            }
        })
    }
}

function deltrans(tid) {
    console.log(222);
    fetch(`http://localhost:5000/delete?tid=${tid}`)
        .then((result) => {
            location.reload()
        })
        .catch((err) => {
            console.log(err);
        });
}
