var fs = require('fs');


class Process {
    constructor(id, at, bt) {
        this.id = id;
        this.at = at;
        this.bt = bt;
    }

    toString() {
        return 'Id: ' + this.id + ' | Arrival time: ' + this.at + ' | Brust time: ' + this.bt;
    }
}


class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        return this.queue.unshift(item);
    }

    dequeue() {
        return this.queue.pop();
    }

    peek() {
        return this.queue[this.length - 1];
    }

    get length() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

let getFCFS = (input) => {
    try {
        var lines = input.trim().split(/\r\n|\n/);
        let line1 = lines.shift().split(' ');
        const n = Number(line1[0]);
        var arr = [];
        var arr_process = [];
        lines.forEach(element => {
            element = element.split(' ');
            if(typeof element[0] === 'undefined' | typeof element[1] === 'undefined' | typeof element[2] === 'undefined' ){
                return '';
            }
            arr.push(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
            arr_process.push(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
        });
        const result = [];
        var time = arr[0].at;
        var time_start = time;
        while (arr.length != 0) {
            var item = arr[0];
            while (true) {
                result.push({
                    time_start: time,
                    process: new Process(item.id, item.at, item.bt)
                });
                item.bt -= 1;
                time++;
                if (item.bt == 0) {
                    arr.shift();
                    break;
                }
            }
        }
        var arr_time = [];
        for (var item of arr_process) {
            for (var t_end = time - 1 - time_start; t_end >= time_start; t_end--) {
                if (result[t_end].process.id == item.id) {
                    var t_tmp = 0;
                    for (var t_ = 0; t_ < t_end; t_++) {
                        if (result[t_].process.id != item.id) {
                            t_tmp++;
                        }
                    }
                    t_tmp -= item.at;
                    t_tmp += time_start;
                    arr_time.push({
                        id: item.id,
                        wait_time: t_tmp,
                    });
                    break;
                }
            }
        }
        var sum = 0;
        for (var item of arr_time) {
            sum += item.wait_time;
        }
        var data = {
            time_start: time_start,
            sum_time: time,
            T: sum / n,
            wait: arr_time,
            arr: result,
        }
        return data;
    }
    catch (err) {
        return '';
    }
}

let getSJF = (input) => {
    try {
        var lines = input.trim().split(/\r\n|\n/);
        let line1 = lines.shift().split(' ');
        const n = Number(line1[0]);
        var arr = [];
        var arr_process = [];
        lines.forEach(element => {
            element = element.split(' ');
            if(typeof element[0] === 'undefined' | typeof element[1] === 'undefined' | typeof element[2] === 'undefined' ){
                return '';
            }
            arr.push(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
            arr_process.push(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
        });
        var item_tmp = arr.shift();
        arr.sort(function (a, b) {
            if (a.bt > b.bt) return 1;
            if (a.bt < b.bt) return -1;
            return 0;
        });
        arr.unshift(item_tmp);
        const result = [];
        var time = arr[0].at;
        var time_start = time;
        while (arr.length != 0) {
            var item = arr[0];
            while (true) {
                result.push({
                    time_start: time,
                    process: new Process(item.id, item.at, item.bt)
                });
                item.bt -= 1;
                time++;
                if (item.bt == 0) {
                    arr.shift();
                    break;
                }
            }
        }
        var arr_time = [];
        for (var item of arr_process) {
            for (var t_end = time - 1 - time_start; t_end >= time_start; t_end--) {
                if (result[t_end].process.id == item.id) {
                    var t_tmp = 0;
                    for (var t_ = 0; t_ < t_end; t_++) {
                        if (result[t_].process.id != item.id) {
                            t_tmp++;
                        }
                    }
                    t_tmp -= item.at;
                    t_tmp += time_start;
                    arr_time.push({
                        id: item.id,
                        wait_time: t_tmp,
                    });
                    break;
                }
            }
        }
        var sum = 0;
        for (var item of arr_time) {
            sum += item.wait_time;
        }
        var data = {
            time_start: time_start,
            sum_time: time,
            T: sum / n,
            wait: arr_time,
            arr: result,
        }
        return data;
    }
    catch (err) {
        return '';
    }
}
let getSRTF = (input) => {
    try {
        var lines = input.trim().split(/\r\n|\n/);
        let line1 = lines.shift().split(' ');
        const n = Number(line1[0]);
        var arr = new Queue();
        var arr_process = [];
        lines.forEach(element => {
            element = element.split(' ');
            if(typeof element[0] === 'undefined' | typeof element[1] === 'undefined' | typeof element[2] === 'undefined' ){
                return '';
            }
            arr.enqueue(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
            arr_process.push(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
        });
        var arr_run = [];
        arr_run.push(arr.dequeue());
        const result = [];
        var time = arr_run[0].at;
        var time_start = time;
        while (arr_run.length != 0) {
            var item = arr_run.shift();
            while (true) {
                result.push({
                    time_start: time,
                    process: new Process(item.id, item.at, item.bt)
                });
                item.bt -= 1;
                time++;
                if (arr.isEmpty() == false) {
                    var item_next = arr.peek();
                    if (item_next.at == time) {
                        arr_run.push(arr.dequeue());
                    }
                }
                if (item.bt == 0) {
                    break;
                }
                arr_run.sort(function (a, b) {
                    if (a.bt > b.bt) return 1;
                    if (a.bt < b.bt) return -1;
                    return 0;
                });
                var item_ = arr_run[0];
                if (arr_run.length == 0) {
                    arr_run.push(item);
                    break;
                }
                if (item_.bt < item.bt) {
                    arr_run.push(item);
                    break;
                }
                else {
                    arr_run.unshift(item);
                    break;
                }
            }
        }
        var arr_time = [];
        for (var item of arr_process) {
            for (var t_end = time - 1 - time_start; t_end >= time_start; t_end--) {
                if (result[t_end].process.id == item.id) {
                    var t_tmp = 0;
                    for (var t_ = 0; t_ < t_end; t_++) {
                        if (result[t_].process.id != item.id) {
                            t_tmp++;
                        }
                    }
                    t_tmp -= item.at;
                    t_tmp += time_start;
                    arr_time.push({
                        id: item.id,
                        wait_time: t_tmp,
                    });
                    break;
                }
            }
        }
        var sum = 0;
        for (var item of arr_time) {
            sum += item.wait_time;
        }
        var data = {
            time_start: time_start,
            sum_time: time,
            T: sum / n,
            wait: arr_time,
            arr: result,
        }
        return data;
    }
    catch (err) {
        return '';
    }
}
let roundRobin = (input) => {
    try {
        var lines = input.trim().split(/\r\n|\n/);
        let line1 = lines.shift().split(' ');
        const n = Number(line1[0]);
        const tq = Number(line1[1]);
        const arr_process = [];
        var arr = new Queue();
        lines.forEach(element => {
            element = element.split(' ');
            if(typeof element[0] === 'undefined' | typeof element[1] === 'undefined' | typeof element[2] === 'undefined' ){
                return '';
            }
            arr.enqueue(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
            arr_process.push(new Process(Number(element[0]), Number(element[1]), Number(element[2])));
        });
        var queue = new Queue();
        const result = [];
        queue.enqueue(arr.dequeue());
        var time = queue.peek().at;
        var time_start = time;
        while (queue.isEmpty() == false) {
            var item = queue.dequeue();
            for (var i = 0; i < tq; i++) {
                result.push({
                    time_start: time,
                    process: new Process(item.id, item.at, item.bt)
                });
                time++;
                item.bt -= 1;
                if (arr.isEmpty() == false) {
                    var item_next = arr.peek();
                    if (item_next.at == time) {
                        queue.enqueue(arr.dequeue());
                    }
                }
                if (item.bt == 0) {

                    break;
                }
                if (i == tq - 1) {
                    queue.enqueue(item);
                }
            }
        }
        var arr_time = [];
        for (var item of arr_process) {
            for (var t_end = time - 1 - time_start; t_end >= time_start; t_end--) {
                if (result[t_end].process.id == item.id) {
                    var t_tmp = 0;
                    for (var t_ = 0; t_ < t_end; t_++) {
                        if (result[t_].process.id != item.id) {
                            t_tmp++;
                        }
                    }
                    t_tmp -= item.at;
                    t_tmp += time_start;
                    arr_time.push({
                        id: item.id,
                        wait_time: t_tmp,
                    });
                    break;
                }
            }
        }
        var sum = 0;
        for (var item of arr_time) {
            sum += item.wait_time;
        }
        var data = {
            time_start: time_start,
            sum_time: time,
            T: sum / n,
            wait: arr_time,
            arr: result,
        }
        return data;
    }
    catch (err) {
        return '';
    }
};

let roundRobinJson = function () {
    let rawdata = fs.readFileSync('src/services/result.json');
    let data = JSON.parse(rawdata);
    return data;
};

module.exports = {
    getFCFS: getFCFS,
    getSJF: getSJF,
    getSRTF: getSRTF,
    getRobin: roundRobin,
    getRobin_1: roundRobinJson
}
