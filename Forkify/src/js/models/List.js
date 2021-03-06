import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count, unit, ingredient
        }
        this.items.push(item);

        // persist data in localStorage
        this.persistData();

        return item;
    }

    deleteItem(id) {
        const index = this. items.findIndex(el => el.id === id);

        this.items.splice(index, 1);

        // persist data in localStorage
        this.persistData();
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;

        // persist data in localStorage
        this.persistData();
    }

    persistData() {
        localStorage.setItem('items', JSON.stringify(this.items));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('items'));

        // restoring likes from the localStorage
        if (storage) this.items = storage;
    }
}