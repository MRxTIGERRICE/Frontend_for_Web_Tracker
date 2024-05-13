import Browser from 'webextension-polyfill';
import { initTracker } from './tracker';
import { logger } from './utils/logger';
import { scheduleJobs } from './jobs/sheduler';
import { Settings } from './functions/settings';
import { StorageParams } from './storage/storage-params';
import { injectStorage } from './storage/inject-storage';
import { todayLocalDate } from './utils/date';
import { Messages } from './utils/messages';
import { injectTabsRepositorySingleton } from './repository/inject-tabs-repository';

logger.log('Start background script');

self.onerror = err => {
  console.error('Unhandled error:', err);
};

Browser.storage.onChanged.addListener(async (changes, namespace) => {
  for (var key in changes) {
    if (Object.values(StorageParams).includes(key as StorageParams))
      await Settings.getInstance().reloadSetting(key as StorageParams);
  }
});

Browser.runtime.onInstalled.addListener(async details => {
  if (details.reason == 'install') {
    logger.log('Extension installed:', details);
    const settingsStorage = injectStorage();
    await settingsStorage.saveValue(StorageParams.INSTALL_DATE, todayLocalDate());
    // await settingsStorage.saveValue(StorageParams.INSTALL_DATE, todayLocalDate());
    const initialPageUrl = Browser.runtime.getURL('src/welcome.html');
    await Browser.tabs.create({
      url: initialPageUrl,
      active: true,
    });
  }
  // if (details.reason == 'update') {
  //   const showChangelog = (await Settings.getInstance().getSetting(
  //     StorageParams.SHOW_CHANGELOG,
  //   )) as boolean;
  //   if (showChangelog)
  //     await Browser.tabs.create({
  //       url: 'https://webtracker.online/releasenotes.html',
  //       active: true,
  //     });
  // }
});

Browser.runtime.onStartup.addListener(() => {
  logger.log(`onStartup event`);
});

Browser.windows.onFocusChanged.addListener(() => {
  logger.log('onFocusChanged');
});
initTracker();

Browser.runtime.onMessage.addListener(async message => {
  if (message == Messages.ClearAllData) {
    const storage = injectStorage();
    const repo = await injectTabsRepositorySingleton();
    repo.removeAllTabs();
    await storage.saveTabs([]);
  }
  if (message.message == Messages.Restore) {
    const storage = injectStorage();
    await storage.saveTabs(message.data);
    const repo = await injectTabsRepositorySingleton();
    repo.initAsync();
  }
});
