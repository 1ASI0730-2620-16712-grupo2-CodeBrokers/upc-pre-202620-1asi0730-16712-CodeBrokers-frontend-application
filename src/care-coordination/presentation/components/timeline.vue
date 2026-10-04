<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { timeline, latestProfessional } from "../../domain/intervention.js";
import { useFormat } from "../../../shared/presentation/format.js";
import StatusTag from "../../../shared/presentation/components/status-tag.vue";
const props = defineProps({
  items: Array,
  alertId: String,
  professional: Boolean,
});
const { t } = useI18n(),
  { date } = useFormat();
const events = computed(() => timeline(props.items, props.alertId));
const last = computed(() => latestProfessional(props.items, props.alertId));
</script>
<template>
  <section class="timeline-block">
    <h3>{{ t("careTimeline") }}</h3>
    <p v-if="professional" class="review-summary">
      {{
        last
          ? t("lastProfessional") + ": " + last.actor + " · " + date(last.at)
          : t("noProfessional")
      }}
    </p>
    <p v-if="!events.length" class="muted">{{ t("noIntervention") }}</p>
    <ol v-else class="timeline">
      <li v-for="event in events" :key="event.id">
        <span class="timeline-dot" aria-hidden="true" />
        <div>
          <strong>{{ event.actor }}</strong
          ><span class="muted small"> · {{ t(event.role) }}</span>
          <div class="transition">
            <StatusTag :value="event.from" /><span aria-hidden="true">→</span
            ><span class="sr-only">{{ t("changedTo") }}</span
            ><StatusTag :value="event.to" />
          </div>
          <time class="small muted">{{ date(event.at) }}</time>
        </div>
      </li>
    </ol>
  </section>
</template>
