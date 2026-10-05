<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import { useWorkspace } from "../../../shared/application/workspace.store.js";
import { useFormat } from "../../../shared/presentation/format.js";
import StatusTag from "../../../shared/presentation/components/status-tag.vue";
import StatePanel from "../../../shared/presentation/components/state-panel.vue";
import Timeline from "../components/timeline.vue";
import { timeline } from "../../domain/intervention.js";
const route = useRoute(),
  { t } = useI18n(),
  { date } = useFormat(),
  store = useWorkspace();
const alert = computed(() =>
  store.alerts.find((a) => a.id === route.params.id),
);
const patient = computed(() =>
  store.patients.find((p) => p.id === alert.value?.patientId),
);
const last = computed(() =>
  timeline(store.interventions, route.params.id).at(-1),
);
watch(
  () => route.params.id,
  () => store.load("family"),
  { immediate: true },
);
</script>
<template>
  <RouterLink
    :to="{ path: '/family', query: { patient: route.query.patient } }"
    class="text-link back-link"
    >← {{ t("familyOverview") }}</RouterLink
  >
  <div class="page-heading">
    <div>
      <p class="eyebrow">{{ t("familyWorkspace") }}</p>
      <h1>{{ t("caseFollowUp") }}</h1>
    </div>
    <Button
      :label="t('refresh')"
      icon="pi pi-refresh"
      outlined
      @click="store.load()"
      :disabled="store.loading"
    />
  </div>
  <StatePanel
    :loading="store.loading"
    :error="store.error"
    :stale="store.stale"
    @retry="store.load()"
  />
  <template v-if="!store.loading && (!store.error || store.stale)"
    ><p v-if="store.stale" class="stale-banner">{{ t("stale") }}</p>
    <section v-if="!alert || !patient" class="panel state">
      <h2>{{ t("unavailableCase") }}</h2>
      <p>{{ t("unavailablePatientCopy") }}</p>
    </section>
    <section v-else class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ alert.id }} · {{ patient.id }}</p>
          <h2>{{ patient.fullName }}</h2>
          <p class="muted">{{ t("types." + alert.type) }}</p>
        </div>
        <StatusTag :value="alert.severity" />
      </div>
      <div class="case-status">
        <StatusTag :value="alert.status" /><time>{{
          date(alert.raisedAt)
        }}</time>
      </div>
      <section class="responsible-panel">
        <h3>{{ t("lastResponsible") }}</h3>
        <template v-if="last"
          ><strong>{{ last.actor }}</strong>
          <p>{{ t(last.role) }} · {{ date(last.at) }}</p></template
        >
        <p v-else>{{ t("noIntervention") }}</p>
      </section>
      <Timeline :items="store.interventions" :alert-id="alert.id" />
      <p class="notice">{{ t("restrictedNotes") }}</p>
      <p class="small muted">
        {{ t("lastChecked") }}: {{ date(store.lastFetched) }}
      </p>
    </section></template
  >
</template>
