<script setup lang="ts">
import SpaceFluidDemo from './components/SpaceFluidDemo.vue'
import TextFluid from './components/TextFluidDemo.vue'

const textScales = [...Array(10)].map((_, i) => i - 2).reverse()
</script>

<template>
  <div class="mx-auto w-full max-w-800px px-4 py-8">
    <a
      href="https://github.com/adameier/unocss-preset-utopia"
      target="_blank" rel="noopener noreferrer"
      class="underline"
    >GitHub</a>
    <h1 class="text-fluid-5 mb-fluid-2xs">
      UnoCSS Preset Utopia
    </h1>
    <p class="text-fluid-1 mb-fluid-s">
      <strong>Resize the window to see computed fluid values take effect.</strong>
    </p>
    <h2 class="text-fluid-4 mb-fluid-s">
      Fluid type rules
    </h2>
    <p class="mb-fluid-s">
      Rules for providing <a class="" href="https://utopia.fyi/type/calculator/">Utopia fluid type scale</a>
      values for font size, using the format <code>{{ 'text-fluid-<scale>' }}</code>.
    </p>
    <div class="space-y-fluid-s mb-fluid-s">
      <TextFluid v-for="i in textScales" :key="i" :scale="i" />
    </div>
    <p class="mb-fluid-s">
      You can use any positive/negative number as the scale value, e.g:
    </p>
    <div class="space-y-fluid-s">
      <TextFluid :scale="-0.5" />
      <TextFluid :scale="3.14159" />
    </div>
    <h2 class="text-fluid-4 mt-fluid-m mb-fluid-s">
      Fluid space rules
    </h2>
    <p class="mb-fluid-s">
      Rules for providing <a class="" href="https://utopia.fyi/type/calculator/">Utopia fluid space</a>
      values according to the spacing rules of the default UnoCSS preset.
      These follow the pattern of <code>{{ '<rule-prefix>-fluid-<space-value>?-<space-value>' }}</code>,
      using the space values configured in the preset options.
    </p>
    <p class="mb-fluid-s">
      Using a second space value creates a space value pair, introducing a more dramatic space variance by interpolating
      between the minimum of the first space value and the maximum of the second.
    </p>
    <p class="mb-fluid-s">
      The rule prefixes include the following from the default UnoCSS preset, including any additional size/direction specifiers:
    </p>
    <ul class="mb-fluid-s">
      <li><code>p</code></li>
      <li><code>m</code></li>
      <li><code>gap</code></li>
      <li><code>w|h</code></li>
      <li><code>basis</code></li>
      <li><code>space-(y|x)</code></li>
    </ul>
    <div class="flex flex-col gap-fluid-m">
      <SpaceFluidDemo
        v-slot="{ ref: functionRef }"
        :properties="['margin-left']"
        rule="ml-fluid-m"
      >
        <div class="rounded-2 flex bg-blue/30">
          <div :ref="functionRef" class="rounded-2 bg-blue/60 ml-fluid-m h-8 w-32" />
        </div>
      </SpaceFluidDemo>
      <SpaceFluidDemo
        v-slot="{ ref: functionRef }"
        :properties="['padding-left', 'padding-right']"
        rule="px-fluid-xl"
      >
        <div :ref="functionRef" class="rounded-2 flex bg-blue/30 px-fluid-xl">
          <div class="rounded-2 bg-blue/60 h-8 w-32" />
        </div>
      </SpaceFluidDemo>
      <SpaceFluidDemo
        v-slot="{ ref: functionRef }"
        :properties="['gap']"
        rule="gap-fluid-2xl"
      >
        <div :ref="functionRef" class="rounded-2 bg-blue/30 flex gap-fluid-2xl h-8">
          <div class="rounded-2 bg-blue/60 w-8" />
          <div class="rounded-2 bg-blue/60 w-8" />
          <div class="rounded-2 bg-blue/60 w-8" />
        </div>
      </SpaceFluidDemo>
      <SpaceFluidDemo
        v-slot="{ ref: functionRef }"
        :properties="['height']"
        rule="h-fluid-m-3xl"
      >
        <div :ref="functionRef" class="rounded-2 bg-blue h-fluid-m-3xl w-40" />
      </SpaceFluidDemo>
      <SpaceFluidDemo
        v-slot="{ ref: functionRef }"
        :properties="['margin-top']"
        rule="space-y-fluid-m-xl"
      >
        <div class="rounded-2 bg-blue/30 flex flex-col space-y-fluid-m-xl w-40">
          <div class="rounded-2 bg-blue/60 h-8" />
          <div :ref="functionRef" class="rounded-2 bg-blue/60 h-8" />
          <div class="rounded-2 bg-blue/60 h-8" />
        </div>
      </SpaceFluidDemo>
    </div>
  </div>
</template>
