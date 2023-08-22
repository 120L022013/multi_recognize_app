const btn = document.getElementsByName("reg_button")[0].addEventListener("click", regist);

function regist() {
    var User_id = document.getElementById("reg_name").value;
    var password = document.getElementById("reg_password").value;
    // 创建对象
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.responseType = 'json';
    xhr.open('POST', "http://101.43.61.192:8080/app_regis/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                var jsonObj = xhr.response
                if (jsonObj.result == 'ok') {
                    alert("注册成功");
                } else {
                    alert("id重复或无效");
                }
            }
        }
    }

    xhr.send(
        "username=" + User_id +
        "&password=" + sha1(password)
    );
}