function show_res(){
	var aft = document.getElementById('res');
	var bef = document.getElementById('check_bef_box');
	bef.classList.add('hide');
	aft.classList.remove('hide');
}
function back(){
	var bef = document.getElementById('res');
	var aft = document.getElementById('check_bef_box');
	bef.classList.add('hide');
	aft.classList.remove('hide');
}

// 测试
// var dictionary={"2023-07-30 13:56:10":"67295183", "2023-07-31 15:32:03": "67295183", "2023-07-31 15:37:19": "67295183"}
// const jstr=JSON.stringify(dictionary)
// show_record(jstr)

function time_statistics(dict){
	var keys = Object.keys(dict);
	var temp_time = 0;
	var time_num_list=[0,0,0,0];
	for (i=0;i<keys.length;i++){
		
		temp_time=keys[i].split(' ')[1].split(':')[0];
		if (temp_time<=10 && temp_time>6){
			time_num_list[0]+=1;
		}
		else if(temp_time<=14 && temp_time>10){
			time_num_list[1]+=1;
		}
		else if(temp_time<=20 && temp_time>14){
			time_num_list[2]+=1;
		}
		else if(temp_time>20 || temp_time<=6){
			time_num_list[3]+=1;
		}
	}
	draw_canvas(time_num_list,['早晨','中午','下午','夜晚'] );
	
}

function show_record(dict) {
	
    var result = document.getElementById("chart");
    // 写出表格的头
    var head = `<table><thead>
                    <tr>
                    <th>通过时间</th>
                    <th>ID</th>
                    </tr>
                </thead>`;
    var body = "";
	time_statistics(dict);
    var keys = Object.keys(dict);
    for (i = 0; i < keys.length; i++) {
        body += "<tr><td>" + keys[i] + "</td><td>" + dict[keys[i]] + "</td></tr>";
    }
    body += "</tbody></table>";
	
    result.innerHTML = head + body;
	show_res()
}

function check_record() {
    var id2 = document.getElementById("id2").value;
    var time2 = document.getElementById("time2").value;
    
    // 测试功能

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.responseType = 'json';
    xhr.open('POST', "http://101.43.61.192:8080/get_record_id/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let jsonObj = xhr.response
                show_record(jsonObj);
            } else {
                alert("connection error");
            }
        }
    }

    xhr.send(
        "id=" + generate(id2) + "&period=" + time2
    );

}

function check_all_record(){
	var time3 = document.getElementById("time3").value;
	
	// 测试功能
	
	var xhr;
	if (window.XMLHttpRequest) {
	    xhr = new XMLHttpRequest();
	} else {
	    xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.responseType = 'json';
	xhr.open('POST', "http://101.43.61.192:8080/get_record/", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4) {
	        if (xhr.status >= 200 && xhr.status < 300) {
	            let jsonObj = xhr.response;
	            show_record(jsonObj);
	        } else {
	            alert("connection error");
	        }
	    }
	}
	
	xhr.send(
	    "time=" + time3
	);
	
}




function check_per() {

    var id1 = document.getElementById("id1").value;
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.responseType = 'json';
    xhr.open('POST', "http://101.43.61.192:8080/get_permission/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let jsonObj = xhr.response;
                alert("用户" + id1 + "的通过权限为：" + jsonObj.result);
            } else {
                alert("connection error");
            }
        }
    }
    xhr.send(
        "id=" + generate(id1)
    );
}
var i4 = 1;
var dict4 = {'2023-8-18 05:02:20':'<img src="./img/j3.png" style="width=30px;height=40px;">','2023-8-18 05:04:18':'<img src=./img/j4.png>','2023-8-18 15:26:17':'<img src=./img/3.png>'};
function check_record4() {
    console.log(dict4)
    var result = document.getElementById("chart");
    // 写出表格的头
    var head = `<table><thead style="width=100%">
                    <tr>
                    <th>通过时间</th>
                    <th>拍摄图片</th>
                    </tr>
                </thead>`;
    var body = "";
	var keys = Object.keys(dict4); // 获取字典中的所有键
	var slicedKeys = keys.slice(0, i4); // 获取前i4个键
	var slicedDict = {};
	slicedKeys.forEach(function(key) {
	  slicedDict[key] = dict4[key]; // 构建新的切片字典
	});
    time_statistics(slicedDict);
    var keys = Object.keys(dict4);
    for (j = 0; j < i4; j++) {
        body += "<tr><td>" + keys[j] + "</td><td>" + dict4[keys[j]] + "</td></tr>";
    }
    body += "</tbody></table>";
    i4++;
    result.innerHTML = head + body;
    show_res()     
}

function draw_canvas(data,labels){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	// 设置圆心坐标和半径
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = canvas.height / 3;
	
	// 设置起始角度和结束角度（以弧度为单位）
	var startAngle = 0;
	var endAngle = Math.PI * 2;
	
	
	// 绘制扇形
	var total = data.reduce((a, b) => a + b, 0); // 计算总和
	var currentAngle = startAngle;
	
	for (var i = 0; i < data.length; i++) {
	  // 计算扇形的结束角度
	  var sliceAngle = (data[i] / total) * (endAngle - startAngle);
	  var sliceEndAngle = currentAngle + sliceAngle;
	
	  // 绘制扇形
	  ctx.beginPath();
	  ctx.moveTo(centerX, centerY);
	  ctx.arc(centerX, centerY, radius, currentAngle, sliceEndAngle);
	  ctx.closePath();
	
	  // 设置填充颜色
	  var color = getRandomColor();
	  ctx.fillStyle = color;
	  ctx.fill();
	
	  // 显示数据和标签
	  var labelX = centerX + Math.cos(currentAngle + sliceAngle / 2) * (radius/3*2 );
	  var labelY = centerY + Math.sin(currentAngle + sliceAngle / 2) * (radius/3*2 );
	  ctx.fillStyle = "#000";
	  ctx.fillText(data[i], labelX, labelY);
	  ctx.fillText(labels[i], labelX, labelY + 20);
	
	  // 更新角度
	  currentAngle = sliceEndAngle;
	}
}


// 生成随机颜色
function getRandomColor() {
  var letters = "CDEF456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}