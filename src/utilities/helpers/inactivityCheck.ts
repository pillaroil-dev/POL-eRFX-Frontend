console.log('Inactivity Check script loaded 🎉');

let timeoutId;
function startTimer() {
    timeoutId = window.setTimeout(() => {
        // Perform action when user is inactive, e.g., log out
        //const text = "You have been inactive for more than 1 minutes. \nYou will be automatically logged out now \n\nConfirm to logout completely or cancel to continue.";
        async function checkUserActivity(){
             await fetch('/api/auth/logout');
             window.location.href = "/auth/login";
            // if(confirm(text) === true){
            //     // await fetch('/api/auth/logout');
            //     // window.location.href = "/auth/login"
            // }else{
            //     return;
            // }
        };
        checkUserActivity();
    }, 1000 * 60 * 10); // Set timeout to 10 minutes
}

function resetTimer() {
    window.clearTimeout(timeoutId);
    startTimer();
}
// Add event listeners for user interactions
document.addEventListener("mousemove", resetTimer, false);
document.addEventListener("mousedown", resetTimer, false);
document.addEventListener("keydown", resetTimer, false);
document.addEventListener("scroll", resetTimer, false);

// Start the timer on page load
startTimer();