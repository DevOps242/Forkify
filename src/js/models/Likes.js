export default class Likes {
    constructor() {
        this.likes = [];
    }
    
    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        
        // Perist data in local Storage
        this.persistData();
        return like;
    }
    
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id); 
        this.likes.splice(index, 1);
        
        // Persist data in local Storage
        this.persistData();
        
}
    
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    
    
    getNumLikes() {
        return this.likes.length;
    }
    
    persistData() {
        // Using the window local storage and converting it our array to a string.
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    
    
    readStorage() {
         // Using JSON.parse() to turn a string back to an array
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}