     const d = document,
       $form = d.querySelector(".contact-form"),
       $name = d.getElementById("name"),
      $email = d.getElementById("email"),
      $phone = d.getElementById("phone"),
    $subject = d.getElementById("subject"),
   $comments = d.getElementById("comments"),
     $loader = d.querySelector(".loader"),
   $response = d.querySelector(".response");

const checkEmail = () => {
  const $errorEmail = d.querySelector("#email ~ .error-txt"),
         emailRegex = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

    if(!$email.value.match(emailRegex)) {
      $email.classList.add("error");
      $email.parentElement.classList.add("error");

      if($email.value === "") {
        $errorEmail.innerText = "Email vacio";
      } else {
        $errorEmail.innerText = "Formato email inválido";
      }
    } else {
      $email.classList.remove("error");
      $email.parentElement.classList.remove("error");
    }
}


const checkInputs = () => {
  const $items = d.querySelectorAll(".item");

  for (const item of $items) {
    if (item.value === "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    } 

    if($items[1].value !== "") checkEmail();

    $items[1].addEventListener("keyup", (e) => {
      checkEmail();
    });

    item.addEventListener("keyup", (e) => {
      
      if(item.value === "") {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      } else {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      }
    });
  }
}

const sendEmail = () => {

  $loader.classList.remove("none");

  const bodyMessage = `Full Name: ${$name.value} <br> Email: ${$email.value} <br> Phone number: ${$phone.value} <br> Message: ${$comments.value}`
  Email.send({
    SecureToken: "6ab50d8b-02d4-40d8-bcb4-0813944c229f",
    To: "migueljacho2014@gmail.com",
    From: "migueljacho2014@gmail.com",
    Subject: $subject.value,
    Body: bodyMessage,
  })
    .then((message) => {
        if(message === "OK") {
          $response.innerHTML = `<h2>Mensaje enviado con éxito</h2>`
        } else {
          $response.innerHTML = `<h2>Error al enviar el mensaje</h2>`
        }
        
      })
    .finally(() => {
      $loader.classList.add("none");
      $response.classList.add("is-active");
      setTimeout(() => {
        $response.classList.remove("is-active");
      }, 4000);
    })
}

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if(!$name.classList.contains("error") && !$email.classList.contains("error") && !$phone.classList.contains("error") && !$subject.classList.contains("error") && !$comments.classList.contains("error")) {
    sendEmail();
    $form.reset();
  }
});

