<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1 class="mt-10 mb-10">Login de Usuario</h1>
      <h4>User: marina.gareyes@gmail.com</h4>
      <h4>Pass: bootcamp_peludo</h4>
      <!-- input email -->
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <!-- input contraseña -->
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        value=""
        hint="Min 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-row class="mt-10" justify="center">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Ingresar
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Limpiar Formulario</v-btn
        >

        <v-btn color="warning" @click="resetValidation">
          Limpiar Validación
        </v-btn>

        <!-- <v-btn
      :disabled="dialog"
      :loading="dialog"
      class="white--text"
      color="purple darken-2"
      @click="dialog = true"
    >
    </v-btn> -->
      </v-row>
    </v-form>

    <Modal :mensaje="mensaje" :dialog="dialog" />
  </v-container>
</template>

<script>
import Modal from "../components/Modal.vue";
import { auth } from '@/config/firebase.js';

export default {
  components: {
    Modal,
  },
  data: () => ({
    dialog: false,
    mensaje: "Iniciando sesión:",
    show1: false,
    email: "",
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (value) => value.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    valid: true,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 2000);
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.dialog = true;
      auth.signInWithEmailAndPassword(this.email, this.password)
          .then( accept => {
                console.log('Credenciales Validas: ', accept);
                this.$store.dispatch('actionsetusuario',this.email);
                // console.log('Hacemos commit al mutation');
                // this.$store.commit('setusuario',this.email);
                this.$router.push('/home');
          })
          .catch( error =>{
              console.log('Error de autenticacion: ', error);
              alert('Error de autenticacion: ');
              alert(error);
          });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>
