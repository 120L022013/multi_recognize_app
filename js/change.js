function formReset() {
    document.getElementById("change_id").value = "";
}

function create() {
    var id = document.getElementById("change_id").value;
    var permission = document.getElementById("permission").value;
    // 创建对象
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.responseType = 'json';
    xhr.open('POST', "http://101.43.61.192:8080/app_set_permission/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let jsonObj = xhr.response
                if (jsonObj.result == 'ok') {
                    alert("更改成功");
                } else {
                    alert("id错误");
                }
            }
        }
    }
    xhr.send(
        "id=" + generate(id) +
        "&permission=" + generate(permission)
    );
}
