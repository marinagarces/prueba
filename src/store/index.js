import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    cursos:[],
    cantidadInscritos:0,
    cantidadCursos:0,
    cantidadCursosActivos:0,
    cantidadCursosTerminados:0,
    cantidadCupos:0,
    cantidadCuposRestantes:0,
    loading: false,
    curso:{
      codigo:'',
      nombre:'',
      estado:'',
      costo:'',
      duracion:'',
      descripcion:'',
      cupos:'',
      inscritos:'',
      imagen:''
    },
  },
  mutations: {
    setusuario(state,elusuario){
        state.usuario = elusuario;
      },
      loadingtable(state){
        state.loading = true;
      },
      getcursos(state,cursos){
        state.cursos= cursos;
        state.loading = false;
      },
      contarinscritos:  (state)=>{
          state.cantidadInscritos=0;
          state.cursos.forEach( (curso)=>{
            state.cantidadInscritos += curso.data.inscritos;
          });
        },//fin contarinscritos
        contarcursos:  (state)=>{
            state.cantidadCursos=0;
            state.cursos.forEach( (curso)=>{
              state.cantidadCursos ++;
            });
          },//contarcursos
          contarcursosactivos:  (state)=>{
              state.cantidadCursosActivos=0;
              state.cursos.forEach( (curso)=>{
                if(curso.data.estado == false){
                  state.cantidadCursosActivos ++;
                }

              });
            },//contarcursosactivos
            contarcursosterminados:  (state)=>{
                state.cantidadCursosTerminados=0;
                state.cursos.forEach( (curso)=>{
                  if(curso.data.estado == true){
                    state.cantidadCursosTerminados ++;
                  }

                });
              },//contarcursosterminados
              contarcupos:  (state)=>{
                  state.cantidadCupos=0;
                  state.cursos.forEach( (curso)=>{
                    state.cantidadCupos += curso.data.cupos;

                  });
                },//contarcupos

                contarcuposrestantes:  (state)=>{
                    state.cantidadCuposRestantes= state.cantidadCupos - state.cantidadInscritos;
                  },//contarcupos
  },
  actions: {
        actionsetusuario(context, unusuario){
            context.commit('setusuario', unusuario);
        },
        actiongetcursos(context){
            context.commit('loadingtable');
            axios.get('https://us-central1-prueba-f2c7c.cloudfunctions.net/prueba/cursos')
              .then((accept)=>{
                let data = accept.data;
                context.commit('getcursos', data);
                context.commit('contarinscritos');
                context.commit('contarcursos');
                context.commit('contarcupos');
                context.commit('contarcursosactivos');
                context.commit('contarcursosterminados');
                context.commit('contarcursosterminados');
                context.commit('contarcuposrestantes');

              });//fin de la resolucion de la promesa
          }//fin actiongetpatients
  },
  modules: {
  }
})
