export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");

  $form.classList.add("contact-form");

  $styles.innerHTML = `
  /******anim-loader*****/
  .loader {
    width: 100px;
    height: 100px;
    position: relative;
    margin-top: 1rem;
  }
  
  .loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(calc((360deg / 20) * var(--i)));
  }
  
  .loader span::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: transparent;
    animation: anim .8s linear infinite;
    animation-delay: calc((.8s / 20) * var(--i));
  }
  
  @keyframes anim {
    0% {
      transform: scale(1);
      background-color: #0ef;
      box-shadow: 0 0 10px #0ef,
                  0 0 20px #0ef,
                  0 0 40px #0ef;
    }
  
    80%,
    100% {
      transform: scale(0);
      background-color: #0ef;
      box-shadow: none;
    }
  }
  .contact-form {
    --form-ok-color: #4caf50;
    --form-error-color: #f44336;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .contact-form>* {
    padding: 0.5rem;
    margin: 1rem auto;
    display: block;
    width: 100%;
  }

  .contact-form textarea {
    resize: none;
  }

  .contact-form legend {
    color: #fff;
  }

  .contact-form legend,
  .contact-form-response {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 1rem;
    font-family: sans-serif;
    outline: none;
    background-color: transparent;
    border-radius: .5rem;
    background-image: linear-gradient(135deg, transparent, rgba(0, 0, 0, .4));
    backdrop-filter: blur(15px);
    color: #fff;
  }

  .contact-form input[type="submit"] {
    width: 50%;
    font-weight: bold;
    cursor: pointer;
    background-image: linear-gradient(transparent, rgba(25, 203, 183, 0.3));
    backdrop-filter: blur(15px);
  }

  .contact-form *::placeholder {
    color: #fff;
  }

  .contact-form [required]:valid {
    border: thin solid var(--form-ok-color);
  }

  .contact-form [required]:invalid {
    border: thin solid var(--form-error-color);
  }

  .contact-form-error {
    margin-top: -1rem;
    font-size: 80%;
    background-color: var(--form-error-color);
    color: #fff;
    transition: all 800ms ease;
  }

  .contact-form-error.is-active {
    display: block;
    animation: show-message 1s 1 normal 0s ease-out both;
  }

  .contact-form-response {
    color: #fff;
  }

  .none {
    display: none;
  }

  @keyframes show-message {
    0% {
      visibility: hidden;
      opacity: 0;
    }

    100% {
      visibility: visible;
      opacity: 1;
    }
  }
  `;

  $form.innerHTML = `
  <legend>Envíanos tus comentarios</legend>
    <input type="text" name="name" placeholder="Escribe tu nombre"
      title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" autocomplete="off" required>
    <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
      data-pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" autocomplete="off" required>
    <input type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es requerido" autocomplete="off" required>
    <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios"
      title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" autocomplete="off" required></textarea>
    <input type="submit" value="Enviar">
    <div class="contact-form-loader none">
      <div class="loader">
        <span style="--i:0;"></span>
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7;"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>
        <span style="--i:16;"></span>
        <span style="--i:17;"></span>
        <span style="--i:18;"></span>
        <span style="--i:19;"></span>
      </div>
    </div>
    <div class="contact-form-response none">
      <p>Los datos han sido enviados</p>
    </div>
  `;

  function validationsForm() {
    const $form = d.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]"),
      $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.classList.add("contact-form-error", "none");
      $span.textContent = input.title;
      $span.id = input.name;
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          !regex.test($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }

        if (!pattern) {
          !$input.value
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    d.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target === $form) {
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/migueljacho2010@hotmail.com", {
          method: "POST",
          body: new FormData(e.target),
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res)))
          .then((json) => {
            console.log(json);
            $response.innerHTML = json.message;
            $response.classList.remove("none");
            e.target.reset();
          })
          .catch((err) => {
            let message = err.statusText;
            $response.innerHTML = `${err.status}: ${message}`;
          })
          .finally(() => {
            $loader.classList.add("none");
            setTimeout(() => {
              $response.classList.add("none");
            }, 3000);
          });
      }
    });
  }

  setTimeout(() => validationsForm(), 100);

  return $form;
}
