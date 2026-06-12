<template>
  <section id="contact" class="section-y bg-warm-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.contact') }}</span>
        <h2 class="section-title font-display font-bold text-warm-900 mt-3 mb-4">{{ $t('contact.title') }}</h2>
      </div>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="anim-scroll card-hover fluid-panel rounded-lg p-6 text-center delay-1">
          <div class="w-14 h-14 rounded-lg mx-auto mb-5 flex items-center justify-center bg-blue-100">
            <i class="fas fa-phone text-2xl text-blue-500"></i>
          </div>
          <h3 class="font-display font-bold text-lg text-warm-900 mb-2">{{ $t('contact.phone') }}</h3>
          <p class="text-warm-500 text-sm leading-relaxed">+237 6 90 83 69 01</p>
        </div>

        <div class="anim-scroll card-hover fluid-panel rounded-lg p-6 text-center delay-2">
          <div class="w-14 h-14 rounded-lg mx-auto mb-5 flex items-center justify-center bg-green-100">
            <i class="fas fa-envelope text-2xl text-green-500"></i>
          </div>
          <h3 class="font-display font-bold text-lg text-warm-900 mb-2">{{ $t('contact.email') }}</h3>
          <p class="text-warm-500 text-sm leading-relaxed">contact@angeloclinic.cm</p>
        </div>

        <div class="anim-scroll card-hover fluid-panel rounded-lg p-6 text-center delay-3">
          <div class="w-14 h-14 rounded-lg mx-auto mb-5 flex items-center justify-center bg-purple-100">
            <i class="fas fa-map-marker-alt text-2xl text-purple-500"></i>
          </div>
          <h3 class="font-display font-bold text-lg text-warm-900 mb-2">{{ $t('contact.address') }}</h3>
          <p class="text-warm-500 text-sm leading-relaxed">Clinique Angelo, Logpom, Douala</p>
          <p class="text-warm-400 text-xs mt-1">En face de Gar Bon Bar</p>
        </div>
      </div>
      <div class="anim-scroll fluid-panel mt-10 overflow-hidden rounded-lg">
        <iframe
          :src="mapEmbedUrl"
          class="w-full h-[360px] border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
          title="Carte Clinique Angelo"
        ></iframe>
        <div class="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-warm-200/50">
          <div>
            <p class="text-warm-900 font-semibold">Clinique Angelo</p>
            <p class="text-warm-500 text-sm">Logpom, Douala, en face de Gar Bon Bar</p>
          </div>
          <a
            :href="mapLinkUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition"
          >
            <i class="fas fa-location-arrow"></i>
            Ouvrir dans Maps
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const mapQuery = encodeURIComponent('Clinique Angelo Logpom Douala en face de Gar Bon Bar')
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`
const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
</script>
