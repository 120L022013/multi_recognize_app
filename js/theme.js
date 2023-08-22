function getSelectedValue() {
    var selectedValue = document.querySelector('input[name="theme"]:checked').value;
    switch_theme(selectedValue.substring(5))
  }

  function switch_theme(i){
    var body = document.getElementById("body");
    body.className="theme"+i;
  }