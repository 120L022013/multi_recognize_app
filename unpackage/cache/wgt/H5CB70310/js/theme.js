function getSelectedValue() {
    var selectedValue = document.querySelector('input[name="theme"]:checked').value;
    console.log(selectedValue.substring(5));
    switch_theme(selectedValue.substring(5))
  }

  function switch_theme(i){
    var body = document.getElementById("body");
    body.className="theme"+i;
  }