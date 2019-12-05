
//Thrid party application that can save id by time and machine name - npm install uniqid --save
import uniqid from 'uniqid';


export default class List {
    constructor() {
        this.items = [];
    }
    
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        }
        
        this.items.push(item);
        return item;
    }
    
    deleteItem(id) {
        // targeting the index that targets the elements id 
        const index = this.items.findIndex(el => el.id === id);
        
        
        // [2,4,8] splice(1, 2) -> return [4, 8], original array is [2]
        //1 is the index to start from and 2 is the amount of elements^^
        
        // [2,4,8] slice(1, 1) -> return 4, original array is [2,4,8] DOES NOT MUTATE ARRAY
        //1 is the index to start from and 1 is the index to end on^^
       
        
        // Using the splice() method to delete item from array by mutating array
        this.items.splice(index, 1);
    }
    
    updateCount(id, newCount) {
        // to find() the element by the id that we pass into it
        this.items.find(el => el.id === id).count = newCount;
    }
    
}