<template>
  <v-container class="mt-10">
    <v-alert outlined color="purple" icon="mdi-account-group" dense>
      Cantidad total de alumnos permitidos: {{ cantidadCupos }} alumnos
    </v-alert>
    <v-alert outlined color="blue" icon="mdi-account-check" dense>
      Cantidad total de alumnos Inscritos: {{ cantidadInscritos }} alumnos
    </v-alert>
    <v-alert outlined color="red" icon="mdi-account-clock" dense>
      Cantidad total de cupos restantes: {{ cantidadCuposRestantes }} alumnos
    </v-alert>
    <v-alert outlined color="pink" icon="mdi-block-helper" dense>
      Cantidad total de cursos terminados: {{ cantidadCursosTerminados }} cursos
    </v-alert>
    <v-alert outlined color="brown" icon="mdi-bell-ring" dense>
      Cantidad total de cursos Activos: {{ cantidadCursosActivos}} cursos
    </v-alert>
    <v-alert outlined color="orange" icon="mdi-bell-ring" dense>
      Cantidad total de cursos: {{cantidadCursos}} cursos
    </v-alert>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
computed: {
    ...mapState([
        'cantidadInscritos',
        'cantidadCursos',
        'cantidadCupos',
        'cantidadCursosActivos',
        'cantidadCursosTerminados',
        'cantidadCuposRestantes'
    ]),
    },//Fin computed
};
</script>

<style>
</style>
