var car = document.getElementById("car");
var submit = document.getElementById("submit");

// 给一个element绑定一个针对event事件的响应，响应函数为listener
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

//初始化网格页面
function init() {
    var row = document.getElementsByTagName("li");
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var div = document.createElement("div");
            row[i + 10].appendChild(div);/*后10个是col-container里的li*/
        }
    }
    car.style.left = Math.ceil(Math.random() * 9) * 40+ "px";/*[0,1)*/
    car.style.top = Math.ceil(Math.random() * 9) * 40+ "px";
    car.style.transform = "rotateZ(0deg)";
}

//设置方向
function setDirection(degree) {
    var preDegree = parseInt((car.style.transform).match(/[-]*\d+/g)[0]);/*全局 [0]*/
    car.style.transform = 'rotateZ(' + (degree + preDegree) + 'deg)';
}

//处理指令
var command = {
    commandGo: function(num) {
        var degree = parseInt((car.style.transform).match(/[-]*\d+/g)[0]);
        if (num !== 111) {
            degree = num;
        }
        switch(degree % 360) {
            case -0:
            case 0: {
                if (car.style.top === '40px') {/*绝对定位以方块的左、下两边为参考，注意临界值的确定。*/
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.top = (parseInt(car.style.top) - 40) + 'px';
                break;
            }
            case -270:
            case 90: {
                if (car.style.left === '360px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.left = (parseInt(car.style.left) + 40) + 'px';
                break;
            }            
            case -180:
            case 180: {
                if (car.style.top === '400px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.top = (parseInt(car.style.top) + 40) + 'px';
                break;
            }
            case -90:
            case 270: {
                if (car.style.left === '0px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.left = (parseInt(car.style.left) - 40) + 'px';
                break;
            }
        }
    },
    
    commandLeft: function() {
        setDirection(-90);
    },
    
    commandRight: function() {
        setDirection(90);
    },
    
    commandBack: function() {
        setDirection(180);
    },

    commandTraTop: function() {
        this.commandGo(0);
    },
    
    commandTraLef: function() {
        this.commandGo(270);
    },
    
    commandTraRig: function() {
        this.commandGo(90);
    },
    
    commandTraBot: function() {
        this.commandGo(180);
    },
    
    commandMovTop: function() {
        car.style.transform = 'rotateZ(0deg)';
        this.commandGo(111);
    },
    
    commandMovLef: function() {
        car.style.transform = 'rotateZ(-90deg)';
        this.commandGo(111);
    },
    
    commandMovRig: function() {
        car.style.transform = 'rotateZ(90deg)';
        this.commandGo(111);
    },
    
    commandMovBot: function() {
        car.style.transform = 'rotateZ(180deg)';
        this.commandGo(111);
    } 
}

window.onload = function() {
    addEvent(submit, "click", function(){
        var inputValue = (document.getElementById("commandInput").value).toUpperCase();//转大写
        switch(inputValue) {
            case 'GO': return command.commandGo(111);
            case 'TRA TOP': return command.commandTraTop();
            case 'TRA LEF': return command.commandTraLef();
            case 'TRA RIG': return command.commandTraRig();
            case 'TRA BOT': return command.commandTraBot();
            case 'TUN LEF': return command.commandLeft();
            case 'TUN RIG': return command.commandRight();
            case 'TUN BAC': return command.commandBack();
            case 'MOV TOP': return command.commandMovTop();
            case 'MOV LEF': return command.commandMovLef();
            case 'MOV RIG': return command.commandMovRig();
            case 'MOV BOT': return command.commandMovBot();
        }
        alert("输入的指令有误！");
    });
    
    //方向键上下左右：GO, TUNBAC, TUNLEF, TUNRIG
    //键盘IJKL：TRATOP, TRABAC, TRALEF, TRARIG
    addEvent(document, "keyup", function(e) {
        var event = e || window.event;
        switch(event.keyCode) {
            case 37: return command.commandLeft();
            case 38: return command.commandGo(111);
            case 39: return command.commandRight();
            case 40: return command.commandBack();
            case 73: return command.commandTraTop();
            case 74: return command.commandTraLef();
            case 75: return command.commandTraBot();
            case 76: return command.commandTraRig();
            case 87: return command.commandMovTop();
            case 65: return command.commandMovLef();
            case 68: return command.commandMovRig();
            case 83: return command.commandMovBot();
        }
    });
    
    init();
}