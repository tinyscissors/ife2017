//获取元素对象
function g(el) { 
	return document.getElementById(el); 
}

//点击半透明遮罩和关闭按钮时，使半透明遮罩和登陆框不可见
g("mask").onclick = g("closeBtn").onclick = function () {
    g("mask").style.display = "none";
    g("loginBox").style.display = "none";
}

//点击页面标题栏“登录”链接时，使半透明遮罩和登陆框可见
g("loginLink").onclick = function () {
    g("mask").style.display = "block";
    g("loginBox").style.display = "block";
}

//函数: 自动居中
//scrollWidth,clientWidth,offsetWidth的区别: http://www.cnblogs.com/kongxianghai/p/4192032.html
function autoCenter(el) {
	var bodyW = document.documentElement.clientWidth;/*可视区宽度*/
    var bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth;/*元素的实际宽度*/
    var elH = el.offsetHeight;

    el.style.left = (bodyW - elW) / 2 + "px";/*固定定位*/
    el.style.top = (bodyH - elH) / 2 + "px";
}

//函数: 自动全屏
function fillToBody(el) {
	el.style.width = document.documentElement.clientWidth + "px";
    el.style.height = document.documentElement.clientHeight + "px";
}

var mouseOffsetX = 0;
var mouseOffsetY = 0;
var isDraging = false;

//关于offset: http://www.cnblogs.com/jscode/archive/2012/09/03/2669299.html
g("loginBoxHeader").addEventListener('mousedown', function (e) {
	var e = e || window.event;//
	//鼠标点击点离浮出层左边框的距离
    mouseOffsetX = e.pageX - g("loginBox").offsetLeft;/*pageX:鼠标指针的位置，相对于文档的左边缘。loginbox的offsetLeft相对于body*/
     //鼠标点击点离浮出层上边框的距离
    mouseOffsetY = e.pageY - g("loginBox").offsetTop;
    isDraging = true;
})

document.onmousemove = function (e) {
	var e = e || window.event;
    mouseX = e.pageX;
    mouseY = e.pageY;
    
    var moveX = 0;
    var moveY = 0;

    if (isDraging === true) {
    	moveX = mouseX - mouseOffsetX;
        moveY = mouseY - mouseOffsetY;

        //获取页面宽高度
        //document.documentElement.clientWidth 和 document.body.clientWidth 是不一样的!
        //http://zhaohe162.blog.163.com/blog/static/3821679720114952620980/
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        //获取浮出层的宽高度
        //offsetWidth 和 clientWidth 是不一样的!
        var loginBoxWidth = g("loginBox").offsetWidth;
        var loginBoxHeight = g("loginBox").offsetHeight;

        var maxMoveX = pageWidth - loginBoxWidth;
        var maxMoveY = pageHeight - loginBoxHeight;

        //moveX = moveX > 0 ? moveX : 0;
        //moveX = moveX < maxMoveX ? moveX : maxMoveX;
        moveX = Math.min(maxMoveX, Math.max(0, moveX));
        moveY = Math.min(maxMoveY, Math.max(0, moveY));
        g("loginBox").style.left = moveX + "px";
        g("loginBox").style.top = moveY + "px";
    }
}

var mousePanel, mouseCtrl, mouseType;
var moving = 0, mouseStartX = 0, mouseStartY = 0;
function onMouseDown(e, panel, ctrl, type) {/*ctrl块被按下时会触发*/
    var  e = e || window.event;

    //panel初始时的坐标（相对于浏览器窗口的位置）
    mouseStartX = e.pageX - ctrl.offsetLeft;//ctrl的offsetLeft相对于panel
    mouseStartY = e.pageY - ctrl.offsetTop;

    mousePanel = panel;
    mouseCtrl = ctrl;
    mouseType = type;

    moving = setInterval(onMove, 10);
}

function onMove() {/*ctrl块被按下时会执行该函数*/
	if (moving) {
		//浮出层移动后的宽高度
		var toX = mouseX - mouseStartX;//？？？这里为何不用重新定义mouseX
        var toY = mouseY - mouseStartY;
        //限定浮出层最大宽高度
        var maxToX = document.documentElement.clientWidth - mousePanel.offsetLeft - 10;
        var maxToY = document.documentElement.clientHeight - mousePanel.offsetTop - 10;

        toX = Math.min(maxToX, Math.max(toX, 300));
        toY = Math.min(maxToY, Math.max(toY, 200));

        switch (mouseType) {
            case "r":
                mouseCtrl.style.left = toX + "px";//ctrl相对于panel定位
                mousePanel.style.width = toX + "px";
                break;
            case "b":
                mouseCtrl.style.top = toY + "px";
                mousePanel.style.height = toY + "px";
                break;
            case "rb":
                console.log(mouseCtrl.style.left);
                mouseCtrl.style.left = toX-8 + "px";//ctrl的定位画个图就清楚了
                mouseCtrl.style.top = toY-8 + "px";
                mousePanel.style.width = toX + "px";
                mousePanel.style.height = toY + "px";
                break;
        }
	}
}

document.onmouseup = function () {
	isDraging = false;
	clearInterval(moving);
    moving = 0;
    var cls = document.getElementsByClassName("resizable-box");
    for (var i = 0; i < cls.length; i++) {
        cls[i].style.left = "";
        cls[i].style.top = "";
    }
}

function resizable(el) {
	var panel = el;
    var rightBox = document.createElement("div");
    var bottomBox = document.createElement("div");
    var rightBottomBox = document.createElement("div");
    rightBox.class = rightBox.className = "resizable-right resizable-box";
    bottomBox.class = bottomBox.className = "resizable-bottom resizable-box";
    rightBottomBox.class = rightBottomBox.className = "resizable-right-bottom resizable-box";

    panel.appendChild(rightBox);
    panel.appendChild(bottomBox);
    panel.appendChild(rightBottomBox);

    rightBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, rightBox, "r");
    })
    bottomBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, bottomBox, "b");
    })
    rightBottomBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, rightBottomBox, "rb");
    })
}

//3个ctrl、login-box-header这四部分位于不同位置，不会重合，也就不会同时触发某事件。
window.onload = window.onresize = function () {
	autoCenter(g("loginBox"));
	fillToBody(g("mask"));
	resizable(g("loginBox"));
}