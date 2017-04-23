$ = function(x){
    return document.querySelector(x);//返回匹配指定选择器的第一个元素
};
$a = function(x){
    return document.querySelectorAll(x);//返回所有的元素
};

var index = []; //索引记录数组
var found = []; //搜索结果数组

//根据模式执行相应任务
//call https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
function execute(node, mode) {
    switch (mode) {
        case "traversal":
            index.push([].indexOf.call($a("div"), node));//indexOf返回某个指定的字符串值在字符串中首次出现的位置,在这里应是把DOM当作字符串。
            break;
        case "search":
            index.push([].indexOf.call($a("div"), node));
            if (node.innerText.split(/\n/,1) == $("#search").value.trim()) {//按换行符分割;trim():去除空白
                found.push([].indexOf.call($a("div"),node));
            }
            else {
                found.push("");//最后index和found数组的个数都是一样的，只是found中有些值是空的
            }
            break;
    }
}

//深度优先
function DF(node, mode) {
    execute(node, mode);
    if (node.children.length != 0) {
        for (var i = 0; i < node.children.length; i++) {
            DF(node.children[i], mode);
        }
    }
}

//广度优先--这种递归的写法第一次见
var queue = [];
function BF(node, mode) {
    if (!node) {
        return;
    }
    queue.push(node);
    execute(node, mode);
    BF(node.nextElementSibling, mode);//
    node = queue.shift();
    BF(node.firstElementChild, mode);//
}

//重置所有元素背景色
function resetBGC() {
    for (var i in $a("div")) {
        $a("div")[i].className = "";
    }
}

//生成动画--略难
var frame = 0; //动画帧计数器
function anime() {
    lock(true); //锁定按钮
    resetBGC(); //重置背景色
    $a("div")[index[frame]].className = "traversal";
    if ($a("div")[found[frame]]) {
        $a("div")[found[frame]].id = "found";
    }
    frame++;
    if (frame == index.length) { //递归出口
        frame = 0; //计数器清零
        setTimeout(resetBGC, delay); //清除最后一个元素的背景色
        lock(false); //解锁按钮
        if (!found.length) {
            console.log("mode:遍历");
        }
        else if(!found.join("").length){
            alert("搜索不到");
        }
    }
    else {
        setTimeout(anime, delay);
    };
}

//捕获radio选中项:DForBF,动画速度
function radioCheck() {
    for (var i = 0; i < 3; i++) {
        if ($a("input")[i].checked) {
            return $a("input")[i].value;
        };
    };
}

//遍历开始
function traversal(DForBF, mode) {
    index.length = 0; //清空索引数组
    found.length = 0;
    switch (DForBF) {
        case "DF": DF($("div"), mode);
            break;
        case "BF": BF($("div"), mode);
            break;
    }
    setTimeout(anime, delay);
}

//遍历按钮
$a("button")[0].onclick = function () {
    traversal(radioCheck(),"traversal");
}

//查询按钮
$a("button")[1].onclick = function () {
    for (var i in $a("div")) {
        if ($a("div")[i].id) {
            $a("div")[i].removeAttribute("id");
        }
    }
    traversal(radioCheck(),"search");
}

//标记焦点元素
$("section").onclick = function (e) {
    if(!e.target.id){//??
        e.target.id = "focus";
    }
    else {
        e.target.removeAttribute("id");
    }
}

//添加
$a("button")[2].onclick = function () {
    for (var i = 0; i < $a("#focus").length; i++) {
        $a("#focus")[i].innerHTML += "<div>"+$("textarea").value.trim()+"</div>";
    }
}

//删除用小工具。对于被删列表中的每个元素，取其父元素删它。
function removeElement(nodelist) {
    for (var i = 0; i < nodelist.length; i++) {
        nodelist[i].parentElement.removeChild(nodelist[i]);
    }
}

//删除按钮
$a("button")[3].onclick = function () {
    removeElement($a("#focus"));
}

//锁定按钮
function lock(x) {
    for(var i in $a("button")){
        $a("button")[i].disabled = x;
    };
}

//动画速度滑块
var delay = 500;
$("#range").onchange = function () {delay = $("#range").value;};