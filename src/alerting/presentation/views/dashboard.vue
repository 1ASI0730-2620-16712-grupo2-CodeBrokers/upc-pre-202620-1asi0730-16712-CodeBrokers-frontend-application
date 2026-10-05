<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import { useWorkspace } from "../../../shared/application/workspace.store.js";
import { pendingCount, orderAlerts } from "../../domain/alert.js";
import StatusTag from "../../../shared/presentation/components/status-tag.vue";
import StatePanel from "../../../shared/presentation/components/state-panel.vue";
import { useFormat } from "../../../shared/presentation/format.js";
const { t } = useI18n(),
  store = useWorkspace(),
  route = useRoute(),
  router = useRouter(),
  { date } = useFormat();
const status = computed(() => route.query.status || "PENDING"),
  direction = computed(() => route.query.order || "desc");
const filtered = computed(() =>
  orderAlerts(
    store.alerts.filter(
      (a) => status.value === "ALL" || a.status === status.value,
    ),
    direction.value,
  ),
);

/**
 * Updates one dashboard filter in the route query.
 *
 * @param {string} key - Query parameter name.
 * @param {string} value - Selected filter value.
 */
function setFilter(key, value) {
  router.replace({ query: { ...route.query, [key]: value } });
}
onMounted(() => store.load("professional"));
</script>
<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">{{ t("clinicalWorkspace") }}</p>
      <h1>{{ t("careOverview") }}</h1>
      <p class="muted">{{ t("overviewCopy") }}</p>
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
    ><div v-if="store.stale" class="stale-banner">{{ t("stale") }}</div>
    <section class="stats-grid" :aria-label="t('summary')">
      <button class="stat-card pending" @click="setFilter('status', 'PENDING')">
        <span>{{ t("pendingAlerts") }}</span
        ><strong data-testid="pending-count">{{
          pendingCount(store.alerts)
        }}</strong
        ><small>{{ t("countAlerts") }}</small>
      </button>
      <div class="stat-card">
        <span>{{ t("inReview") }}</span
        ><strong>{{
          store.alerts.filter((a) => a.status === "IN_REVIEW").length
        }}</strong
        ><small>{{ t("coordination") }}</small>
      </div>
      <RouterLink class="stat-card" to="/professional/patients"
        ><span>{{ t("assignedPatients") }}</span
        ><strong>{{ store.patients.length }}</strong
        ><small>{{ t("viewPatients") }} →</small></RouterLink
      >
    </section>
    <section class="panel">
      <div class="section-heading">
        <div>
          <h2>{{ t("alertList") }}</h2>
          <p class="muted small">
            {{ t("lastChecked") }}: {{ date(store.lastFetched) }}
          </p>
        </div>
        <span class="result-count"
          >{{ filtered.length }} {{ t("results") }}</span
        >
      </div>
      <div class="filters">
        <label
          >{{ t("status")
          }}<select
            :value="status"
            @change="setFilter('status', $event.target.value)"
          >
            <option value="ALL">{{ t("allStatuses") }}</option>
            <option
              v-for="s in ['PENDING', 'IN_REVIEW', 'ATTENDED', 'CLOSED']"
              :value="s"
            >
              {{ t("codes." + s) }}
            </option>
          </select></label
        ><label
          >{{ t("sortPriority")
          }}<select
            :value="direction"
            @change="setFilter('order', $event.target.value)"
          >
            <option value="desc">{{ t("highestFirst") }}</option>
            <option value="asc">{{ t("lowestFirst") }}</option>
          </select></label
        >
      </div>
      <StatePanel :empty="!filtered.length" />
      <div class="alert-list">
        <RouterLink
          v-for="alert in filtered"
          :key="alert.id"
          :to="{
            path: '/professional/patients/' + alert.patientId,
            query: {
              alert: alert.id,
              returnStatus: status,
              returnOrder: direction,
            },
          }"
          class="alert-row"
          ><div class="avatar">
            {{ store.patients.find((p) => p.id === alert.patientId)?.initials }}
          </div>
          <div class="alert-person">
            <strong>{{
              store.patients.find((p) => p.id === alert.patientId)?.fullName
            }}</strong
            ><span>{{ t("types." + alert.type) }} · {{ alert.id }}</span>
          </div>
          <StatusTag :value="alert.severity" /><StatusTag
            :value="alert.status" /><time>{{ date(alert.raisedAt) }}</time
          ><i class="pi pi-arrow-up-right" aria-hidden="true"
        /></RouterLink>
      </div></section
  ></template>
</template>
