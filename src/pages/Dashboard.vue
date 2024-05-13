<template>
  <notifications position="bottom right" />
  <div class="settings-tabs">
    <div class="header-block">
      <img class="d-inline-block logo" height="30" src="../assets/icons/48x48.png" />
      <p class="d-inline-block title">Web Activity Time Tracker</p>
    </div>
    <div class="settings-tab mt-20">
      <input
        type="radio"
        id="timeIntervalChart-tab"
        name="settings-group"
        :checked="selectedTab == SettingsTab.Dashboard || selectedTab == SettingsTab.WebsiteStats"
        v-on:change="selectTab(SettingsTab.Dashboard)"
      />
      <label name="tabName" for="timeIntervalChart-tab"
        ><img src="../assets/icons/dashboard.png" height="30" />{{
          t('dashboard.message')
        }}</label
      >

      <div class="settings-content">
        <DashboadContainer
          v-if="selectedTab == SettingsTab.Dashboard || selectedTab == SettingsTab.WebsiteStats"
          :type="selectedTab"
          :domain="selectedWebsite"
        />
      </div>
    </div>

    <div class="settings-tab">
      <input
        type="radio"
        id="white-list-tab"
        name="settings-group"
        :checked="selectedTab == SettingsTab.Blacklist"
        v-on:change="selectTab(SettingsTab.Blacklist)"
      />
      <label name="tabName" for="white-list-tab">
        <img src="../assets/icons/blocklist.png" height="30" />
        Blacklist
      </label>

      <div class="settings-content">
        <div class="main">
          <Blacklist v-if="selectedTab == SettingsTab.Blacklist" />
        </div>
      </div>
    </div>

    <div class="settings-tab">
      <input
        type="radio"
        id="limits-tab"
        name="settings-group"
        :checked="selectedTab == SettingsTab.Limits"
        v-on:change="selectTab(SettingsTab.Limits)"
      />
      <label name="tabName" for="limits-tab"
        ><img src="../assets/icons/limit.png" height="30" />{{
          t('limitsSettings.message')
        }}</label
      >

      <div class="settings-content">
        <div class="main">
          <Limits v-if="selectedTab == SettingsTab.Limits" />
        </div>
      </div>
    </div>
    <div class="settings-tab">
      <input
        type="radio"
        id="about-tab"
        name="settings-group"
        :checked="selectedTab == SettingsTab.About"
        v-on:change="selectTab(SettingsTab.About)"
      />
      <label class="about" name="tabName" for="about-tab"
        ><img src="../assets/icons/user.png" height="30" /> UserSettings/exports </label>
      <div class="settings-content">
        <div class="main">
          <About v-if="selectedTab == SettingsTab.About" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Blacklist from '../components/Blacklist.vue';
import Limits from '../components/Limits.vue';
import About from '../components/About.vue';
import { SettingsTab } from '../utils/enums';
import DashboadContainer from '../components/DashboadContainer.vue';
import { useExtensionPage } from '../compositions/useExtensionPage';
import { getEnumValueTab } from '../utils/extension-tabs';
import { applyDarkMode } from '../utils/dark-mode';
import { injectStorage } from '../storage/inject-storage';
import { StorageParams, DARK_MODE_DEFAULT } from '../storage/storage-params';

const { t } = useI18n();
const extensionPage = useExtensionPage();
const settingsStorage = injectStorage();

const selectedTab = ref<SettingsTab>();
const currentUrl = ref(new URL(location.href));
const selectedWebsite = ref<string>();
const darkMode = ref<boolean>();

watch(currentUrl, () => {
  getCurrentTab();
});

onMounted(async () => {
  darkMode.value = await settingsStorage.getValue(StorageParams.DARK_MODE, DARK_MODE_DEFAULT);
  applyDarkMode(darkMode.value!);
  getCurrentTab();
});

function getCurrentTab() {
  const tabName = currentUrl.value.searchParams.get('tab');
  if (tabName != null && tabName != '') {
    selectedTab.value = getEnumValueTab(tabName);
    const domain = currentUrl.value.searchParams.get('website');
    if (selectedTab.value == SettingsTab.WebsiteStats) {
      if (domain != null && domain != '') selectedWebsite.value = domain;
      else selectedTab.value = SettingsTab.Dashboard;
    } else if (domain != null && domain != '') {
      window.history.replaceState(
        location.href,
        document.title,
        location.href.replace(`&website=${domain}`, ''),
      );
    }
  }
}

function selectTab(value: SettingsTab) {
  selectedTab.value = value;
  extensionPage.updateTab(value);
  currentUrl.value = new URL(location.href);
}
</script>

<style scoped>
.main {
  width: 80%;
  margin: auto;
}
.header-block {
  background-color: unset !important;
}
.header-block .title {
  vertical-align: top;
  margin-top: 15px;
  font-weight: 600;
  font-size: 15px;
}

.header-block .logo {
  margin: 10px 10px 10px 15px;
}
.tab-separator {
  margin-left: 10px;
  font-size: 13px;
  font-weight: 600;
}
.about {
  position: fixed;
  bottom: 1px;
}
</style>
