var res = "";
var i = 0;
var time_start = 0;
var width = 0;
var pattern = /^([0-9]+\s)*$/;
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
        if (i == 0) {
            item.className = "item";
            let liner = element.process.id + '<div class="liner">' + element.time_start + '</div>';
            item.innerHTML = liner;
        } else {
            var last_element = data[i - 1];
            if (element.process.id == last_element.process.id) {
                item.className = "item item-next";
                if (data.length == i+1) {
                    let liner = '<div class="liner-end">' + Number(element.time_start+1) + '</div>';
                    item.innerHTML = liner;
                }
            } else {
                item.className = "item";
                if (data.length == i+1) {
                    let liner = element.process.id + '<div class="liner">' + element.time_start + '</div><div class="liner-end">' + Number(element.time_start+1) + '</div>';
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
    }, 1000)
}

