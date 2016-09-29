import {inject, BindingEngine} from 'aurelia-framework';

let delay = 200;
let id = 0;

function getId() {
    return ++id;
}

let list = [
    {
        id: getId(),
        name: 'Hair Cut',
        description: 'Get muh mop chopped',
        due: '2016-12-27T23:30:00.000Z',
        isCompleted: true,
        urgency: '3'
    },
    {
        id: getId(),
        name: 'Meeting',
        description: 'Meeting With The Bobs',
        due: '2016-09-27T22:30:00.000Z',
        isCompleted: false,
        urgency: '5'
    },
    {
        id: getId(),
        name: 'Aurelia Tut',
        description: 'Write Aurelia tutorial',
        due: '2016-09-17T22:30:00.000Z',
        isCompleted: false,
        urgency: '3'
    },
    {
        id: getId(),
        name: 'SMB',
        description: 'Release Super Mario Bros',
        due: '1985-09-13T22:30:00.000Z',
        isCompleted: true,
        urgency: '5'
    },
    {
        id: getId(),
        name: 'Store Trip',
        description: 'Go to the store.',
        due: '2016-09-28T22:30:00.000Z',
        isCompleted: false,
        urgency: '2'
    },
    {
        id: getId(),
        name: 'Halloween Prep',
        description: 'Begin Morgoth costume construction',
        due: '2016-10-01T22:30:00.000Z',
        isCompleted: false,
        urgency: '5'
    }
];


@inject(BindingEngine)
export class WebAPI {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.isRequesting = false;
        this.list = list;
        let subscription = this.bindingEngine.collectionObserver(this.list).subscribe(this.listChanged);
    }

    getList() {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                this.list = this.list.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        description: x.description,
                        due: x.due,
                        isCompleted: false,
                        urgency: ''
                    }
                });
                resolve(this.list);
                this.isRequesting = false;
            }, delay);
        });
    }

    getTaskDetails(id) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = this.list.filter(x => x.id == id)[0];
                resolve(JSON.parse(JSON.stringify(found)));
                this.isRequesting = false;
            }, delay);
        });
    }

    saveTask(task) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let copy = JSON.parse(JSON.stringify(task));
                let found = list.filter(x => x.id == task.id)[0];

                if (found) {
                    let idx = list.indexOf(found);
                    list[idx] = copy;
                } else {
                    copy.id = getId();
                    list.push(copy);
                }

                this.isRequesting = false;
                resolve(copy);
            }, delay);
        });
    }

    listChanged(splices) {
        console.log(splices);
    }
}
