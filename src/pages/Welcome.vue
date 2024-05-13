<template>
  <div class="main">
    <template v-if="step == WelcomeStep.InitialView">
      <div class="initial-block">
        <p class="header">Welcome to Web-Activity-Tracker-V1</p>
        <img class="img" src="../assets/icons/128x128.png" height="250" />
        <p class="description">This is a test extension created as an assignment for e-Litmus by Vikas Sai.G</p>
        <div class="next-btn">
          <button @click="nextStep()">{{ t('next.message') }}</button>
        </div>
      </div>
    </template>
    <template v-if="step == WelcomeStep.Tutorial">
      <div class="steps">
        <form @submit.prevent="registerUser" id="installForm">
          <label for="email">Enter your email:</label>
          <input type="email" id="email" name="email" v-model="email" required>
          <br><br>
          <button type="submit">Use this Email</button>
        </form>
      </div>
      <div class="steps">
        <img class="img" src="../assets/icons/128x128.png" height="250" />
        <div class="btn-block">
          <button class="close" @click="close()">{{ t('close.message') }}</button>
          <button @click="openDashboard()">{{ t('useExtension.message') }}</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Browser from 'webextension-polyfill';
const { t } = useI18n();

enum WelcomeStep {
  InitialView,
  Tutorial,
}

const step = ref<WelcomeStep>();

onMounted(() => {
  step.value = WelcomeStep.InitialView;
});

function nextStep() {
  step.value = WelcomeStep.Tutorial;
}

async function close() {
  const currentTab = await Browser.tabs.getCurrent();
  await Browser.tabs.remove(currentTab.id!);
}

async function openDashboard() {
  const url = Browser.runtime.getURL('src/dashboard.html?tab=dashboard');
  const tab = await Browser.tabs.query({ currentWindow: true, active: true });
  Browser.tabs.update(tab[0].id, { url: url });
}

async function registerUser() {
  try {
    const apiUrl = 'https://activity-tracker-elitmus-v1.onrender.com/users'; // Update with your backend URL
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email:email.value } }),
    });

    if (response.ok) {
      alert('User registered successfully!');
      Browser.storage.local.set({UserEmail:email.value})
      // You may want to do something here after successful registration
    } else {
      alert('Failed to register user');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    alert('Failed to register user. Please try again.');
  }
}

</script>

<style scoped>
.main {
  margin: auto;
  text-align: center;
  margin: 0 20%;
  height: 100%;
}
.initial-block {
  margin-top: 20%;
}

.header {
  font-size: 26px;
  font-weight: 700;
}
.img {
  margin: 20px 0;
}
.description {
  font-size: 18px;
}
.description span {
  font-weight: 600;
}
.description img {
  margin: 0 10px;
}
.steps {
  margin-top: 50px;
}
.steps .step {
  text-align: left;
  font-size: 24px;
  font-weight: 700;
}
.steps .step {
  margin: 30px;
}

.steps .description {
  margin: 20px;
}
.next-btn {
  margin-top: 40px;
}

button.close {
  background: #c5c5c5;
  color: rgb(0, 0, 0);
}

button {
  display: inline-block;
  background: #428bff;
  color: #fff;
  border-radius: 5px;
  height: 36px;
  line-height: 35px;
  padding: 0 10px;
  border: 0;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  width: 200px;
  margin: 0 10px;
}
.btn-block {
  margin: 25px;
}
</style>
