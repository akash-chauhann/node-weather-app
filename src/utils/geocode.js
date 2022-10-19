const request=require('request')
const geocode=(address,callback) =>
{
    const url='http://api.positionstack.com/v1/forward?access_key=b8c8e79df31bac745ccb2b9022dab656&query='+encodeURIComponent(address)+'&limit=1'
    request(
        {  url, json: true},
        (error,{body})=>{
            if(error)
            {
                callback('Unable to connect to the geolocation service',undefined)
            }
            else if (body.error)
            {
                callback("Error Code : "+body.error.code,undefined)
            }
            else 
            {
                callback(undefined,{
                    latitude:body.data[0].latitude,
                    longitude:body.data[0].longitude,
                    region:body.data[0].region
                })
            }
        })
}

module.exports={
    geocode:geocode
}