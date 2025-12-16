<template>
  <q-card
    v-if="$q.screen.gt.sm && currentCategoryActive !== null && activeMenu"
    class="mega-menu"
    @mouseleave="onMouseLeaveFromMenu"
    ref="megaMenu"
  >
    <q-card flat bordered class="full-width q-py-xl">
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-center">
          <div class="col-8">
            <div class="cursor-pointer hover-primary non-selectable w-fit">
              <h6 @click="onViewAllProducts()" class="q-mt-none q-mb-sm">
                Ver todo <q-icon name="chevron_right"></q-icon>
              </h6>
            </div>

            <div class="col-8">
              <div class="row q-col-gutter-x-md">
                <div
                  @click="onViewProduct()"
                  class="non-selectable cursor-pointer w-fit hover-primary"
                >
                  <div class="col-12">
                    <q-img
                      loading="lazy"
                      spinner-color="grey"
                      spinner-size="sm"
                      src="https://www.oneplus.com/content/dam/oneplus/na/2025/nav/2.png"
                      width="80px"
                    />
                  </div>
                  <div>OnePLus 15</div>
                </div>

                <div
                  @click="onViewProduct()"
                  class="non-selectable cursor-pointer w-fit hover-primary"
                >
                  <div class="col-12">
                    <q-img
                      loading="lazy"
                      spinner-color="grey"
                      spinner-size="sm"
                      src="https://www.oneplus.com/content/dam/oneplus/2024/nav/13-Black.png"
                      width="80px"
                    />
                  </div>
                  <div>OnePLus 15</div>
                </div>

                <div
                  @click="onViewProduct()"
                  class="non-selectable cursor-pointer w-fit hover-primary"
                >
                  <div class="col-12">
                    <q-img
                      loading="lazy"
                      spinner-color="grey"
                      spinner-size="sm"
                      src="https://www.oneplus.com/content/dam/oneplus/na/2025/nav/2.png"
                      width="80px"
                    />
                  </div>
                  <div>OnePLus 15</div>
                </div>

                <div
                  @click="onViewProduct()"
                  class="non-selectable cursor-pointer w-fit hover-primary"
                >
                  <div class="col-12">
                    <q-img
                      loading="lazy"
                      spinner-color="grey"
                      spinner-size="sm"
                      src="https://www.oneplus.com/content/dam/oneplus/2024/nav/13-Black.png"
                      width="80px"
                    />
                  </div>
                  <div>OnePLus 15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['onMouseLeaveFromMenu']);
const router = useRouter();

const props = defineProps<{
  currentCategory: string | null;
  isActive: boolean;
}>();

const currentCategoryActive = ref<string | null>(props.currentCategory);
const activeMenu = ref<boolean>(props.isActive);

const onMouseLeaveFromMenu = (): void => {
  currentCategoryActive.value = null;
  activeMenu.value = false;
  emit('onMouseLeaveFromMenu');
};

const onViewProduct = async (): Promise<void> => {
  await router.push('/product/123');
  onMouseLeaveFromMenu();
};

const onViewAllProducts = async (): Promise<void> => {
  await router.push('/store/celulares');
  onMouseLeaveFromMenu();
};

// const getMenuItems = () => {
//   const items = [
//     { label: 'Productos destacados' },
//     { label: 'Últimos lanzamientos' },
//     { label: 'Ofertas del mes' },
//     { label: 'Accesorios' },
//   ];
//   return items;
// };

watch(
  () => props.currentCategory,
  (val) => {
    currentCategoryActive.value = val;
  },
);

watch(
  () => props.isActive,
  (val) => {
    activeMenu.value = val;
  },
);
</script>
<style lang="scss">
.mega-menu {
  position: fixed;
  top: 52px;
  left: 0;
  width: 100vw;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
