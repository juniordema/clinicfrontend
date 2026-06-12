<template>
  <section id="marketing-hub" class="section-y bg-gradient-to-b from-warm-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-[0.78fr_1.22fr] gap-12 items-start">
        <div class="anim-scroll">
          <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">
            {{ $t('features.eyebrow') }}
          </span>
          <h2 class="section-title font-display font-bold text-warm-900 mt-3 mb-5">
            {{ $t('features.title') }}
          </h2>
          <p class="text-warm-600 leading-relaxed mb-8">
            {{ $t('features.description') }}
          </p>

          <div class="rounded-lg bg-white border border-warm-200 p-5 shadow-sm">
            <div class="text-sm font-semibold text-warm-800 mb-4">{{ $t('features.workflow') }}</div>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="step in workflowSteps"
                :key="step"
                class="px-3 py-2 rounded-lg bg-warm-100 text-warm-700 text-sm font-semibold"
              >
                {{ step }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <article
            v-for="(group, index) in localizedFeatureGroups"
            :key="group.title"
            class="anim-scroll card-hover bg-white rounded-lg p-5 border border-warm-200 shadow-sm"
            :class="'delay-' + (index % 3 + 1)"
          >
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="w-11 h-11 rounded-lg flex items-center justify-center" :class="group.bgClass">
                <i :class="group.icon" class="text-lg" :style="{ color: group.color }"></i>
              </div>
              <span class="rounded-lg bg-warm-100 px-2.5 py-1 text-xs font-semibold text-warm-700">
                {{ group.displayItems.length }}
              </span>
            </div>
            <h3 class="font-display font-bold text-lg text-warm-900 mb-2" :style="{ color: group.color }">
              {{ group.displayTitle }}
            </h3>
            <p class="text-warm-500 text-sm leading-relaxed min-h-[4rem]">
              {{ group.displayDescription }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="item in group.displayItems"
                :key="item"
                class="rounded-lg bg-warm-50 px-2.5 py-1 text-xs font-semibold text-warm-700"
              >
                {{ item }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <div class="mt-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">
        <div class="space-y-5">
          <div class="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <div
              v-for="metric in localizedMetrics"
              :key="metric.label"
              class="anim-scroll bg-white rounded-lg border border-warm-200 p-5 shadow-sm"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="text-sm font-semibold text-warm-500">{{ metric.displayLabel }}</div>
                  <div class="font-display text-3xl font-bold text-warm-900 mt-1">{{ metric.value }}</div>
                  <div class="text-xs text-warm-500 mt-1">{{ metric.displayDetail }}</div>
                </div>
                <div class="w-11 h-11 rounded-lg flex items-center justify-center" :class="metric.bgClass">
                  <i :class="metric.icon" :style="{ color: metric.color }"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6">
          <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.analytics.chartTitle') }}</h3>
                <p class="text-sm text-warm-500 mt-1">{{ $t('features.analytics.chartDescription') }}</p>
              </div>
              <span class="px-3 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold">
                {{ $t('features.analytics.monthLabel') }}
              </span>
            </div>

            <div class="space-y-4">
              <div v-for="network in socialNetworkStats" :key="network.network">
                <div class="flex items-center justify-between gap-4 mb-2">
                  <div class="font-semibold text-warm-800 text-sm">{{ network.network }}</div>
                  <div class="text-xs text-warm-500">
                    {{ network.posts }} {{ $t('features.analytics.posts') }} · {{ formatNumber(network.interactions) }} {{ $t('features.analytics.interactions') }}
                  </div>
                </div>
                <div class="h-3 rounded-full bg-warm-100 overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :style="{ width: getPostBarWidth(network.posts), backgroundColor: network.color }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm overflow-x-auto">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h3 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.analytics.tableTitle') }}</h3>
              <span class="text-xs font-semibold text-warm-500">{{ $t('features.analytics.sortedBy') }}</span>
            </div>
            <table class="w-full min-w-[680px] text-left">
              <thead>
                <tr class="border-b border-warm-200 text-xs uppercase tracking-wide text-warm-500">
                  <th class="py-3 pr-4 font-semibold">{{ $t('features.analytics.content') }}</th>
                  <th class="py-3 pr-4 font-semibold">{{ $t('features.analytics.channel') }}</th>
                  <th class="py-3 pr-4 font-semibold">{{ $t('features.analytics.interactions') }}</th>
                  <th class="py-3 pr-4 font-semibold">{{ $t('features.analytics.engagement') }}</th>
                  <th class="py-3 font-semibold">{{ $t('features.analytics.status') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in localizedPerformanceRows"
                  :key="row.title"
                  class="border-b border-warm-100 last:border-0"
                >
                  <td class="py-4 pr-4">
                    <div class="font-semibold text-warm-900 text-sm">{{ row.displayTitle }}</div>
                    <div class="text-xs text-warm-500 mt-1">{{ row.displayCategory }}</div>
                  </td>
                  <td class="py-4 pr-4 text-sm text-warm-700">{{ row.channel }}</td>
                  <td class="py-4 pr-4 text-sm font-semibold text-warm-900">{{ row.interactions }}</td>
                  <td class="py-4 pr-4 text-sm font-semibold text-primary-700">{{ row.engagement }}</td>
                  <td class="py-4">
                    <span class="px-3 py-1 rounded-lg bg-warm-100 text-warm-700 text-xs font-semibold">
                      {{ row.displayStatus }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-14 grid lg:grid-cols-3 gap-6">
        <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.watch.sourcesTitle') }}</h3>
              <p class="text-sm text-warm-500 mt-1">{{ $t('features.watch.sourcesDescription') }}</p>
            </div>
            <div class="w-11 h-11 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <i class="fas fa-newspaper"></i>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="source in localizedNewsSources" :key="source.name">
              <div class="flex items-center justify-between gap-3 mb-2">
                <div>
                  <div class="text-sm font-semibold text-warm-900">{{ source.displayName }}</div>
                  <div class="text-xs text-warm-500">{{ source.displayTopic }}</div>
                </div>
                <span class="rounded-lg bg-warm-100 px-2.5 py-1 text-xs font-semibold text-warm-700">
                  {{ source.displayStatus }}
                </span>
              </div>
              <div class="h-2 rounded-full bg-warm-100 overflow-hidden">
                <div class="h-full rounded-full bg-sky-600" :style="{ width: `${source.relevance}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.watch.topicsTitle') }}</h3>
              <p class="text-sm text-warm-500 mt-1">{{ $t('features.watch.topicsDescription') }}</p>
            </div>
            <div class="w-11 h-11 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center">
              <i class="fas fa-lightbulb"></i>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="topic in localizedTopicSuggestions"
              :key="topic.title"
              class="rounded-lg border border-warm-200 bg-warm-50 p-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="text-sm font-semibold text-warm-900">{{ topic.displayTitle }}</div>
                  <div class="text-xs text-warm-500 mt-1">{{ topic.channel }}</div>
                </div>
                <span class="text-xs font-bold text-primary-700">{{ topic.trend }}</span>
              </div>
              <div class="mt-3 inline-flex rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-warm-700">
                {{ topic.displayPriority }}
              </div>
            </div>
          </div>
        </div>

        <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.watch.trendsTitle') }}</h3>
              <p class="text-sm text-warm-500 mt-1">{{ $t('features.watch.trendsDescription') }}</p>
            </div>
            <div class="w-11 h-11 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <i class="fas fa-binoculars"></i>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="trend in localizedCompetitiveTrends" :key="trend.segment">
              <div class="flex items-center justify-between gap-3 mb-2">
                <div>
                  <div class="text-sm font-semibold text-warm-900">{{ trend.displaySegment }}</div>
                  <div class="text-xs text-warm-500">{{ trend.displaySignal }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-semibold text-warm-500">{{ trend.network }}</div>
                  <div class="text-sm font-bold text-warm-900">{{ trend.score }}</div>
                </div>
              </div>
              <div class="h-2 rounded-full bg-warm-100 overflow-hidden">
                <div class="h-full rounded-full bg-rose-600" :style="{ width: `${trend.score}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-14">
        <div class="anim-scroll mb-8 max-w-3xl">
          <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">
            {{ $t('features.operations.eyebrow') }}
          </span>
            <h3 class="section-title font-display font-bold text-warm-900 mt-3">
            {{ $t('features.operations.title') }}
          </h3>
          <p class="text-warm-600 leading-relaxed mt-3">
            {{ $t('features.operations.description') }}
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h4 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.operations.calendarTitle') }}</h4>
              <div class="w-11 h-11 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <i class="fas fa-calendar-check"></i>
              </div>
            </div>

            <div class="space-y-3">
              <div
                v-for="item in localizedCalendarItems"
                :key="item.title"
                class="rounded-lg border border-warm-200 bg-warm-50 p-4 transition-colors hover:bg-white"
              >
                <div class="flex items-start gap-4">
                  <div class="flex w-20 shrink-0 flex-col items-center rounded-lg bg-white px-3 py-3 text-center shadow-sm">
                    <div class="text-xs font-semibold uppercase tracking-wide text-warm-500">{{ item.displayDate }}</div>
                    <div class="mt-2 h-2 w-full rounded-full" :style="{ backgroundColor: item.color }"></div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div class="text-sm font-semibold text-warm-900">{{ item.displayTitle }}</div>
                        <div class="text-xs text-warm-500 mt-1">{{ item.channel }}</div>
                      </div>
                      <span class="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-warm-700">
                        {{ item.displayStatus }}
                      </span>
                    </div>
                    <div class="mt-3">
                      <span class="inline-flex rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                        {{ item.displayPriority }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 border-t border-warm-200 pt-5">
              <div class="text-sm font-semibold text-warm-800 mb-3">{{ $t('features.operations.remindersTitle') }}</div>
              <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div
                  v-for="reminder in localizedReminders"
                  :key="reminder.label"
                  class="flex items-center justify-between gap-3 rounded-lg bg-warm-50 px-4 py-3"
                >
                  <div class="flex min-w-0 items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                      <i class="fas fa-bell text-sm"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="truncate text-sm font-semibold text-warm-900">{{ reminder.displayLabel }}</div>
                      <div class="text-xs text-warm-500">{{ reminder.displayDue }}</div>
                    </div>
                  </div>
                  <span class="shrink-0 text-xs font-bold text-warm-700">{{ reminder.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-6">
            <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
              <div class="flex items-center justify-between gap-4 mb-5">
                <h4 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.operations.campaignsTitle') }}</h4>
                <div class="w-11 h-11 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <i class="fas fa-bullseye"></i>
                </div>
              </div>

              <div class="space-y-5">
                <div v-for="campaign in localizedCampaigns" :key="campaign.name">
                  <div class="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div class="text-sm font-semibold text-warm-900">{{ campaign.displayName }}</div>
                      <div class="text-xs text-warm-500 mt-1">{{ campaign.displayObjective }}</div>
                    </div>
                    <span class="rounded-lg bg-warm-100 px-2.5 py-1 text-xs font-semibold text-warm-700">
                      {{ campaign.displayStatus }}
                    </span>
                  </div>
                  <div class="h-2 rounded-full bg-warm-100 overflow-hidden">
                    <div class="h-full rounded-full bg-purple-600" :style="{ width: `${campaign.progress}%` }"></div>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="channel in campaign.channels"
                      :key="channel"
                      class="rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700"
                    >
                      {{ channel }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
              <div class="flex items-center justify-between gap-4 mb-5">
                <h4 class="font-display text-2xl font-bold text-warm-900">{{ $t('features.operations.hashtagsTitle') }}</h4>
                <div class="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <i class="fas fa-hashtag"></i>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="group in hashtagSuggestions" :key="group.platform">
                  <div class="text-sm font-semibold text-warm-800 mb-2">{{ group.platform }}</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in group.tags"
                      :key="tag"
                      class="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="anim-scroll bg-white rounded-lg border border-warm-200 p-6 shadow-sm">
              <h4 class="font-display text-2xl font-bold text-warm-900 mb-4">{{ $t('features.operations.reportsTitle') }}</h4>
              <div class="space-y-3">
                <div v-for="report in localizedReports" :key="report.title" class="border-l-2 border-primary-500 pl-4">
                  <div class="text-xs font-semibold text-primary-700">{{ report.displayPeriod }}</div>
                  <div class="text-sm font-semibold text-warm-900 mt-1">{{ report.displayTitle }}</div>
                  <div class="text-xs text-warm-500 mt-1">{{ report.displaySummary }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  communicationCampaigns,
  contentPerformanceRows,
  contentTopicSuggestions,
  competitiveTrendRows,
  editorialCalendarItems,
  hashtagSuggestions,
  marketingFeatureGroups,
  marketingMetricSummaries,
  medicalNewsSources,
  periodicReports,
  publicationReminders,
  socialNetworkStats
} from '@/data/newFeatures'

const { locale, t } = useI18n()

const localizedFeatureGroups = computed(() =>
  marketingFeatureGroups.map((group) => ({
    ...group,
    displayTitle: locale.value === 'en' ? group.titleEn || group.title : group.title,
    displayDescription: locale.value === 'en' ? group.descriptionEn || group.description : group.description,
    displayItems: locale.value === 'en' ? group.itemsEn || group.items : group.items
  }))
)

const localizedMetrics = computed(() =>
  marketingMetricSummaries.map((metric) => ({
    ...metric,
    displayLabel: locale.value === 'en' ? metric.labelEn || metric.label : metric.label,
    displayDetail: locale.value === 'en' ? metric.detailEn || metric.detail : metric.detail
  }))
)

const localizedPerformanceRows = computed(() =>
  contentPerformanceRows.map((row) => ({
    ...row,
    displayTitle: locale.value === 'en' ? row.titleEn || row.title : row.title,
    displayCategory: locale.value === 'en' ? row.categoryEn || row.category : row.category,
    displayStatus: locale.value === 'en' ? row.statusEn || row.status : row.status
  }))
)

const localizedNewsSources = computed(() =>
  medicalNewsSources.map((source) => ({
    ...source,
    displayName: locale.value === 'en' ? source.nameEn || source.name : source.name,
    displayTopic: locale.value === 'en' ? source.topicEn || source.topic : source.topic,
    displayStatus: locale.value === 'en' ? source.statusEn || source.status : source.status
  }))
)

const localizedTopicSuggestions = computed(() =>
  contentTopicSuggestions.map((topic) => ({
    ...topic,
    displayTitle: locale.value === 'en' ? topic.titleEn || topic.title : topic.title,
    displayPriority: locale.value === 'en' ? topic.priorityEn || topic.priority : topic.priority
  }))
)

const localizedCompetitiveTrends = computed(() =>
  competitiveTrendRows.map((trend) => ({
    ...trend,
    displaySegment: locale.value === 'en' ? trend.segmentEn || trend.segment : trend.segment,
    displaySignal: locale.value === 'en' ? trend.signalEn || trend.signal : trend.signal
  }))
)

const localizedCalendarItems = computed(() =>
  editorialCalendarItems.map((item) => ({
    ...item,
    displayDate: locale.value === 'en' ? item.dateEn || item.date : item.date,
    displayTitle: locale.value === 'en' ? item.titleEn || item.title : item.title,
    displayStatus: locale.value === 'en' ? item.statusEn || item.status : item.status,
    displayPriority: locale.value === 'en' ? item.priorityEn || item.priority : item.priority
  }))
)

const localizedReminders = computed(() =>
  publicationReminders.map((reminder) => ({
    ...reminder,
    displayLabel: locale.value === 'en' ? reminder.labelEn || reminder.label : reminder.label,
    displayDue: locale.value === 'en' ? reminder.dueEn || reminder.due : reminder.due
  }))
)

const localizedCampaigns = computed(() =>
  communicationCampaigns.map((campaign) => ({
    ...campaign,
    displayName: locale.value === 'en' ? campaign.nameEn || campaign.name : campaign.name,
    displayObjective: locale.value === 'en' ? campaign.objectiveEn || campaign.objective : campaign.objective,
    displayStatus: locale.value === 'en' ? campaign.statusEn || campaign.status : campaign.status
  }))
)

const localizedReports = computed(() =>
  periodicReports.map((report) => ({
    ...report,
    displayPeriod: locale.value === 'en' ? report.periodEn || report.period : report.period,
    displayTitle: locale.value === 'en' ? report.titleEn || report.title : report.title,
    displaySummary: locale.value === 'en' ? report.summaryEn || report.summary : report.summary
  }))
)

const maxNetworkPosts = computed(() =>
  Math.max(...socialNetworkStats.map((network) => network.posts))
)

function getPostBarWidth(posts) {
  return `${Math.max((posts / maxNetworkPosts.value) * 100, 8)}%`
}

function formatNumber(value) {
  return value.toLocaleString(locale.value === 'en' ? 'en-US' : 'fr-FR')
}

const workflowSteps = computed(() => [
  t('features.steps.watch'),
  t('features.steps.draft'),
  t('features.steps.seo'),
  t('features.steps.schedule'),
  t('features.steps.distribute'),
  t('features.steps.publish'),
])
</script>
