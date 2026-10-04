<template>
  <main id="main" tabindex="-1" class="entry terms-page">
    <span class="eyebrow">VitaLink</span>
    <h1>{{ $t("terms") }}</h1>
    <p>{{ $t("termsCopy") }}</p>
    <p>{{ $t("termsStorage") }}</p>
    <RouterLink to="/" class="primary-link">{{ $t("backHome") }}</RouterLink>
  </main>
</template>
