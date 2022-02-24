<!-- @format -->

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <form>
              <v-text-field
                v-model="nombremascota"
                class="fadeIn first"
                label="Nombre mascota"
                prepend-icon="mdi-ballot"
                type="text"
              ></v-text-field>
              <v-select
                v-model="raza"
                :items="raza"
                item-text="state"
                item-value="abbr"
                prepend-icon="mdi-dog"
                label="raza"
                persistent-hint
                return-object
                single-line
              ></v-select>
              <v-text-field
                v-model="fechanacimiento"
                class="fadeIn third"
                label="fecha de nacimiento"
                prepend-icon="mdi-ballot"
                type="date"
              ></v-text-field>

              <v-text-field
                v-model="nombrepropetario"
                class="fadeIn fourth"
                label="Nombre propetario"
                prepend-icon="mdi-account-circle"
                type="Text"
              ></v-text-field>
              <v-text-field
                v-model="descripcion"
                class="fadeIn fourth"
                label="descripcion"
                prepend-icon="mdi-order-bool-descending-variant"
                type="Text"
              ></v-text-field>
              <v-file-input
                id="photo_mascota"
                class="fadeIn fourth"
                :rules="[(v) => !!v || 'Campo Obligatorio *']"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Seleccione una imagen"
                prepend-icon="mdi-file-image-outline"
                label="Avatar"
              ></v-file-input>

              <v-btn
                x-large
                class="boton btn-lg btn-block border-0 text-center text-white inline-block w-100 p-3 mb-3"
                style="background-color: #fcbf00"
                @click="save"
              >
                crear mascota
              </v-btn>
             
            </form>

            <v-snackbar
              v-model="snackbar"
              :multi-line="multiLine"
              color="green"
            >
              {{ textSnackbar }}
            </v-snackbar>
            <v-snackbar v-model="error" :multi-line="multiLine" color="red">
                  {{ textError }}
              <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="error = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Mascota",
  data() {
    return {
       error: false,
      nombremascota: "",
      fechanacimiento: "",
      nombrepropetario: "",
      descripcion: "",

      textError: "",
      textSnackbar: "Datos guardados",

      raza: [
        "Perro",
        "Gato",
        "Tortuga",
        "Hamster",
        "Pajaro",
        "Pez",
        "Conejo",
        "Caballo",
        "Cerdo",
      ],
    };
  },
  methods: {
    campoCambio(severidad) {
      this.mantenimiento.severidad_id = severidad;
    },
    save() {
      const formData = new FormData();
      let photo = document.querySelector("#photo_mascota");
      formData.append("nombre_mascota", this.nombremascota);
      formData.append("raza", this.raza);
      formData.append("fechanacimiento", this.fechanacimiento);
      formData.append("nombre_dueno", this.nombrepropetario);
      formData.append("descripcion", this.descripcion);
      formData.append("fotomascota", photo.files[0]);

      axios
        .post("https://warm-chamber-23137.herokuapp.com/api/mascota", formData)
        .then((response) => {
          console.log(response);
          this.textSnackbar = "Se creo correctamente";
          this.snackbar = true;
          this.nombremascota = "";
          this.raza = "";
          this.fechanacimiento = "";
          this.nombrepropetario = "";
          this.descripcion = "";
         
        })
        .catch((error) => {
          console.log(error);
          this.textError = "No se enviaron los datos";
          this.error = true;
        });
    },
  },
};
</script>

<style></style>
