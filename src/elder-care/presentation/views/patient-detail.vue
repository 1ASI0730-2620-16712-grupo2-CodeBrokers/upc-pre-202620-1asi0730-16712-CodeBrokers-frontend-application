<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import { useWorkspace } from "../../../shared/application/workspace.store.js";
import StatusTag from "../../../shared/presentation/components/status-tag.vue";
import StatePanel from "../../../shared/presentation/components/state-panel.vue";
import { useFormat } from "../../../shared/presentation/format.js";
const route = useRoute(),
  { t } = useI18n(),
  { date } = useFormat(),
  store = useWorkspace();
const patient = computed(() =>
  store.patients.find((p) => p.id === route.params.id),
);
const alerts = computed(() =>
  store.alerts.filter((a) => a.patientId === route.params.id),
);
const back = computed(() =>
  route.query.from === "patients"
    ? {
        path: "/professional/patients",
        query: {
          search: route.query.search,
          status: route.query.status,
          outdated: route.query.outdated,
        },
      }
    : {
        path: "/professional",
        query: {
          status: route.query.returnStatus || "PENDING",
          order: route.query.returnOrder || "desc",
        },
      },
);
watch(
  () => route.params.id,
  () => store.load("professional"),
  { immediate: true },
);
</script>
<template>
  <RouterLink :to="back" class="text-link back-link"
    >← {{ t("backToList") }}</RouterLink
  ><StatePanel
    :loading="store.loading"
    :error="store.error"
    :stale="store.stale"
    @retry="store.load()"
  />
  <template v-if="!store.loading && (!store.error || store.stale)"
    ><p v-if="store.stale" class="stale-banner">{{ t("stale") }}</p>
    <section v-if="!patient" class="panel state" role="alert">
      <h1>{{ t("unavailablePatient") }}</h1>
      <p>{{ t("unavailablePatientCopy") }}</p>
    </section>
    <template v-else>
      <div class="patient-header panel">
        <div class="avatar large">{{ patient.initials }}</div>
        <div>
          <p class="eyebrow">{{ t("patientDetail") }}</p>
          <h1>{{ patient.fullName }}</h1>
          <p class="muted">
            {{ patient.id }} · {{ patient.age }} {{ t("years") }} ·
            {{ patient.location }}
          </p>
        </div>
        <Button
          :label="t('refresh')"
          icon="pi pi-refresh"
          outlined
          severity="secondary"
          @click="store.load()"
        />
      </div>
      <div class="detail-grid">
        <div>
          <div class="section-heading">
            <h2>{{ t("alertList") }}</h2>
            <span class="muted small"
              >{{ alerts.length }} {{ t("results") }}</span
            >
          </div>
          <StatePanel :empty="!alerts.length" />
          <article
            v-for="a in alerts"
            :key="a.id"
            class="panel case-card"
            :class="{ selected: route.query.alert === a.id }"
          >
            <div class="section-heading">
              <div>
                <p class="eyebrow">{{ a.id }}</p>
                <h2>{{ t("types." + a.type) }}</h2>
              </div>
              <StatusTag :value="a.severity" />
            </div>
            <div class="case-status">
              <StatusTag :value="a.status" /><time class="small muted">{{
                date(a.raisedAt)
              }}</time>
            </div>
          </article>
        </div>
        <aside>
          <section class="panel side-card">
            <span class="feature-icon pi pi-history" aria-hidden="true" />
            <h2>{{ t("healthHistory") }}</h2>
            <p class="muted">{{ t("historyIntro") }}</p>
            <RouterLink
              :to="{
                path: '/professional/patients/' + patient.id + '/history',
                query: route.query,
              }"
              class="text-link"
              >{{ t("viewHistory") }} →</RouterLink
            >
          </section>
          <section class="panel side-card">
            <h2>{{ t("recordInformation") }}</h2>
            <p class="small muted">{{ t("lastRecord") }}</p>
            <p>{{ date(patient.lastRecordAt) }}</p>
            <p class="small muted">{{ t("readOnlyCopy") }}</p>
          </section>
        </aside>
      </div></template
    ></template
  >
</template>
