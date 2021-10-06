const axios = require('axios');

module.exports = {
    getDistance: async (source=null, distention=null) => {
        const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${source}&destinations=${distention}&key=${process.env.API_KEY}`,
            headers: { }
          };
          try{
            const response  = await axios(config);
            console.log(response.data)
            if(response?.data?.rows[0]?.elements[0]?.distance?.value)
                return parseInt(response.data.rows[0].elements[0].distance.value * (1/1000))
            else 
                return false
          }catch(error){
              console.log("err",error)
              return false
          }
    }
}
