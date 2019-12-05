// Building the model for the search 
import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResult() {
    //  API KEY - 9ea336ef5743696c0437d3fdfb5a780c 
    // const key = `9ea336ef5743696c0437d3fdfb5a780c`;
    
    // Making error handler to try if the key is valid.
    try{
        // Making a AJAX CALLs -https request axios() 'already return JSON' 
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        
        // Making const to grab result data and receipes. 
        this.result = res.data.recipes;
        
    } catch (error) {
        alert(error);
        } 
    }   
}
 