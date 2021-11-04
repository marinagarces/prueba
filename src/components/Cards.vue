<template>
  <v-container>
      <!-- v-for deberia ir en row o col -->
    <v-row justify="space-around">
      <v-col lg="4" xl="4" md="6" cols="12" v-for="curso in cursos">
      <v-card>
        <v-img
          height="200px"
          v-bind:src="curso.data.imagen"
        >
        </v-img>

        <v-card-text>
            <v-card-title>{{ curso.data.nombre }}</v-card-title>
          <div class="font-weight-bold ml-8 mb-2">
            Información
          </div>

          <v-timeline
            align-top
            dense
          >
          <!-- dato 1 -->
            <v-timeline-item color="purple">
              <div>
                <div class="font-weight-normal">
                  <strong> Costo: </strong> {{ curso.data.costo }}
                </div>
                <div>Duración: {{ curso.data.duracion }}</div>
              </div>
            </v-timeline-item>

                      <!-- dato 2 -->
            <v-timeline-item color="green">
              <div>
                <div class="font-weight-normal">
                  <strong> Cupos: </strong> {{ curso.data.cupos }}
                </div>
                <div>completado: {{ curso.data.estado ? 'Si':'No' }}</div>
              </div>
            </v-timeline-item>

          <!-- dato 3 -->
            <v-timeline-item color="purple">
              <div>
                <div class="font-weight-normal">
                  <strong> Fecha de registro: </strong>
                </div>
                <div>{{ curso.data.fecha }}</div>
              </div>
            </v-timeline-item>

                    <!-- dato 4 -->
            <v-timeline-item color="green">
              <div>
                <div class="font-weight-normal">
                  <strong> Descripción: </strong>
                </div>
                <div>{{ curso.data.descripcion }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
  export default {
    data: () => ({

    }),
    mounted(){
      this.cargatabla();
    }, //Fin mounted
    methods:{
      cargatabla(){
        this.$store.dispatch('actiongetcursos');
      },//fin cargatabla
    },//Fin methods
    computed:{
      ...mapState([
          'cursos',
          'loading'
      ]),
    },//Fin computed
  }//fin export
</script>

<style>

</style>
