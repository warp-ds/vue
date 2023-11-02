<script setup>
import { ref } from 'vue'
import { wCard, wDeadToggle, wClickable, wBadge } from '#components'

const selected = ref(false)
const foo = ref('')

const checkModel = ref(false)
const radioModel = ref('')

</script>

<template>
  <div>
    <component-title title="Card" />

    <token>
      <div class="space-y-32 md:space-y-0 md:grid grid-cols-3 gap-32">
        <w-card :selected="selected">
          <img class="h-128 w-full object-cover" src="https://source.unsplash.com/random/400x400" />
          <w-badge variant="info" position="top-left">Ukens bolig</w-badge>
          <div class="p-16">
            <p class="text-12 s-text-subtle">DNB Eiendom</p>
            <p><w-clickable @click="selected = !selected" class="text-left">Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</w-clickable></p>
            <p class="text-14 s-text-subtle mb-4">Bøgata 25C, 0655 Oslo</p>
            <p class="font-bold my-8">52 m<span style="font-size: 10px; vertical-align: super;">2</span> Totalpris: 4 869 039 kr</p>
            <p class="text-14 s-text-subtle mb-0">Eier (Selveier) <span class="s-text-disabled">•</span> Leilighet <span class="s-text-disabled">•</span> 2 soverom</p>
          </div>
        </w-card>
        <w-card :selected="selected">
          <img class="h-128 w-full object-cover" src="https://source.unsplash.com/random/400x402" />
          <w-badge variant="info" position="top-left">Ukens bolig</w-badge>
          <div class="p-16">
            <p class="text-12 s-text-subtle">DNB Eiendom</p>
            <p><w-clickable @click="selected = !selected" class="text-left">Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</w-clickable></p>
            <p class="text-14 s-text-subtle mb-4">Bøgata 25C, 0655 Oslo</p>
            <p class="font-bold my-8">52 m<span style="font-size: 10px; vertical-align: super;">2</span> Totalpris: 4 869 039 kr</p>
            <p class="text-14 s-text-subtle mb-0">Eier (Selveier) <span class="s-text-disabled">•</span> Leilighet <span class="s-text-disabled">•</span> 2 soverom</p>
          </div>
        </w-card>
        <w-card :selected="selected">
          <img class="h-128 w-full object-cover" src="https://source.unsplash.com/random/400x404" />
          <w-badge variant="info" position="top-left">Ukens bolig</w-badge>
          <div class="p-16">
            <p class="text-12 s-text-subtle">DNB Eiendom</p>
            <p><w-clickable @click="selected = !selected" class="text-left">Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</w-clickable></p>
            <p class="text-14 s-text-subtle mb-4">Bøgata 25C, 0655 Oslo</p>
            <p class="font-bold my-8">52 m<span style="font-size: 10px; vertical-align: super;">2</span> Totalpris: 4 869 039 kr</p>
            <p class="text-14 s-text-subtle mb-0">Eier (Selveier) <span class="s-text-disabled">•</span> Leilighet <span class="s-text-disabled">•</span> 2 soverom</p>
          </div>
        
        </w-card>
      </div>

      <w-card :selected="checkModel" class="mt-32 w-max">
        <div class="p-24 flex">
          <w-dead-toggle checkbox v-model="checkModel" :value="true" />
          <w-clickable checkbox :value="true" v-model="checkModel" label-class="ml-12 text-16">Check in a card</w-clickable>
        </div>
      </w-card>

      <div class="flex gap-32 mt-32">
        <w-card :selected="radioModel === 'foo'" class="w-max">
          <div class="p-24 flex">
            <w-dead-toggle radio v-model="radioModel" value="foo" />
            <w-clickable radio value="foo" v-model="radioModel" label-class="ml-12" name="radio-group">Radio in a card - A</w-clickable>
          </div>
        </w-card>
        <w-card :selected="radioModel === 'bar'" class="w-max">
          <div class="p-24 flex">
            <w-dead-toggle radio v-model="radioModel" value="bar" />
            <w-clickable radio value="bar" v-model="radioModel" label-class="ml-12" name="radio-group">Radio in a card - B</w-clickable>
          </div>
        </w-card>
      </div>
    </token>
    <token>
      <div class="w-1/2">
        <w-card :selected="selected">
          <img class="h-144 w-full object-cover" src="https://source.unsplash.com/random/600x600" />
          <w-badge variant="info" position="top-left">Ukens bolig</w-badge>
          <div class="p-16">
            <p class="text-12 s-text-subtle">DNB Eiendom</p>
            <p><w-clickable @click="selected = !selected" class="text-left">Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</w-clickable></p>
            <p class="text-14 s-text-subtle mb-0">Eier (Selveier) <span class="s-text-disabled">•</span> Leilighet <span class="s-text-disabled">•</span> 2 soverom</p>
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
