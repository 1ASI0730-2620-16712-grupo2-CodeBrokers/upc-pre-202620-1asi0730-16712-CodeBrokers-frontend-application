<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import { useWorkspace } from "../../../shared/application/workspace.store.js";
import { filterPatients } from "../../domain/patient.js";
import { openStatuses } from "../../../alerting/domain/alert.js";
import StatePanel from "../../../shared/presentation/components/state-panel.vue";
import { useFormat } from "../../../shared/presentation/format.js";
const { t } = useI18n(),
    store = useWorkspace(),
    route = useRoute(),
    router = useRouter(),
    { date } = useFormat();
const options = computed(() => ({
  search: String(route.query.search || ""),
  status: String(route.query.status || "ALL"),
  outdated: route.query.outdated === "1",
}));
const filtered = computed(() =>
    filterPatients(store.patients, store.alerts, options.value),
);

/**
 * Updates one patient filter in the route query.
 *
 * @param {string} key - Query parameter name.
 * @param {string|undefined} value - Selected filter value.
 */
function update(key, value) {
  router.replace({ query: { ...route.query, [key]: value } });
}
onMounted(() => store.load("professional"));
</script>
<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">{{ t("clinicalWorkspace") }}</p>
      <h1>{{ t("assignedPatients") }}</h1>
      <p class="muted">{{ t("patientsCopy") }}</p>
    </div>
    <Button
        :label="t('refresh')"
        icon="pi pi-refresh"
        outlined
        @click="store.load()"
        :disabled="store.loading"
    />
  </div>
  <div class="panel filters">
    <label class="search-field"
    >{{ t("searchPatient")
      }}<input
          type="search"
          :value="options.search"
          :placeholder="t('searchPlaceholder')"
          @input="update('search', $event.target.value)" /></label
    ><label
  >{{ t("status")
    }}<select
        :value="options.status"
        @change="update('status', $event.target.value)"
    >
      <option value="ALL">{{ t("allStatuses") }}</option>
      <option
          v-for="s in ['PENDING', 'IN_REVIEW', 'ATTENDED', 'CLOSED']"
          :value="s"
      >
        {{ t("codes." + s) }}
      </option>
    </select></label
  ><label class="check-label"
  ><input
      type="checkbox"
      :checked="options.outdated"
      @change="update('outdated', $event.target.checked ? '1' : undefined)"
  />{{ t("outdatedOnly") }}</label
  ><Button
      :label="t('resetFilters')"
      severity="secondary"
      outlined
      @click="router.replace({ query: {} })"
  />
  </div>
  <StatePanel
      :loading="store.loading"
      :error="store.error"
      :stale="store.stale"
      @retry="store.load()"
  /><template v-if="!store.loading && (!store.error || store.stale)"
><p v-if="store.stale" class="stale-banner">{{ t("stale") }}</p>
  <p class="result-count" aria-live="polite">
    {{ filtered.length }} {{ t("patientsFound") }}
  </p>
  <StatePanel :empty="!filtered.length" />
  <div class="patient-grid">
    <RouterLink
        v-for="p in filtered"
        :key="p.id"
        :to="{
          path: '/professional/patients/' + p.id,
          query: {
            from: 'patients',
            search: options.search,
            status: options.status,
            outdated: options.outdated ? '1' : undefined,
          },
        }"
        class="patient-card panel"
    ><div class="patient-card-top">
          <span class="avatar large">{{ p.initials }}</span
          ><i class="pi pi-arrow-up-right" aria-hidden="true" />
    </div>
      <h2>{{ p.fullName }}</h2>
      <p class="muted">
        {{ p.id }} · {{ p.age }} {{ t("years") }} · {{ p.location }}
      </p>
      <div class="patient-card-foot">
          <span
          >{{ t("openAlerts") }}
            <strong>{{
                store.alerts.filter(
                    (a) => a.patientId === p.id && openStatuses.includes(a.status),
                ).length
              }}</strong></span
          ><small
      >{{ t("lastRecord") }}<br />{{
          p.lastRecordAt ? date(p.lastRecordAt) : t("noRecords")
        }}</small
      >
      </div>
      <span v-if="p.outdated && p.lastRecordAt" class="outdated-label">{{
          t("outdatedRecord")
        }}</span></RouterLink
    >
  </div></template
>
</template>