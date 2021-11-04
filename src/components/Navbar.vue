<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>

      <v-btn text v-if=" usuario != '' " to="/administracion"> Administracion
      </v-btn>

      <v-btn text v-if=" usuario != '' " to="/home"> Home
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text @click="logout" v-if=" usuario != '' "> {{ usuario }}
        <v-icon>mdi-logout</v-icon>
      </v-btn>



    </v-app-bar>
    <Modal :mensaje="mensaje" :dialog="dialog" />
  </div>
</template>


<script>
import { auth } from '@/config/firebase.js';
import Modal from "../components/Modal.vue";
import { mapState } from 'vuex';
export default {
name: 'NavBar',
components: {
  Modal,
},
data: () => ({
  dialog: false,
  mensaje: "Cerrando Sesión...",

}),
watch: {
  dialog(val) {
    if (!val) return;

    setTimeout(() => (this.dialog = false), 2000);
  },
},
methods:{
    logout(){
        this.dialog = true;
        auth.signOut()
        .then( accept => {
            console.log('Deslogueado con exito');
            this.$store.dispatch('actionsetusuario','');
            this.$router.push('/');
        })
        .catch( error =>{
            console.log('Error deslogueando: ', error);
        });
    }//fin logout
},//fin methods
computed:{
  ...mapState([
      'usuario',
  ])
}//fin computed
}//fin export
</script>

<style>

</style>
