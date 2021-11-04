<template>
<v-container class="mt-10">
  <v-data-table
    :headers="headers"
    :items="cursos"
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><h2> Administración </h2></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="purple"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar Curso
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <h2>{{ formTitle }}</h2>
            </v-card-title>

            <v-card-text>
              <v-container>
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                    <v-text-field v-model="editedItem.imagen" label="URL de la imagen del curso"></v-text-field>
                    <v-text-field v-model="editedItem.cupos" label="Cupos del curso"></v-text-field>
                    <v-text-field v-model="editedItem.inscritos" label="Inscritos en el curso"></v-text-field>
                    <v-text-field v-model="editedItem.duracion" label="Duración del curso"></v-text-field>
                    <v-text-field v-model="editedItem.costo" label="Costo del curso"></v-text-field>
                    <v-text-field v-model="editedItem.codigo" label="Código del curso"></v-text-field>
                    <v-switch v-if="activeEdit" v-model="editedItem.estado" :label="`Terminado: ${editedItem.estado.toString()}`"></v-switch>
                    <v-textarea v-model="editedItem.descripcion" label="Descripción del curso" outlined></v-textarea>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                @click="close"
                dark
              >
                Cancelar
              </v-btn>
              <v-btn
                color="success"
                dark
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro que desea eliminar? {{ editedItem.nombre }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Borrar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- iconos de de la tabla acciones EDITAR/ELIMINAR -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
  <Alerts/>

<!-- div para probar conexion con firebase
      <div v-for="curso in cursos">
              {{ curso.data.nombre }}
      </div>
-->
  </v-container>

</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

import Alerts from '../components/Alerts.vue'
  export default {
      components: {
Alerts,
      },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      //estos headers corresponden a la cabecera de la tabla
      headers: [
        {
          text: 'Curso',
          align: 'start',
          sortable: false,
          value: 'data.nombre',
        },
        { text: 'Cupos', value: 'data.cupos' },
        { text: 'Inscritos', value: 'data.inscritos' },
        { text: 'Duracion', value: 'data.duracion' },
        { text: 'Costo', value: 'data.costo' },
        { text: 'Terminado', value: 'data.estado' },
        { text: 'Fecha', value: 'data.fecha' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      idToModify:'',
      activeEdit: false,
      editedItem: {
        nombre: '',
        cupos: 0,
        inscritos: 0,
        duracion: 0,
        costo: 0,
        estado:0,
        fecha:0,
        imagen:'',
        codigo:'',
        descripcion:''
      },
      defaultItem: {
          nombre: '',
          cupos: 0,
          inscritos: 0,
          duracion: 0,
          costo: 0,
          estado:0,
          fecha:0
      },
    }),

    computed: {
    ...mapState([
        'cursos',
        'loading',
    ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Curso' : 'Editar Curso'
      },
    },//Fin computed

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted(){
      this.cargatabla();
    }, //Fin mounted

    methods: {
//editar item
      editItem (item) {
        // console.log('INGRESA A EDITAR');
        // console.log(item);
        this.activeEdit = true;
        this.editedIndex = this.cursos.indexOf(item)
        this.editedItem = Object.assign({}, item.data)
        this.idToModify = item.id
        console.log(this.idToModify);
        this.dialog = true
      },
//eliminar en icono
      deleteItem (item) {
        this.editedIndex = this.cursos.indexOf(item)
        this.editedItem = Object.assign({}, item.data)
        this.idToModify = item.id
        console.log(this.idToModify);
        this.dialogDelete = true
      },
//confirmacion de eliminar
      deleteItemConfirm () {
      axios.delete(`https://us-central1-prueba-f2c7c.cloudfunctions.net/prueba/curso/${this.idToModify}`)
          .then( accept =>{
              this.cargatabla();
          });//Fin resolucion promesa
        alert('DATO ELIMINADO EXITOSAMENTE EN FIREBASE');
        this.closeDelete()

      },
//cierre de modal
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
//cierre de modal
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
//guardar
      save () {
//validar si se esta editando o si se esta guardando desde cero
       if (this.activeEdit == false){
//se esta guardando desde cero
              //validar si los inscritos no son mayores que los Cupos
              if(this.editedItem.inscritos > this.editedItem.cupos){
                      alert('NO PUEDE TENER MAS INSCRITOS QUE CUPOS. REVISE POR FAVOR, PARA PROCEDER CON EL GUARDADO');

              }else{

                      this.editedItem.estado = false;
                      const tiempoTranscurrido = Date.now();
                      const hoy = new Date(tiempoTranscurrido);
                      const fechaActual = hoy.toDateString();
                      console.log(fechaActual);
                      this.editedItem.fecha = fechaActual;

                      axios.post('https://us-central1-prueba-f2c7c.cloudfunctions.net/prueba/curso', this.editedItem)
                          .then( accept =>{
                              this.$store.dispatch('actiongetcursos');
                          }); //fin de la resolucion de la promesa

                          alert('DATO GUARDADO EXITOSAMENTE EN FIREBASE');


              }


       }else{
//se esta editando
        //validar si los inscritos no son mayores que los Cupos
        if(this.editedItem.inscritos > this.editedItem.cupos){
                alert('NO PUEDE TENER MAS INSCRITOS QUE CUPOS. REVISE POR FAVOR, PARA PROCEDER CON LA EDICION');

        }else{

          //validar si el estado del curso esta en terminado (estado == true)
               if(this.editedItem.estado == true ){
                    this.editedItem.inscritos = 0;
               }
                axios.put(`https://us-central1-prueba-f2c7c.cloudfunctions.net/prueba/curso/${this.idToModify}`, this.editedItem)
               .then( accept =>{
                   this.$store.dispatch('actiongetcursos');
               }); //fin update

               this.activeEdit = false;
               alert('DATO EDITADO EXITOSAMENTE EN FIREBASE');

         }

       }//Fin else


        this.close()
      },
//carga datos de firebase
      cargatabla(){
        this.$store.dispatch('actiongetcursos');
      },//fin cargatabla
    },//Fin methods
  }
</script>


<style>

</style>
