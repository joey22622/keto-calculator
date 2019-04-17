import axios from "axios";
import key from "./key.js";
import appId from "./key.js";


export default {
    getResults :(query) => {
        return axios.get(`https://api.nutritionix.com/v1_1/search/${query}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=${key.key.appId}&appKey=${key.key.appKey}`);
    },

    getNutrition : (query) => {
        console.log(key);
        return axios.get(`https://api.nutritionix.com/v1_1/search/${query}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=${key.key.appId}&appKey=${key.key.appKey}`).then( res => {
            return axios.get(`https://api.nutritionix.com/v1_1/item?id=${res.data.hits[0]._id}&appId=${key.key.appId}&appKey=${key.key.appKey}`);
        });   
    }

}
