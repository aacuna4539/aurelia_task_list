import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { validationRenderer } from 'aurelia-validation';

@inject(WebAPI)
export class App {

    contructor(api) {
        this.api = api;
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.options.root = '/';
        config.title = 'Todo';
        config.map([
            {route: '', moduleId: 'home', title: 'Home'},
            {route: 'task/:id', moduleId: 'task-detail', name: 'tasks'}
        ]);

        this.router = router;
    }
}
