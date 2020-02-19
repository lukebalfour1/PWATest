//offline data
//Firebase database persistence allows for data to be synced if there is differences
db.enablePersistence()
.catch(err => {
    if(err.code == 'failed-percondition'){
        //probably multiple tabs open at once
        console.log('persistence failed')
    } else if(err.code == 'unimplemented'){
        //lack of browser support
        console.log('persistence is not available')
    }
});

//real time listener: If collection is updated or changed, code is called
db.collection('products').onSnapshot((snapshot) => {
//For each change in snapshot
  snapshot.docChanges().forEach(change => {
    //Console.log for testing
    //console.log(change, change.doc.data(), change.doc.id);
    if(change.type === 'added'){
        //add product data to web page
        renderProduct(change.doc.data(), change.doc.id)
    }
    if(change.type === 'removed'){
        //remove product data from web page
    }
  });
});

//adding customer details to database
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const customer = {
        fname: form.fName.value,
        lname: form.lName.value,
        email: form.email.value
    };

    db.collection('customers').add(customer)
    .catch(err => console.log(err));

    form.fName.value = "";
    form.lName.value = "";
    form.email.value = "";
})