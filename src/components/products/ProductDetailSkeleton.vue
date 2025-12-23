<template>
  <div class="row items-center justify-center">
    <div class="col-md-10 col-12 q-gutter-y-md">
      <div><q-skeleton class="bg-grey-3" type="text" width="200px" /></div>

      <div class="row q-col-gutter-x-xl">
        <div class="col-6"><q-skeleton class="bg-grey-3" height="400px" /></div>

        <div class="col-6">
          <div class="row items-center justify-center">
            <div class="col-md-10 col-lg-9 col-12 q-col-gutter-y-md">
              <div>
                <div class="text-h4 text-weight-bold">
                  <q-skeleton class="bg-grey-3" type="text" animation="fade" />
                  <q-skeleton class="bg-grey-3" type="text" width="80%" animation="fade" />
                </div>
              </div>

              <div class="row items-center justify-between">
                <div class="text-h5 text-weight-bold text-secondary">
                  <q-skeleton class="bg-grey-3" width="150px" type="text" animation="fade" />
                </div>
              </div>

              <div>
                <div class="row q-col-gutter-y-sm">
                  <div class="col-12" v-for="i in 2" :key="i">
                    <q-skeleton class="bg-grey-3" type="QSlider" animation="fade" />
                  </div>
                </div>
              </div>

              <div>
                <div class="row q-col-gutter-sm">
                  <div class="col-4" v-for="i in 3" :key="i">
                    <q-skeleton class="bg-grey-3" height="80px" type="QToolbar" animation="fade" />
                  </div>
                </div>
              </div>

              <div class="row items-center q-col-gutter-x-sm">
                <div class="col-grow">
                  <q-skeleton class="bg-grey-3" width="200px" type="QToolbar" animation="fade" />
                </div>
                <div class="col">
                  <q-skeleton class="bg-grey-3" type="QToolbar" animation="fade" />
                </div>

                <div class="col-grow">
                  <q-skeleton class="bg-grey-3" width="80px" type="QToolbar" animation="fade" />
                </div>
              </div>

              <div class="row q-col-gutter-y-sm">
                <div class="col-12" v-for="i in 4" :key="i">
                  <div class="row items-start no-wrap q-mt-sm">
                    <q-skeleton class="bg-grey-3" type="QAvatar" size="20px" animation="fade" />

                    <div class="col q-pl-sm">
                      <q-skeleton
                        class="bg-grey-3"
                        type="text"
                        square
                        height="12px"
                        width="75%"
                        animation="fade"
                      />
                      <q-skeleton
                        class="bg-grey-3"
                        type="text"
                        square
                        height="12px"
                        width="45%"
                        animation="fade"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang=""></style>
