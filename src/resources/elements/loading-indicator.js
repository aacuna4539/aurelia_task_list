import { bindable, noView, decorators } from 'aurelia-framework';
import * as nprogress                   from 'nprogress';

export let LoadingIndicator = decorators(
    noView(['nprogress/nprogress.css']),
    bindable({name: 'loading', defaultValue: false})
).on( class {
    loadingChanged(newValue){
        newValue ? nprogress.start() : nprogress.done();
    }
});