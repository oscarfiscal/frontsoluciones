<!-- @format -->

<template>
  <div class="w-100 vh-100">
    <ImageBackground class="position-absolute" />
    <div class="container-fluid fadeInDown w-100 h-100 m-0 p-0">
      <!--<NavBar/>-->
      <div class="row w-100 d-flex h-100">
        <div class="col-2 col-md-3 col-lg-4"></div>
        <div class="d-none d-lg-block col-lg-4"></div>
        <div
          id=""
          class="fadeIn p-0 shadow border rounded bg-white text-center col-8 col-md-6 col-lg-4 align-self-center"
        >
          <!-- Icon -->
          <div class="fadeIn first">
            <img src="@/assets/p1.gif" id="icon" alt="logo sunny" />
          </div>

          <!-- Login Form -->
          <v-form class="container">
            <v-text-field
              prepend-icon="mdi-mail"
              type="email"
              id="login"
              class="fadeIn second"
              name="email"
              placeholder="Correo electrónico"
              :rules="emailRules"
              v-model="usuario.email"
            />

            <v-text-field
              v-model="usuario.password"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                (v) =>
                  v.length >= 8 ||
                  'Minimo 8 caracteres entre Mayusculas y minusculas',
              ]"
              prepend-icon="mdi-lock-open-outline"
              :type="show3 ? 'text' : 'password'"
              name="input-10-2"
              label="Contraseña"
              value="wqfasds"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>

            <v-btn
              x-large
              class="boton btn-lg btn-block border-0 text-center text-white inline-block w-100 p-3 mb-3"
              style="background-color: #fcbf00"
              :loading="loading"
              @click="login"
            >
              Ingresar
            </v-btn>
          </v-form>
          <!--{{ usuario }}-->

          <!-- Remind Passowrd -->
          <div id="formFooter">
            <a class="underlineHover" href="#">Olvido su contraseña?</a>
          </div>
          <v-alert
            color="red"
            dense
            dismissible
            elevation="24"
            icon="mdi-lock-open-outline"
            prominent
            type="error"
            v-if="usuario.error"
          >
            {{ usuario.error_msg }}
          </v-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ImageBackground from "@/components/ImageBackground";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Home",
  components: {
    ImageBackground,
  },

  data: function () {
    return {
      loader: null,
      loading: false,
      show3: false,
      show4: false,
      usuario: {
        email: "",
        password: "",
        error: false,
        error_msg: "",
      },
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Ingresa un correo valido",
      ],
    };
  },

  methods: {
    login() {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.usuario.email,
          password: this.usuario.password,
        })
        .then((response) => {
          if (response.data.status == "ok") {
            localStorage.user = response.data.user;
            this.$router.push("mascota");
          } else {
            this.usuario.error = true;
            this.usuario.error_msg = response.data.message;
          }
        })
        .catch((error) => {
          let er = error.response.data.errors;

          let mensaje = "Error no identificado";
          if (er.email) {
            mensaje = er.email[0];
          } else if (er.password) {
            mensaje = er.password[0];
          }
          swal("Error", mensaje, "error");
        });
    },
  },
};
</script>

<style>
/**
 * /* BASIC
 *
 * @format
 */

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

.a {
  color: #ff5e00;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  left: 300px;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #fcbf00;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 40%;
  max-width: 150px;
}
</style>
