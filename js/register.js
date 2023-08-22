const btn = document.getElementsByName("reg_button")[0].addEventListener("click", regist);

function regist() {
    
    var User_per= document.getElementById("reg_permission").value;
	var input = document.getElementById("imageInput");
	
    // 创建对象
    // var xhr;
    // if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    //     xhr = new XMLHttpRequest();
    // } else {// code for IE6, IE5
    //     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // xhr.responseType = 'json';
    // xhr.open('POST', "http://101.43.61.192:8080/regis/", true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             var jsonObj = xhr.response;
    //             if (jsonObj.result == 'yes') {
    //                 alert("注册成功");
    //             } else {
    //                 alert("用户已注册或图像无效");
    //             }
    //         }
    //     }
    // }
	const formData = new FormData();
	// formData.append('username', User_id);
	// formData.append('password', sha1(password));
	
	formData.append('permission',generate(User_per));
	formData.append('rgb', input.files[0]);
	formData.append('ir', input.files[1]);
	formData.append('depth', input.files[2]);
  //   xhr.send(
		// formData
  //   );
	fetch('http://101.43.61.192:8080/regis_app/',{
		method:'POST',
		body:formData
	})
	.then(response =>{
		if (response.ok) {
			return response.json(); 
		    console.log('图片上传成功');
		  } else {
		    console.error('图片上传失败');
		  }
	})
	.then(data => {
	  // 处理解析后的数据
	  alert(data.result); // 输出解析后的数据
	})
	.catch(error =>{
		alert('注册信息已提交，请耐心等待');
		console.error('发生错误:', error);
	});
}
function showPreview() {
	var previewContainer = document.getElementById("previewContainer");
	var input = document.getElementById("imageInput");
	var files = input.files;
	var maxImages = 1; // 最大图片数量
	if (files.length != maxImages) {
		alert("只能选择 " + maxImages + " 张图片");
		input.value = '';
		previewContainer.classList.add('hide');
		return;
	}
	
	previewContainer.classList.remove('hide');
	previewContainer.innerHTML = "";

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var reader = new FileReader();

		reader.onload = function(e) {
			var img = document.createElement("img");
			img.src = e.target.result;
			previewContainer.appendChild(img);
		};

		reader.readAsDataURL(file);
	}
}
