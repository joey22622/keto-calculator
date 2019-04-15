import axios from "axios";
import key from "./key.js";
import appId from "./key.js";


export default {
    getNutrition(query) {
        console.log(key);
        console.log(axios.get(`https://api.nutritionix.com/v1_1/search/taco?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=${key.key.appId}&appKey=${key.key.appKey}`));
        return axios.get(`https://api.nutritionix.com/v1_1/search/eggs?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=${key.key.appId}&appKey=${key.key.appKey}`);
    //    return axios.get(`https://api.nal.usda.gov/ndb/reports/?name=${query}&type=b&format=json&api_key=${key.key}`)
        // console.log(axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${query}&sort=n&max=25&offset=0&api_key=${key.key}`));
        // console.log(axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${key.key}&location=Denver+CO`));
        // return axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${key.key}&location=Denver+CO`)
        // return axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${query}&sort=n&max=25&offset=0&api_key=${key.key}`)
    }
}
