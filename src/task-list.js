import { EventAggregator }         from 'aurelia-event-aggregator';
import { inject }                  from 'aurelia-framework';
import { TaskUpdated, TaskViewed } from './messages';
import { WebAPI }                  from './web-api';

@inject(WebAPI, EventAggregator)
export class TaskList {

    constructor(api, ea) {
        this.api = api;
        this.tasks = [];

        ea.subscribe(TaskViewed, x => this.select(x.task));
        ea.subscribe(TaskUpdated, x => {
            let id = x.task.id;
            let task = this.tasks.find(x => x.id === id);
          console.log(task, x.task);
            Object.assign(task, x.task);
        });
    }

    created() {
        this.api.getList().then( x => this.tasks = x);
    }

    select(task) {
        this.selectedId = task.id;
      console.log(this.selectedId);
        return true;
    }
}
