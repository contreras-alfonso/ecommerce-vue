<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-8 col-12">
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col-sm-10 col-12 column q-col-gutter-y-md">
                <div class="text-h4 text-weight-bold">Regístrate</div>
                <div>
                  Registrarse tiene muchos beneficios: pagos más rápidos, posibilidad de agregar más
                  de una dirección, realizar seguimiento a tus pedidos y mucho más.
                </div>

                <q-stepper
                  class="shadow-0 rounded-10 q-pa-none q-ma-none"
                  v-model="step"
                  ref="stepper"
                  color="red"
                  animated
                  done-color="green-5"
                  active-color="primary"
                >
                  <q-step :name="1" title="Información personal" prefix="1" :done="done1">
                    <div class="text-grey-9 q-pb-md">Completa tu nombre, apellido y documento.</div>

                    <q-form
                      @submit="
                        () => {
                          done1 = true;
                          step = 2;
                        }
                      "
                    >
                      <div class="q-gutter-y-md">
                        <InputElement
                          label="Nombres"
                          :model-value="register.name"
                          @update:model-value="(val: string) => (register.name = val)"
                          icon-color="grey"
                          :outlined="true"
                          :length-required="11"
                          time="1500"
                          bg-color="white"
                          border-black
                          is-square
                          :rules-config="['isRequired']"
                        />

                        <InputElement
                          label="Apellidos"
                          :model-value="register.lastname"
                          @update:model-value="(val: string) => (register.lastname = val)"
                          icon-color="grey"
                          :outlined="true"
                          :length-required="11"
                          time="1500"
                          bg-color="white"
                          border-black
                          is-square
                          :rules-config="['isRequired']"
                        />

                        <SelectElement
                          :model-value="register.documentType"
                          @update:model-value="(val) => (register.documentType = val)"
                          label="Tipo de documento"
                          :options="options.documentType"
                          :rules-config="['isRequired']"
                          :outlined="true"
                          border-black
                          is-square
                        />

                        <InputElement
                          label="Número de documento"
                          :model-value="register.documentNumber"
                          @update:model-value="(val: string) => (register.documentNumber = val)"
                          icon-color="grey"
                          :outlined="true"
                          :length-required="11"
                          time="1500"
                          bg-color="white"
                          border-black
                          is-square
                          :rules-config="['isRequired']"
                        />
                      </div>

                      <q-stepper-navigation class="row items-center">
                        <q-btn
                          type="submit"
                          class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
                          label="Continuar"
                          flat
                        />
                      </q-stepper-navigation>
                    </q-form>
                  </q-step>

                  <q-step
                    :name="2"
                    title="Información de inicio de sesión"
                    prefix="2"
                    :done="done2"
                  >
                    <div class="text-grey-9 q-pb-md">Completa tus datos de acceso.</div>
                    <q-form @submit="onRegister">
                      <div class="q-gutter-y-md">
                        <InputElement
                          label="Correo"
                          :model-value="register.email"
                          @update:model-value="(val: string) => (register.email = val)"
                          icon-color="grey"
                          :outlined="true"
                          :length-required="11"
                          time="1500"
                          bg-color="white"
                          border-black
                          is-square
                          :rules-config="['isRequired']"
                        />

                        <InputElement
                          label="Contraseña"
                          is-pwd
                          :model-value="register.password"
                          @update:model-value="(val: string) => (register.password = val)"
                          :outlined="true"
                          :length-required="11"
                          time="1500"
                          bg-color="white"
                          border-black
                          is-square
                          :rules-config="['isRequired']"
                        />
                        <InputElement
                          label="Confirmar contraseña"
                          is-pwd
                          :model-value="register.repeatPassword"
                          @update:model-value="(val: string) => (register.repeatPassword = val)"
                          :outlined="true"
                          :length-required="11"
                          time="1500"
                          bg-color="white"
                          border-black
                          is-square
                          :rules-config="['isRequired']"
                        />
                      </div>

                      <q-stepper-navigation
                        class="row items-center q-col-gutter-x-md q-col-gutter-y-md"
                      >
                        <div class="col-12">
                          <q-btn
                            @click="step = 1"
                            color="secondary"
                            class="bg-white q-px-xl full-width q-py-md text-weight-regular"
                            outline
                            label="Regresar"
                          >
                          </q-btn>
                        </div>
                        <div class="col-12">
                          <q-btn
                            type="submit"
                            icon="check_circle_outline"
                            class="bg-secondary text-white q-px-xl full-width q-py-md text-weight-regular"
                            label="Registrarme"
                            flat
                          />
                        </div>
                      </q-stepper-navigation>
                    </q-form>
                  </q-step>
                </q-stepper>
              </div>
            </div>
          </div>

          <div class="col-grow">
            <q-separator spaced style="height: 500px" class="full-height" vertical />
          </div>

          <div class="col">
            <div class="row items-center justify-center">
              <div class="col-sm-10 col-12 column q-col-gutter-y-md">
                <div class="text-h4 text-weight-bold text-center">Iniciar sesión</div>
                <div>
                  Iniciar sesión en este sitio le permite acceder al estado e historial de su
                  pedido.
                </div>
                <div>
                  <q-btn
                    flat
                    class="bg-secondary text-white q-py-md text-weight-regular full-width"
                    label="Iniciar sesión"
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import InputElement from 'src/components/elements/Input.vue';
import SelectElement from 'src/components/elements/Select.vue';
import type { SelectOption } from 'src/types/select.option';
import { ref } from 'vue';

const step = ref(1);
const done1 = ref(true);
const done2 = ref(false);

const options = ref<{ documentType: SelectOption[] }>({
  documentType: [
    {
      name: 'DNI',
      id: 'DNI',
    },
    {
      name: 'CÉDULA',
      id: 'CED',
    },
  ],
});

const register = ref({
  name: '',
  lastname: '',
  documentType: '',
  documentNumber: '',
  email: '',
  password: '',
  repeatPassword: '',
});

const onRegister = (): void => {};
</script>
<style lang=""></style>
