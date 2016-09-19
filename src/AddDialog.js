/**
 * Created by rigel on 9/18/16.
 */
import { ValidationController, validateTrigger, ValidationRules } from 'aurelia-validation';
import { inject, NewInstance }                                    from 'aurelia-framework';
import { DialogController }                                       from 'aurelia-dialog';
import { WebAPI }                                                 from 'web-api';


@inject(WebAPI, NewInstance.of(ValidationController), DialogController)
export class AddTask {

    constructor(api, validationController, DialogController) {
        this.api = api;
        this.validationController = validationController;
      console.log(this.validationController);
        this.dialogController = DialogController;
        this.task = { name: '', description: '', due: '', isCompleted: false, urgency: ''};

    }

    attached() {
        ValidationRules
            .ensure('name').required()
            .ensure('description').required()
            .ensure('due').required()
            .on(this.task);
    }

    save() {
        let errors = this.validationController.validate();
        errors.then( errors => {
            if (errors.length === 0) {
              this.api.saveTask(this.task); // then saved alert
              this.dialogController.ok();
            }
        });
    }

    cancel() {
        this.dialogController.cancel();
    }
}





