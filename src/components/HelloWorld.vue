<script setup>
  import axios from "axios"
  import { ref } from 'vue';

  const apiUrl = ref('http://127.0.0.1:8000/api/v1/download_csv');

  const sendRequest = async () => {
   await axios.get(apiUrl.value, {
        responseType: 'blob' 
      }).then(response => {
        const blob = new Blob([response.data], {type: 'application/csv'})
        const link = document.createElement('a')

        link.href = URL.createObjectURL(blob)

        const contentDisposition = response.headers['content-disposition'];
        
        const filenameRegex = /filename="([^"]+)"/;

        const match = contentDisposition.match(filenameRegex);
        const filename = match ? match[1] : null;

        link.download = filename
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error);
  };
  
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="sendRequest()">Download CSV</button>
     
    </div>

    <p class="read-the-docs">Click button to download csv file.</p>
  </div>
  
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
