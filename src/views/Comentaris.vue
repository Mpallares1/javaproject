<template>

<header class="container mx-auto px-4 py-6">
      <nav class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Marc</h1>
        <ul class="flex space-x-6">
          <li v-for="item in navItems" :key="item.href">
            <a :href="item.href" class="text-sm uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300">{{ item.text }}</a>
          </li>
        </ul>
      </nav>
</header>

  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    <div class="container mx-auto px-4 py-6">
      <!-- Page Header -->
      <h1 class="text-6xl font-extrabold mb-6 animate-fade-in-down">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Comentaris</span> 
        </h1>
      <!-- Loading Indicator -->
      <div v-if="loading" class="loading text-center text-yellow-400 text-xl animate-pulse">
        Carregant comentaris...
      </div>
      <!-- Comments List -->
      <div v-else class="comments-list grid gap-6">
        <div v-for="comment in visibleComments" :key="comment.id" class="comment bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <h3 class="text-2xl font-semibold text-yellow-400 mb-2">{{ comment.name }}</h3>
          <p class="email text-gray-400 italic mb-4">{{ comment.email }}</p>
          <p class="body text-gray-300 leading-relaxed">{{ comment.body }}</p>
        </div>
      </div>
      <!-- Load More Button -->
      <div v-if="visibleComments.length < comments.length" class="text-center mt-8">
        <button @click="loadMore" class="bg-gradient-to-r from-yellow-500 to-purple-600 text-white font-bold py-2 px-6 rounded-full hover:from-yellow-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Carregar més
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const comments = ref([]);
const visibleComments = ref([]);  // To control the number of comments shown initially
const loading = ref(true);
const commentsPerPage = 10; // Number of comments to display per load

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    comments.value = await response.json();
    visibleComments.value = comments.value.slice(0, commentsPerPage); // Load the first 10 comments
  } catch (error) {
    console.error('Error fetching comments:', error);
  } finally {
    loading.value = false;
  }
});

const navItems = [
  { href: "/", text: "Inici" },
  { href: "/calculadora", text: "Calculadora" },
  { href: "/usuaris", text: "Usuaris" }
];
const loadMore = () => {
  // Load the next set of comments
  const nextSet = visibleComments.value.length + commentsPerPage;
  visibleComments.value = comments.value.slice(0, nextSet);
};
</script>

<style scoped>
/* Container styling */
.min-h-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

/* General comments styling */
.comments-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  font-size: 1.2rem;
}

/* Comments grid layout */
.comments-list {
  display: grid;
  gap: 2rem;
}

.comment {
  transition: transform 0.3s ease;
}

.comment:hover {
  transform: translateY(-5px);
}

h3 {
  color: #fff;
}





/* Button Styling */
button {
  font-size: 1rem;
}
</style>
