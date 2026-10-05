<script setup>
import { ref, watch, toRaw } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import { normalizeLocale } from "../../../shared/domain/locale.js";
import {
  loadPreferences,
  savePreferences,
} from "../../infrastructure/preference.repository.js";
const route = useRoute(),
  { t, locale } = useI18n(),
  draft = ref(loadPreferences(route.meta.role)),
  busy = ref(false),
  feedback = ref(""),
  error = ref("");
let generation = 0;
watch(
  () => route.meta.role,
  (role) => {
    generation++;
    draft.value = loadPreferences(role);
    feedback.value = "";
    error.value = "";
    busy.value = false;
  },
);

/**
 * Persists the selected interface language.
 *
 * @param {string} value - Locale identifier.
 */
function changeLanguage(value) {
  locale.value = normalizeLocale(value);
  try {
    localStorage.setItem("vitalink.locale", locale.value);
    error.value = "";
    feedback.value = "languageSaved";
  } catch {
    error.value = "storageError";
  }
}

/**
 * Saves the current notification preferences.
 *
 * @returns {Promise<void>}
 */
async function save() {
  const token = ++generation;
  busy.value = true;
  error.value = "";
  feedback.value = "";
  try {
    await savePreferences(route.meta.role, structuredClone(toRaw(draft.value)));
    if (token === generation) feedback.value = "saved";
  } catch (e) {
    if (token === generation) error.value = e.message;
  } finally {
    if (token === generation) busy.value = false;
  }
}
</script>
<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">{{ t("yourExperience") }}</p>
      <h1>{{ t("preferences") }}</h1>
      <p class="muted">{{ t("preferencesCopy") }}</p>
    </div>
  </div>
  <section class="panel settings-section">
    <div class="settings-title">
      <i class="pi pi-language" aria-hidden="true" />
      <div>
        <h2>{{ t("language") }}</h2>
        <p class="muted">{{ t("languageCopy") }}</p>
      </div>
    </div>
    <label for="language-preference">{{ t("language") }}</label
    ><select
      id="language-preference"
      :value="locale"
      @change="changeLanguage($event.target.value)"
    >
      <option value="en_US">English</option>
      <option value="es_419">Español latinoamericano</option>
    </select>
  </section>
  <form class="panel settings-section" @submit.prevent="save">
    <div class="settings-title">
      <i class="pi pi-bell" aria-hidden="true" />
      <div>
        <h2>{{ t("notificationPreferences") }}</h2>
        <p class="muted">{{ t("notificationCopy") }}</p>
      </div>
    </div>
    <p class="notice">{{ t("localPreferences") }}</p>
    <div class="channel-info">
      <span>{{ t("email") }} · {{ t("verified") }}</span
      ><span>{{ t("sms") }} · {{ t("notVerified") }}</span>
    </div>
    <fieldset
      v-for="event in ['alert', 'statusChange', 'security']"
      :key="event"
      class="preference-row"
    >
      <legend>{{ t("events." + event) }}</legend>
      <p v-if="event === 'security'" class="small muted">
        {{ t("mandatoryCopy") }}
      </p>
      <label
        ><input
          type="checkbox"
          v-model="draft[event].email"
          :disabled="event === 'security' || busy"
        />{{ t("email") }}
        <small v-if="event === 'security'">({{ t("required") }})</small></label
      ><label
        ><input type="checkbox" :checked="false" disabled />{{
          t("sms")
        }}</label
      >
    </fieldset>
    <p v-if="error" role="alert" class="field-error">{{ t(error) }}</p>
    <p v-if="feedback" role="status" class="saved-message">{{ t(feedback) }}</p>
    <Button
      :label="busy ? t('saving') : t('savePreferences')"
      :loading="busy"
      type="submit"
      icon="pi pi-check"
    />
    <p class="small muted settings-footnote">{{ t("historyUnchanged") }}</p>
  </form>
</template>
