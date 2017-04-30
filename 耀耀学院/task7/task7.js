var tableHeaderData = ["姓名", "语文", "数学", "英语", "总分"];

var tableData = [
    ["小明", 80, 90, 70],
    ["小红", 90, 60, 90],
    ["小亮", 60, 100, 70],
]

var sortFlag = [true,true,true,true,true];

//生成表头
function buildTableHeader(tableHeaderData) {
    var tableBody = document.getElementById("myTable");
    var tableTr = document.createElement("tr");
    var tableTd = new Array();

    for (var i = 0; i < tableHeaderData.length; i++) {
        tableTd[i] = document.createElement("th");
        if (i > 0) {
            tableTd[i].class = tableTd[i].className = "sortBtn";
            tableTd[i].id = "flag" + i;
        }
        tableTd[i].appendChild(document.createTextNode(tableHeaderData[i]));//创建文本节点
        tableTr.appendChild(tableTd[i]);
        switch (i) {
            case 0:
                break;
            case 1:
                tableTd[i].id = "chineseScore";
                tableTd[i].onclick = function () {
                    sortTable(1);
                    buildTable(tableData);
                }
                break;
            case 2:
                tableTd[i].id = "mathScore";
                tableTd[i].onclick = function () {
                    sortTable(2);
                    buildTable(tableData);
                }
                break;
            case 3:
                tableTd[i].id = "englishScore";
                tableTd[i].onclick = function () {
                    sortTable(3);
                    buildTable(tableData);
                }
                break;
            case 4:
                tableTd[i].id = "totalScore";
                tableTd[i].onclick = function () {
                    sortTable(4);
                    buildTable(tableData);
                }
                break;
            default:
                break;
        }
    }
    tableBody.appendChild(tableTr);
}

//排序
function sortTable(num) {
    //console.log(sortFlag);
    function compare(a, b) {
        if (sortFlag[num] == true) {//升序
            return a[num] - b[num];
        } else {//降序
            return b[num] - a[num];
        }
    }
    sortFlag[num] = !sortFlag[num];
    //console.log(sortFlag);
    tableData.sort(compare);
    return tableData;
}

//求总分
function getTotal(tableData) {
    for (var i = 0; i < tableData.length; i++) {
        var temp = 0;
        for (var j = 1; j < tableData[i].length; j++) {
            temp += tableData[i][j];
        }
        var flag = tableData[i].length;
        tableData[i][flag] = temp;
    }
    return tableData;
}

//生成表格主体
function buildTable(tableData) {
    var tableBody = document.getElementById("myTable");
    var tableBodyChilds = tableBody.childNodes;
    for (var a = tableBodyChilds.length - 1; a > 1; a--) {
        tableBody.removeChild(tableBodyChilds[a]);
    }
    var tableTr = new Array();
    var tableTd = new Array();
    for (var i = 0; i < tableData.length; i++) {
        tableTr[i] = document.createElement("tr");
        tableTd[i] = new Array();
        for (var j = 0; j < tableData[i].length; j++) {
            tableTd[i][j] = document.createElement("td");
            tableTd[i][j].appendChild(document.createTextNode(tableData[i][j]));
            tableTr[i].appendChild(tableTd[i][j]);
        }
        tableBody.appendChild(tableTr[i]);
    }
}

window.onload = function () {
    buildTableHeader(tableHeaderData);
    getTotal(tableData);
    buildTable(tableData);
}