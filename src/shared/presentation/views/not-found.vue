<template>
  <main id="main" tabindex="-1" class="entry not-found">
    <span class="eyebrow">VitaLink</span>
    <h1>{{ $t("notFound") }}</h1>
    <p>{{ $t("notFoundCopy") }}</p>
    <RouterLink to="/" class="primary-link">{{ $t("backHome") }}</RouterLink>
  </main>
</template>
