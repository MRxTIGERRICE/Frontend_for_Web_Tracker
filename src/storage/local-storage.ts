import { IStorage } from './storage-interface';
import {
  StorageDeserializeParam,
  StorageDeserializeType,
  StorageParams,
  createDeserializeParambject,
} from './storage-params';
import { Tab } from '../entity/tab';
import Browser from 'webextension-polyfill';
import { isEmpty } from '../utils/common';
import { TimeInterval } from '../entity/time-interval';

export class LocalStorage implements IStorage {
  async getDeserializeList(param: StorageDeserializeParam): Promise<StorageDeserializeType[]> {
    return new Promise(async resolve => {
      const obj = await Browser.storage.local.get(param);
      const list = obj[param];
      if (list != undefined) {
        let tempList: StorageDeserializeType[] = [];
        for (let i = 0; i < list.length; i++) {
          const obj = createDeserializeParambject(param);
          // console.log(list[i])
          tempList.push(obj.deserialize(list[i]));
        }
        return resolve(tempList);
      } else resolve([]);
    });
  }

  async saveTabs(value: Tab[]): Promise<void> {
    // console.log({ [StorageDeserializeParam.TABS]: value })
    const userEmail = await Browser.storage.local.get('UserEmail')
    // console.log(userEmail); // Replace this with the actual user's email or fetch it from wherever it's stored
    // const data = {
    //     tabs: value,
    //     email: userEmail
    // };
    // fetch('http://localhost:3000/update_tabs',
    fetch('https://activity-tracker-elitmus-v1.onrender.com/update_tabs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({[StorageDeserializeParam.TABS]: value,Email:userEmail.UserEmail})}) .then(response => {
    if (response.ok) {
        console.log('Tabs data updated successfully');
    } else {
        console.error('Failed to update tabs data');
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
    return await Browser.storage.local.set({ [StorageDeserializeParam.TABS]: value });
  }

  async saveIntervalList(value: TimeInterval[]): Promise<void> {
    return await Browser.storage.local.set({ [StorageDeserializeParam.TIMEINTERVAL_LIST]: value });
  }

  async saveValue(name: StorageParams, value: any): Promise<void> {
    return await Browser.storage.local.set({
      [name]: value,
    });
  }

  async getValue(name: StorageParams, defaultValue?: any): Promise<any> {
    let value = await Browser.storage.local.get(name);
    if (isEmpty(value) && defaultValue != undefined) {
      await this.saveValue(name, defaultValue);
      return defaultValue;
    }
    return value[name];
  }
}
