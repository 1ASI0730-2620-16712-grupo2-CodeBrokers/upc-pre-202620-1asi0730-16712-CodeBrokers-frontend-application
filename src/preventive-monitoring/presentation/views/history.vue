<script setup>
import { getHealthRecords } from '@/shared/infrastructure/workspace-api.js';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getHealthRecords } from '@/shared/infrastructure/workspace-api';

const route = useRoute();
const olderAdultId = computed(() => route.params.id);

const records = ref([]);
const isLoading = ref(true);
const isError = ref(false);

const selectedType = ref('');
const startDate = ref('');
const endDate = ref('');

const fetchHistory = async () => {
  if (!olderAdultId.value) return;
  isLoading.value = true;
  isError.value = false;
  
  try {
    const data = await getHealthRecords(olderAdultId.value);
    records.value = Array.isArray(data) ? data : (data.items || []);
  } catch (err) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const filteredRecords = computed(() => {
  return records.value.filter(record => {
    const matchesType = !selectedType.value || record.recordTypeCode === selectedType.value;
    const recordDate = new Date(record.createdAt || record.timestamp);
    const matchesStart = !startDate.value || recordDate >= new Date(startDate.value);
    const matchesEnd = !endDate.value || recordDate <= new Date(endDate.value);
    return matchesType && matchesStart && matchesEnd;
  });
});

onMounted(() => {
  fetchHistory();
});
</script>

<template>
  <RouterLink
    :to="{
      path: '/professional/patients/' + route.params.id,
      query: route.query,
    }"
    class="text-link back-link"
    >← {{ t("backPatient") }}</RouterLink
  >
  <div class="page-heading">
    <div>
      <p class="eyebrow">{{ patient?.fullName || t("patientDetail") }}</p>
      <h1>{{ t("healthHistory") }}</h1>
      <p class="muted">{{ t("historyCopy") }}</p>
    </div>
    <Button
      :label="t('refresh')"
      icon="pi pi-refresh"
      outlined
      @click="store.load()"
      :disabled="store.loading"
    />
  </div>
  <form class="panel filters" @submit.prevent="apply">
    <label
      >{{ t("fromDate")
      }}<input
        type="date"
        v-model="from"
        :aria-invalid="!!validation"
        :aria-describedby="validation ? 'date-error' : undefined" /></label
    ><label
      >{{ t("toDate")
      }}<input
        type="date"
        v-model="to"
        :aria-invalid="!!validation"
        :aria-describedby="validation ? 'date-error' : undefined" /></label
    ><label
      >{{ t("recordType")
      }}<select v-model="type">
        <option value="ALL">{{ t("allTypes") }}</option>
        <option
          v-for="k in [
            'heartRate',
            'oxygen',
            'bloodPressure',
            'glucose',
            'note',
          ]"
          :value="k"
        >
          {{ t("types." + k) }}
        </option>
      </select></label
    ><Button :label="t('applyFilters')" type="submit" /><Button
      :label="t('resetFilters')"
      severity="secondary"
      outlined
      type="button"
      @click="clear"
    />
    <p v-if="validation" id="date-error" class="field-error" role="alert">
      {{ t(validation) }}
    </p>
  </form>
  <StatePanel
    :loading="store.loading"
    :error="store.error"
    :stale="store.stale"
    @retry="store.load()"
  /><template v-if="!store.loading && (!store.error || store.stale)"
    ><p v-if="store.stale" class="stale-banner">{{ t("stale") }}</p>
    <section v-if="!patient" class="panel state">
      <h2>{{ t("unavailablePatient") }}</h2>
      <p>{{ t("unavailablePatientCopy") }}</p>
    </section>
    <template v-else
      ><p class="result-count" aria-live="polite">
        {{ filtered.length }} {{ t("results") }} · UTC−05:00
      </p>
      <StatePanel :empty="!filtered.length" />
      <ol class="records">
        <li v-for="record in filtered" :key="record.id" class="panel record">
          <div>
            <span class="eyebrow">{{ record.id }}</span>
            <h2>{{ t("types." + record.type) }}</h2>
            <p v-if="record.note" class="muted">
              {{ t("notes." + record.note) }}
            </p>
            <span class="small muted"
              >{{ t("origin") }}: {{ t("origins." + record.origin) }}</span
            >
          </div>
          <div class="record-value">
            <strong v-if="record.value !== null"
              >{{ record.value }} <small>{{ record.unit }}</small></strong
            ><time>{{ date(record.recordedAt) }}</time>
          </div>
        </li>
      </ol></template
    ></template
  >
</template>
