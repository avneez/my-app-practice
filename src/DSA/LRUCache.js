// LRU Cache

class LRU {
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }

    getItem(key){
        let value = this.cache.get(key); //get the item from the cache
        if(value){
            this.cache.delete(key); //remove the item from the cache
            this.cache.set(key, value); //freshly add the item to the cache
        }
        console.log("Accessed item:", `{${key}: ${value}}`);
        return value;
    }

    setItem(key, value){
        console.log("Adding item:", `{${key}: ${value}}`);
        if(this.cache.has(key)){ // if key is already in cache, delete its
            this.cache.delete(key);
        }
        else if (this.cache.size === this.capacity) {
            console.log("Capacity full, Removing the least recently used item:", this.first());
            this.cache.delete(this.first()); // remove the first item if capacity is full
        }
        this.cache.set(key, value);
    }

    first(){
        return this.cache.keys().next().value; // return first key
    }

    // Implement LRU/MRU retrieval methods
    getLeastRecent() {
        return Array.from(this.cache)[0];
    }

    getMostRecent() {
        return Array.from(this.cache)[this.cache.size - 1];
    }

}

// e.g. 1
console.log("Example 1:")
const LRUCache = new LRU(3);
LRUCache.setItem("name", "Avneez")
LRUCache.setItem("age", "24")
LRUCache.setItem("city", "Indore")
console.log(LRUCache.cache)
LRUCache.getItem("name")
console.log(LRUCache.cache)
LRUCache.setItem("role", "SDE")
console.log(LRUCache.cache)
console.log("Least Recent:", LRUCache.getLeastRecent());
console.log("Most Recent:", LRUCache.getMostRecent());