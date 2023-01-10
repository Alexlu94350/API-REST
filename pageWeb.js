<!DOCTYPE html>
<html>
<head>
  <script>
    function getData() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("users").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "get_users.php", true);
      xhttp.send();
    }
  </script>
</head>
<body onload="getData()">
  <table id="users"></table>
</body>
</html>
