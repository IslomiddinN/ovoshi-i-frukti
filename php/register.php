<?php
// После успешной обработки регистрации
echo '<script>
  const userData = {
    name: "'.htmlspecialchars($_POST['name'], ENT_QUOTES).'",
    phone: "'.htmlspecialchars($_POST['phone'], ENT_QUOTES).'",
    email: "'.htmlspecialchars($_POST['email'], ENT_QUOTES).'"
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  window.location.href = "profile.html";
</script>';
