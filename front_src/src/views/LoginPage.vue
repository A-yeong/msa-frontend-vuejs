<template>
    <div class="login-wrapper">
      <h2>로그인</h2>
      <form id="login-form" @submit.prevent="login">
        <input v-model="userId" type="text" name="userId" placeholder="아이디">
        <input v-model="pw" type="password" name="userPassword" placeholder="비밀번호">
        <input type="submit" value="로그인">
      </form>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue";
import "../assets/css/LoginPage.css";
import "../assets/ts/LoginPage.ts";
import userLogin from "@/assets/ts/LoginPage";
  
export default defineComponent({
  name: "LoginPage",
  setup() {
    const {userId, pw, login} = userLogin();
    return{userId, pw, login}
  }
});
</script>
  