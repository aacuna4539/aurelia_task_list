import { EventAggregator }               from 'aurelia-event-aggregator';
import { inject }                        from 'aurelia-framework';
import { DialogService }                 from 'aurelia-dialog';
import { AddTask }                       from './AddDialog';
import { TaskUpdated, TaskViewed }       from './messages';
import { WebAPI }                        from './web-api';
import { Utils }                         from './utils';

@inject(WebAPI, EventAggregator, Utils, DialogService)
export class TaskDetail {

    constructor(api, ea, utils, dialogService) {
        this.api = api;
        this.ea = ea;
        this.utils = utils;
        this.dialogService = dialogService;
    }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.api.getTaskDetails(params.id).then(task => {
            this.task = task;
            this.routeConfig.navModel.setTitle(task.name);
            this.originalTask = this.utils.copyObj(task);
            this.ea.publish(new TaskViewed(this.task));
        });
    }

    get canSave() {
        return this.task.name && !this.api.isRequesting;
    }

    save() {
        console.log(this.task);
        this.api.saveTask(this.task).then(task => {
           this.task = task;
           this.routeConfig.navModel.setTitle(task.name);
           this.originalTask = this.utils.copyObj(task);
           this.ea.publish(new TaskUpdated(this.task));
        });
    }

    canDeactivate() {
        if (!this.utils.objEq(this.originalTask, this.task)) {
            let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

            if (!result) {
                this.ea.publish(new TaskViewed(this.task));
            }
            return result;
        }
        return true;
    }

    // opens AddDialog
    addTask(task) {
        var original = this.utils.copyObj(task);
        this.dialogService.open({viewModel: AddTask, model: this.utils.copyObj(this.task)})
            .then(result => {
                if (result.wasCancelled) {
                    this.task.name = original.title;
                    this.task.description = original.description;
                }
            });
    }
}
