import { EventAggregator }         from 'aurelia-event-aggregator';
import { inject }                  from 'aurelia-framework';
import { TaskUpdated, TaskViewed } from './messages';
import { WebAPI }                  from './web-api';

@inject(WebAPI, EventAggregator)
export class TaskList {

    constructor(api, ea) {
        this.api   = api;
        this.tasks = [];

        ea.subscribe(TaskViewed, msg => this.select(msg.task));
        ea.subscribe(TaskUpdated, msg => {
            let id = msg.task.id;
            let task = this.tasks.find(x => x.id == id);
            Object.assign(task, msg.task);
        });
    }

    created() {
        this.getList();
    }

    select(task) {
        this.selectedId = task.id;
        return true;
    }

    getList() {
        this.api.getList().then( x => this.tasks = x);
    }
}
