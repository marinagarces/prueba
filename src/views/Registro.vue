<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1 class="mt-10 mb-10">Registro de Usuario</h1>
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
        hint="At least 8 characters"
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
          Registrar
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

export default {
  components: {
    Modal,
  },
  data: () => ({
    dialog: false,
    mensaje: "Creando Registro...",
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    valid: true,
    email: "",
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