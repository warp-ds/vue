<script setup>
import { ref } from 'vue'
import { wCard, wDeadToggle, wClickable, wTag } from '#components'

const selected = ref(false)
const foo = ref('')
</script>

<template>
  <div>
    <component-title title="Card" />

    <token>
      <div class="w-1/2">
        <w-card :selected="selected">
          <img class="h-144 w-full object-cover" src="https://source.unsplash.com/random/600x600" />
          <w-tag top-left primary sponsored class="absolute top-0 left-0 text-14">Ukens bolig</w-tag>
          <div class="p-16">
            <p class="text-12 text-gray-300">DNB Eiendom</p>
            <p><w-clickable @click="selected = !selected" class="text-left">Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</w-clickable></p>
            <p class="text-14 text-gray-400 mb-0">Eier (Selveier) <span class="text-gray-200">•</span> Leilighet <span class="text-gray-200">•</span> 2 soverom</p>
          </div>
        </w-card>
      </div>
    </token>

    <token :state="foo">
      <div class="grid grid-cols-2 gap-16">
        <w-card flat class="py-4 px-12 flex items-center" :selected="foo === 'foo'">
          <w-dead-toggle radio v-model="foo" value="foo" />
          <div class="ml-12">
            <h4 class="mb-0"><w-clickable radio v-model="foo" value="foo">Purchase foo</w-clickable></h4>
            <p class="mb-0 text-14">470 kr/mnd</p>
          </div>
        </w-card>
        <w-card flat class="py-8 px-12 flex items-center" :selected="foo === 'bar'">
          <w-dead-toggle radio v-model="foo" value="bar" />
          <div class="ml-12">
            <h4 class="mb-0"><w-clickable radio v-model="foo" value="bar">Purchase bar</w-clickable></h4>
            <p class="mb-0 text-14">520 kr/mnd</p>
          </div>
        </w-card>
      </div>
    </token>

  </div>
</template>
