<template>
    <div class="person">
        <h1>姓名：{{ name }}</h1>
        <h1>年龄：{{ age }}</h1>
        <button @click="showTel">查看电话</button>
        <button @click="changename">修改名字</button>
        <button @click="agechange">年龄变化</button>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const name = ref('tom')
    const age = ref(20)
    const tel = ref('1234567890')

    function showTel() {
        alert(tel.value)
    }
    
    function changename() {
        name.value = 'Jerry'
    }
    
    function agechange() {
        age.value += 1
    }
</script>

<style scoped>
    .person {
        background-color: #66b2d6;
        box-shadow: 0 0 10px ;
        border-radius: 5px;
        padding:10px;
    }
    button{
        background-color: #f00;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        margin-right: 10px;
    }
    button:hover{
        background-color: #00f;
    }
</style>