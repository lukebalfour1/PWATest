if('serviceWorker' in navigator)
{
    //asynchronous task
    navigator.serviceWorker.register('/sw.js')
    //promise
    .then((reg) => console.log("Service worker registered", reg))
    //if promise rejected
    .catch((error) => console.log("Service worker not registered", err))

}