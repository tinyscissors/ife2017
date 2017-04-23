//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);//false表示在冒泡阶段调用事件处理程序
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和数组元素作为参数传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
}

window.onload = function() {
    var container = document.getElementById("container");
    var buttonList = document.getElementsByTagName("input");
    //定义队列对象-JSON方式/对象直接量
    var queue = {
        str: [],

        leftPush: function(num) {
            this.str.unshift(num);
            this.paint();
        },

        rightPush: function(num) {
            this.str.push(num);
            this.paint();
        },

        isEmpty: function(num) {
            return (this.str.length == 0);
        },

        leftPop: function() {
            if(!this.isEmpty()) {
                alert(this.str.shift());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },

        rightPop: function() {
            if(!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },

        paint: function() {
            var str = "";
            each(this.str, function(item) {//str[i] → item
                str += ("<div>" + parseInt(item) + "</div>");
            });
            container.innerHTML = str;
            addDivDelEvent();
        },

        deleteID: function(id) {
            console.log(id);
            this.str.splice(id, 1);//删除从index=id开始的1个元素
            this.paint();
        }
    }

    //为container中的每个div绑定删除函数
    function addDivDelEvent() {
        for (var i = 0; i < container.childNodes.length; i++) {

            //☆这里要使用闭包，否则绑定到指定div上的delete函数的参数永远等于跳出时的i值(length);
            addEvent(container.childNodes[i], "click", function(i) {
                return function(){return queue.deleteID(i)};
            }(i));
        }
    }

    //为4个按钮绑定函数
    addEvent(buttonList[1], "click", function() {
        var input = buttonList[0].value;
        if((/^[0-9]+$/).test(input)) {
            queue.leftPush(input);
        }
        else {
            alert("Please enter an interger!");
        }
    });
    addEvent(buttonList[2], "click", function() {
        var input = buttonList[0].value;
        if((/^[0-9]+$/).test(input)) {
            queue.rightPush(input);
        }
        else {
            alert("Please enter an interger!");
        }
    });
    addEvent(buttonList[3], "click", function() {queue.leftPop()});
    addEvent(buttonList[4], "click", function() {queue.rightPop()});
}
