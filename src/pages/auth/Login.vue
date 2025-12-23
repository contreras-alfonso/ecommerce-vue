<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-8 col-12">
        <div class="row">
          <div class="col">
            <q-form @submit="onLogin" class="row">
              <div class="col-sm-10 col-12 column q-col-gutter-y-md">
                <div class="text-h4 text-weight-bold">Iniciar sesión</div>
                <div>Si ya estás registrado, accede con tu correo electrónico.</div>
                <div class="row q-col-gutter-y-md">
                  <div class="col-12">
                    <InputElement
                      label="Correo"
                      :model-value="login.email"
                      @update:model-value="(val: string) => (login.email = val)"
                      :outlined="true"
                      :length-required="11"
                      time="1500"
                      bg-color="white"
                      border-black
                      is-square
                      :rules-config="['isRequired']"
                    />
                  </div>

                  <div class="col-12">
                    <InputElement
                      label="Contraseña"
                      is-pwd
                      :model-value="login.password"
                      @update:model-value="(val: string) => (login.password = val)"
                      :outlined="true"
                      :length-required="11"
                      time="1500"
                      bg-color="white"
                      border-black
                      is-square
                      :rules-config="['isRequired']"
                    />
                  </div>
                </div>

                <div>
                  <q-btn
                    type="submit"
                    flat
                    class="bg-secondary text-white q-py-md text-weight-regular full-width"
                    label="Iniciar sesión"
                  ></q-btn>
                </div>
              </div>
            </q-form>
          </div>

          <div class="col-grow">
            <q-separator spaced style="height: 500px" class="full-height" vertical />
          </div>

          <div class="col">
            <div class="row items-center justify-center">
              <div class="col-sm-10 col-12 column q-col-gutter-y-md">
                <div class="text-h4 text-weight-bold text-center">Crear cuenta</div>
                <div>
                  Registrarse tiene muchos beneficios: pagos más rápidos, posibilidad de agregar más
                  de una dirección, realizar seguimiento a tus pedidos y mucho más.
                </div>
                <div>
                  <q-btn
                    type="button"
                    @click="router.push('/register')"
                    flat
                    class="bg-secondary text-white q-py-md text-weight-regular full-width"
                    label="Registrarse"
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
import { useRouter } from 'vue-router';
import { nextTick, onMounted, ref } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import type { LoginRequest } from 'src/types/login-request';
import { useAuthStore } from 'src/stores/auth-store';
import { useNotify } from 'src/composables/notify';
import { useHelpers } from 'src/composables/helpers';

const router = useRouter();
const authStore = useAuthStore();
const { notifySuccess } = useNotify();
const { handleApiError, onSpinner } = useHelpers();

onMounted(async () => {
  await nextTick();
  if (authStore.isAuthenticated) {
    await router.push('/');
  }
});

const login = ref<LoginRequest>({
  email: 'alfonso@admin.com',
  password: 'alfonso@',
});

const onLogin = async (): Promise<void> => {
  const payload: LoginRequest = {
    ...login.value,
  };

  onSpinner(true);
  try {
    await authStore.login(payload);
    notifySuccess('Sesión iniciada correctamente');
    await router.push('/');
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};
</script>
<style lang=""></style>
