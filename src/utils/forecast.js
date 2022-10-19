const request=require('request')
const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=21a7b6bbe608344a1e369c849e6cd42a&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url,json:true},
        (error,{body})=>
        {
            if(error)
            {
                callback('Unable to Connect to the weather Service.',undefined)
            }
            else if(body.error)
            {
                callback(body.error,undefined)
            }
            else
            {
                let data="It is currently "+ body.current.temperature + " degrees out."
                callback(undefined,
                    {
                        data:data,
                        location:body.location.name,
                        country:body.location.country
                    })
            }
        }
        )
}

module.exports={
    forecast:forecast
}