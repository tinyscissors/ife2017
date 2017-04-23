//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	}
	else if (element.attachEvent) {
		element.attachEvent("on" + event, listener);
	}
	else {
		element["on" + event] = listener;
	}
}

//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递，后面用
function each(arr, fn) {
	for (var i = 0; i < arr.length; i++) {
		fn(arr[i], i);
	}
} 

//JavaScript RegExp 对象 http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
//将输入的内容分割为数组
function spiltInput(text) {
	var inputArray = [];
	inputArray = text.split(/[,，;；、\s\n]+/);// http://w3school.com.cn/jsref/jsref_split.asp
	return inputArray;
}

//对textarea内的内容进行trim，否则当开头结尾有大量空格时会有bug
function trim(str) {
	var regex1 = /^\s*/;//
	var regex2 = /\s*$/;//
	return (str.replace(regex1, "")).replace(regex2, "");
}

window.onload = function() {
	var container = document.getElementById("container");
	var buttonList = document.getElementsByTagName("input");
	var queue = {
		str: [],

		leftPush: function(arr) {
			for (var cur in arr) {
				this.str.unshift(arr[cur]);
			}
			this.paint();
		},

		rightPush: function(arr) {
            for (var cur in arr) {
                this.str.push(arr[cur]);
            }
            this.paint();
        },
        
        isEmpty: function() {
            return (this.str.length == 0);
        },

        leftPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.shift());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },
        
        rightPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },
        
        paint: function() {
            var str = "";
            each(this.str, function(item){str += ("<div>" + item + "</div>")});
            container.innerHTML = str;
            addDivDelEvent();
        },
        
        deleteID: function(id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        }
	}

	    //为container中的每个div绑定删除函数
    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            //这里要使用闭包，否则绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
            addEvent(container.childNodes[cur], "click", function(cur) {
                return function(){return queue.deleteID(cur)};
            }(cur));
        }
    }

    //查询内容
    function searchDivContent(text) {
    	/*for (var cur = 0; cur < container.childNodes.length; cur++) {
    		container.childNodes[cur].style.color = "#fff";
    		container.childNodes[cur].style.background = "#f00";
    	}*/
    	for (var cur = 0; cur < container.childNodes.length; cur++) {
    		if (container.childNodes[cur].innerHTML.indexOf(text) != -1) {
    			console.log(container.childNodes[cur].innerHTML);
    			container.childNodes[cur].style.color = "#66CD00";
    			container.childNodes[cur].style.background = "#030303";
    		}
    	}
    }

    //为4个按钮绑定函数
    addEvent(buttonList[0], "click", function() {
        var input = spiltInput(trim((document.getElementById("inputbox")).value));
        queue.leftPush(input);

    });
    addEvent(buttonList[1], "click", function() {
        var input = spiltInput(trim((document.getElementById("inputbox")).value));
        queue.rightPush(input);
    });
    addEvent(buttonList[2], "click", function(){queue.leftPop()});
    addEvent(buttonList[3], "click", function(){queue.rightPop()});
    addEvent(buttonList[5], "click", function() {
        var inputValue = buttonList[4].value;
        searchDivContent(inputValue);
    });
}