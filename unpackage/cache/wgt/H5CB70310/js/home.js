var slides = document.getElementsByClassName("slide");
var currentSlide = 0;

check_manager();
// show_1('{"result": "wwd&\u5f20\u96f7&lry&"}');

function showSlide(n) {
    // 隐藏当前的幻灯片
    slides[currentSlide].classList.remove("active");

    // 计算下一个幻灯片的索引
    currentSlide = (n + slides.length) % slides.length;

    // 显示下一个幻灯片
    slides[currentSlide].classList.add("active");
}

// 自动播放幻灯片
setInterval(function () {
    showSlide(currentSlide + 1);
}, 3000);

function generate(word) {
    var pubkeyHex =
        "61c83cdfdc8ef60794e9a12a04107c6d3873c6db585b280da45d94f2ee06495d469fc41e5d4ee96ad3575f3add0657381f22694cc1983ed77b611acc3197b7c9";
    var keyCollection = [];
    var item = '';
    var encryptData = sm2Encrypt(word, pubkeyHex, 1);
    console.log(encryptData)
    return encryptData
}

function show_1(data) {
    var table = document.getElementById("managers");
    var head = `<table>
                        <thead>
                            <tr>
                            <th>头像</th>
                            <th>姓名</th>
                            </tr>
                        </thead>
                        <tbody>`;
    var info = data.split('&')
    var body = ''
    for (var i = 0; i < info.length; i++) {
        body += `<tr>
        <td><img src="./img/` + (i % 6 + 1) + `.png" class="png"></td>
        <td>` + info[i] + `</td>
        </tr>`
    }
    var end = '</tbody></table>'
    table.innerHTML = head + body + end;
}

function show_users(data) {
    let table = document.getElementById("managers");
    let head = `<table>
                        <thead>
                            <tr>
                            <th>头像</th>
                            <th>姓名</th>
                            <th>注册时间</th>
                            </tr>
                        </thead>
                        <tbody>`;
    let body = ''
    for (let key in data) {
        body += `<tr>
        <td><img src='data:image/jpeg;base64,` + data[key].avatar + `'class="jpeg" style='width:30%;height:auto;'></td>
        <td>` + key + `</td>
        <td>` + data[key].time + `</td>
        </tr>`
    }
    let end = '</tbody></table>'
    table.innerHTML = head + body + end;
}

// function check_manager() {
//
//     var xhr;
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xhr.responseType = 'json';
//     xhr.open('POST', "http://101.43.61.192:8080/get_admins/", true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 let jsonObj = xhr.response
//                 var chineseCharacter = unescape(jsonObj.result.replace(/\\u/g, "%u"));
//                 show_1(chineseCharacter);
//             } else {
//                 alert("connection error");
//             }
//         }
//     }
//     xhr.send(
//     );
// }

function check_manager() {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.responseType = 'json';
    xhr.open('POST', "http://101.43.61.192:8080/get_users/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let jsonObj = xhr.response
                show_users(jsonObj);
            } else {
                // alert("connection error");
            }
        }
    }
    xhr.send(
    );
}