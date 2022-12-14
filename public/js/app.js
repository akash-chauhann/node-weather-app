const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    
    messageOne.textContent="Loading Weather ForeCast....."
    messageTwo.textContent=''

    const api='/weather?address='+encodeURIComponent(location)
    fetch(api).then((response)=>
    {
    response.json().then((data)=>
    {
        if(data.error)
            {
                messageOne.textContent=data.error
                messageTwo.textContent=''
            }
        else
        {
            messageOne.textContent='Region : '+data.region
            messageTwo.textContent='Data : '+data.weatherdata.data
        }
    }) 
    })
})