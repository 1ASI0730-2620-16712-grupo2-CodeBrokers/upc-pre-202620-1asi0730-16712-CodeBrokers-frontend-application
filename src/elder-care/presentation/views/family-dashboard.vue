<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import { useWorkspace } from "../../../shared/application/workspace.store.js";
import { useFormat } from "../../../shared/presentation/format.js";
import StatePanel from "../../../shared/presentation/components/state-panel.vue";
import StatusTag from "../../../shared/presentation/components/status-tag.vue";
const route = useRoute(),
  router = useRouter(),
  { t } = useI18n(),
  { date } = useFormat(),
  store = useWorkspace();
const selected = computed(() => route.query.patient || store.patients[0]?.id);
const patient = computed(() =>
  store.patients.find((p) => p.id === selected.value),
);
const alerts = computed(() =>
  store.alerts.filter(
    (a) =>
      a.patientId === selected.value &&
      ["PENDING", "IN_REVIEW"].includes(a.status),
  ),
);
const latest = computed(() =>
  ["heartRate", "oxygen", "bloodPressure", "glucose"].map((type) => ({
    type,
    record: store.records
      .filter((r) => r.patientId === selected.value && r.type === type)
      .sort(
        (a, b) =>
          b.recordedAt.localeCompare(a.recordedAt) || a.id.localeCompare(b.id),
      )[0],
  })),
);
onMounted(() => store.load("family"));
</script>
<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">{{ t("familyWorkspace") }}</p>
      <h1>{{ t("familyOverview") }}</h1>
      <p class="muted">{{ t("familyOverviewCopy") }}</p>
    </div>
    <Button
      :label="t('refresh')"
      icon="pi pi-refresh"
      severity="secondary"
      outlined
      :disabled="store.loading"
      @click="store.load()"
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
    <div v-if="store.patients.length" class="filters">
      <label for="family-patient">{{ t("chooseAdult") }}</label
      ><select
        id="family-patient"
        :value="selected"
        @change="router.replace({ query: { patient: $event.target.value } })"
      >
        <option v-for="p in store.patients" :key="p.id" :value="p.id">
          {{ p.fullName }}
        </option>
      </select>
    </div>
    <StatePanel :empty="!store.patients.length" />
    <section v-if="store.patients.length && !patient" class="panel state">
      <h2>{{ t("unavailablePatient") }}</h2>
      <p>{{ t("unavailablePatientCopy") }}</p>
    </section>
    <template v-if="patient"
      ><section class="patient-header panel">
        <span class="avatar large">{{ patient.initials }}</span>
        <div>
          <p class="eyebrow">{{ t("yourLovedOne") }}</p>
          <h2>{{ patient.fullName }}</h2>
          <p class="muted">
            {{ patient.age }} {{ t("years") }} · {{ patient.location }} ·
            {{ patient.id }}
          </p>
        </div>
        <div class="family-summary">
          <span class="eyebrow">{{ t("openAlerts") }}</span
          ><strong>{{ alerts.length }}</strong
          ><small>{{ t("recordedOnly") }}</small>
        </div>
      </section>
      <div class="data-caption">
        <span>{{ t("lastRecord") }}: {{ date(patient.lastRecordAt) }}</span
        ><span>{{ t("lastChecked") }}: {{ date(store.lastFetched) }}</span>
      </div>
      <p class="notice">
        {{ t(alerts.length ? "datedRecordsNotice" : "noClinicalConclusion") }}
      </p>
      <h2>{{ t("latestRecords") }}</h2>
      <div class="vitals-grid">
        <article v-for="item in latest" :key="item.type" class="panel vital">
          <span class="vital-icon pi pi-heart" aria-hidden="true" />
          <h3>{{ t("types." + item.type) }}</h3>
          <p v-if="item.record" class="vital-number">
            {{ item.record.value }} <small>{{ item.record.unit }}</small>
          </p>
          <p v-else class="muted">{{ t("noData") }}</p>
          <time v-if="item.record" class="small muted">{{
            date(item.record.recordedAt)
          }}</time>
        </article>
      </div>
      <section class="panel">
        <div class="section-heading">
          <h2>{{ t("activeCases") }}</h2>
          <span class="result-count"
            >{{ alerts.length }} {{ t("results") }}</span
          >
        </div>
        <StatePanel :empty="!alerts.length" /><RouterLink
          v-for="a in alerts"
          :key="a.id"
          :to="{
            path: '/family/cases/' + a.id,
            query: { patient: patient.id },
          }"
          class="alert-row"
          ><div class="alert-person">
            <strong>{{ t("types." + a.type) }}</strong
            ><span>{{ a.id }} · {{ date(a.raisedAt) }}</span>
          </div>
          <StatusTag :value="a.severity" /><StatusTag :value="a.status" /><span
            class="text-link"
            >{{ t("followCase") }} →</span
          ></RouterLink
        >
      </section>
    </template></template
  >
</template>
