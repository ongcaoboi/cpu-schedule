var res = "";
var i = 0;
var time_start = 0;
var width = 0;
var pattern = /^([0-9]+\s)*[0-9]+|([0-9]+\s)$/;
document.getElementById('run').addEventListener("click", async (e) => {
    e.preventDefault();
    document.getElementById('main').innerHTML = "";
    width = 0;
    document.getElementById('run').style.display = 'none';
    document.getElementById('wait').innerHTML = '';
    document.getElementById('T_').innerHTML = '';
    i = 0;
    var type_ = document.getElementById('type').value;
    var input_ = document.getElementById('input').value;
    if (pattern.test(input_) == false | input_ == '') {
        alert("Hey, data input is not in the correct format!");
        document.getElementById('run').style.display = 'inline-block';
        return;
    }
    var lines = input_.trim().split(/\r\n|\n/);
    let line1 = lines.shift().split(' ');
    var inputIs = false;
    if (line1[0] != lines.length) {
        inputIs = true;
    }
    var last_item = 0;
    var last_name = 0;
    lines.forEach(element => {
        element = element.split(' ');
        if (last_item > Number(element[1])) {
            inputIs = true;
            return false;
        }
        if (last_name >= Number(element[0])) {
            inputIs = true;
            return false;
        }
        last_name = Number(element[0]);
        last_item = Number(element[1]);
        if (typeof element[0] === 'undefined' | typeof element[1] === 'undefined' | typeof element[2] === 'undefined') {
            inputIs = true;
            return false;
        }
    });

    if (inputIs) {
        alert("Hey, data input is not in the correct format!");
        document.getElementById('run').style.display = 'inline-block';
        return;
    }

    $.ajax({
        url: '/getRobin',
        type: 'post',
        data: {
            data: {
                input: input_,
                type: type_
            }
        },
        success: function (response) {
            if (response == "") {
                alert('Error!');
                document.getElementById('run').style.display = 'inline-block';
                return;
            }
            res = response;
            time_start = res.time_start;
            var data = res.arr;
            myLoop(data);
        },
        error: function () {
            alert("Error");
            document.getElementById('run').style.display = 'inline-block';
        }
    })
});
function myLoop(data) {
    if (data == '') {
        document.getElementById('run').style.display = 'inline-block';
        alert("Error: data response is null");
        return;
    }
    setTimeout(function () {
        var element = data[i];
        var item = document.createElement("div");
        console.log(element);
        if (element.process.id == "wait") {
            item.classList.add('item-wait');
        }
        if (i == 0) {
            item.classList.add("item");
            let liner = element.process.id + '<div class="liner">' + element.time_start + '</div>';
            item.innerHTML = liner;
        } else {
            var last_element = data[i - 1];
            if (element.process.id == last_element.process.id) {
                item.classList.add("item");
                item.classList.add("item-next")
                if (data.length == i + 1) {
                    let liner = '<div class="liner-end">' + Number(element.time_start + 1) + '</div>';
                    item.innerHTML = liner;
                }
            } else {
                item.classList.add("item");
                if (data.length == i + 1) {
                    let liner = element.process.id + '<div class="liner">' + element.time_start + '</div><div class="liner-end">' + Number(element.time_start + 1) + '</div>';
                    item.innerHTML = liner;
                } else {
                    let liner = element.process.id + '<div class="liner">' + element.time_start + '</div>';
                    item.innerHTML = liner;
                }
            }
        }
        width += 40;
        document.getElementById('main').appendChild(item);
        i++;
        document.getElementById('time_s').innerHTML = i + time_start;
        if (i < res.sum_time - time_start) {
            myLoop(data);
        } else {

            document.getElementById('T_').innerHTML = res.T;
            var tmp = '';
            res.wait.forEach(element => {
                tmp += 'id ' + element.id + ' : ' + element.wait_time + '\n';
            });
            document.getElementById('wait').innerHTML = tmp;
            document.getElementById('run').style.display = 'inline-block';
        }
    }, 100)
}

