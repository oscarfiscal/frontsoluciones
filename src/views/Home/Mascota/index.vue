<!-- @format -->

<template>

   <div>
    <section>
      <v-row>
        <v-col cols="1" class="p-3">
        <v-app-bar app color="#85879e" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/p2.gif"
        transition="scale-transition"
        width="40"
      />

      <v-toolbar-title>Happy Pet</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="/"
      target="_blank"
      text
    >
      <span class="mr-2">cerrar sesion</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    
  </v-app-bar>
        </v-col>
      
        <v-col sm="5" cols="12" style="padding-left: 0px;">
          <Formulario />
        </v-col>
      </v-row>
    </section>
  </div>
 
  
</template>

<script>
import Formulario from "@/components/Formulario";

export default {
  name: "Mascota",
  components: {
    Formulario,

   
  },
};
</script>

<style></style>
