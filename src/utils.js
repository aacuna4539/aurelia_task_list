export class Utils {

    copyObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    objEq(obj_1, obj_2) {
        return Object.keys(obj_1).every((key) => obj_2.hasOwnProperty(key) && (obj_1[key] === obj_2[key]));
    };

    composeThree(fn1, fn2, fn3) {
        return function (x) {
            return fn1(fn2(x), fn3(x));
        }
    };
}
