
console.log("Client side loaded.");




const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const error = document.querySelector('#msg-error');

const result = document.querySelector('#msg-result');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault(); // prevent browser from refreshing the page

    const searchTerm = input.value;
        
    fetch('/weather?address=' + searchTerm)
    .then(response => 
        response.json().then((data) => 
            {
                result.textContent = '';
                error.textContent = '';

                if (data.error) {
                    
                    error.textContent = data.error;
                }
                else {
                    const res = data.response;
                    const displayText = "Location: " + res['Location'] + '<br>' 
                            + "Current: " + res['Current'] + '\n' 
                            + "Feels like: " + res['Feels like'];

                    result.textContent = displayText;
                    

                }
                
                }
        )
    );
})