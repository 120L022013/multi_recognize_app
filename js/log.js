const btn = document.getElementsByName("root_button")[0].addEventListener("click", login);

function generate(word) {
    var pubkeyHex =
        "61c83cdfdc8ef60794e9a12a04107c6d3873c6db585b280da45d94f2ee06495d469fc41e5d4ee96ad3575f3add0657381f22694cc1983ed77b611acc3197b7c9";
    var keyCollection = [];
    var item = '';
    var encryptData = sm2Encrypt(word, pubkeyHex, 1);
    return encryptData
}

function login() {
    var name = document.getElementById("Log_name").value;
    var url = "http://101.43.61.192:8080/do_login/";
    var xhr = new XMLHttpRequest()
    // try{
    //     // Opera 8.0+, Firefox, Chrome, Safari
    //     xhr = new XMLHttpRequest();
    // }catch (e){
    //     // IE 浏览器处理
    //     try{
    //         xhr = new ActiveXObject("Msxml2.XMLHTTP");
    //     }catch (e) {
    //         try{
    //             xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //         }catch (e){
    //             // 错误处理
    //             alert("Your browser broke!");
    //             return false;
    //         }
    //     }
    // }
    xhr.withCredentials = true;
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    xhr.send(
        "username=" + name
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let result = JSON.parse(xhr.response).result;
            if (result === "error") {
                alert('there are no such name!');
            } else {
                var password = document.getElementById("Log_password").value
                console.log("密码 " + password)
                var pwd_hash = sha1(password)
                console.log("密码哈希值 " + pwd_hash)
                var param = sha1(pwd_hash + result)
                console.log("计算结果 " + param)
                var xhr2 = new XMLHttpRequest
                xhr2.withCredentials = true;
                xhr2.open('POST', "http://101.43.61.192:8080/do_login2/");
                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
                xhr2.send(
                    "result=" + param
                );
                xhr2.onreadystatechange = function () {
                    if (xhr2.readyState === 4 && xhr2.status === 200) {
                        let result = JSON.parse(xhr2.response).result;
                        console.log(result)
                        if (result === "ok") {
                            window.location.replace("./home.html")
                        } else {
                            alert("pwd error!")
                        }
                    }
                    // if(xhr2.readyState==4){
                    //     if (xhr2.status>=200 && xhr2.status<300){
                    //         var result = JSON.parse(xhr2.responseText).result;
                    //         if(result == "ok"){
                    //             window.alert("1")
                    //             window.location.replace("/to_manage/")
                    //         }else{
                    //             window.alert("pwd error!")
                    //         }
                    //     }
                    // }
                }
            }
        }
    }
}

function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

// 显示Cookie
// const cookieValue = getCookie('cookieName');
// if (cookieValue) {
//     console.log('Cookie value:', cookieValue);
//     // 在页面上显示Cookie值
//     document.getElementById('cookieValue').textContent = cookieValue;
// } else {
//     console.log('Cookie not found');
// }

