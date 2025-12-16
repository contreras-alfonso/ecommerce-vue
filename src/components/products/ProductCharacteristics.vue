<template lang="">
  <q-expansion-item
    class="overflow-hidden"
    expand-icon-class="text-black"
    style="border-radius: 20px"
    header-class="bg-grey-3 text-subtitle1 text-weight-medium q-py-md"
    icon="view_in_ar"
    label="Características del producto"
    default-opened
  >
    <div class="q-pa-md" v-html="characteristics"></div>
  </q-expansion-item>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const characteristics = ref(`
<div><br></div>

<div>
  <strong>Pantalla:</strong> Super Retina XDR OLED con colores vibrantes, alto brillo y excelente nitidez para una experiencia visual inmersiva.
</div>

<div><br></div>

<div>
  <strong>Diseño:</strong> Cuerpo elegante y resistente con acabados premium, pensado para un uso cómodo y sofisticado.
</div>

<div><br></div>

<div>
  <strong>Procesador:</strong> Chip de última generación diseñado por Apple, que ofrece alto rendimiento, eficiencia energética y fluidez en todas las tareas.
</div>

<div><br></div>

<div>
  <strong>Cámara trasera:</strong> Sistema de cámaras avanzado con mejoras en fotografía nocturna, retratos y grabación de video en alta calidad.
</div>

<div><br></div>

<div>
  <strong>Cámara frontal:</strong> Ideal para selfies y videollamadas, con mejoras en nitidez y procesamiento de imagen.
</div>

<div><br></div>

<div>
  <strong>Batería:</strong> Autonomía optimizada para acompañarte durante todo el día con un uso normal.
</div>

<div><br></div>

<div>
  <strong>Sistema operativo:</strong> iOS con las últimas funciones de privacidad, seguridad y personalización.
</div>

<div><br></div>

<div>
  <strong>Seguridad:</strong> Desbloqueo seguro mediante reconocimiento facial (Face ID).
</div>

<div><br></div>

<div>
  <strong>Conectividad:</strong> Compatibilidad con redes de alta velocidad, Wi-Fi avanzado, Bluetooth y servicios de localización precisa.
</div>

<div><br></div>

<div>
  <strong>Audio:</strong> Sonido estéreo de alta calidad para una experiencia envolvente en música, videos y llamadas.
</div>

<div><br></div>

<div>
  <strong>Resistencia:</strong> Protección contra salpicaduras, polvo y uso diario.
</div>
`);
</script>
<style lang=""></style>
