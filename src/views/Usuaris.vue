<template>
  <!-- Navbar -->

  <header class="container mx-auto px-4 py-6">
      <nav class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
          Marc
        </h1>
        <ul class="flex space-x-6">
          <li v-for="item in navItems" :key="item.href">
            <router-link
             :to="item.href"
              class="text-sm uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300"
            >
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

  <!-- Main Content -->
  <div class="w-full users-container bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500 mb-8">
        Usuaris
      </h1>

      <!-- Loading Indicator -->
      <div v-if="loading" class="loading text-center text-yellow-400 text-xl animate-pulse">
        Carregant usuaris...
      </div>

      <!-- Users Grid -->
      <div v-else class="users-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="user in users"
          :key="user.id"
          class="user-card bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center"
        >
          <img :src="user.image" :alt="user.firstName" class="user-image mx-auto mb-4" />
          <h3 class="text-2xl font-semibold text-yellow-400 mb-2">{{ user.firstName }} {{ user.lastName }}</h3>
          <p class="user-email text-gray-400 italic mb-2">{{ user.email }}</p>
          <p class="user-details text-gray-300 mb-2">{{ user.age }} anys, {{ user.gender }}</p>
          <p class="user-company text-gray-400 text-sm">{{ user.company.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    users.value = response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
});

const navItems = [
  { href: "/", text: "Inici" },
  { href: "/calculadora", text: "Calculadora" },
  { href: "/comentaris", text: "Comentaris" }
];
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading {
  font-size: 1.2rem;
  color: #fbbf24; /* Amarillo personalizado */
}


.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.user-card {
  background-color: rgba(31, 41, 55, 0.9); /* Fondo oscuro translúcido */
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

h3 {
  color: #fbbf24; /* Amarillo para nombres */
  margin: 0 0 0.5rem;
}

.user-email {
  color: #9ca3af; /* Gris claro para el email */
  font-style: italic;
  margin-bottom: 0.5rem;
}

.user-details, .user-company {
  color: #9ca3af; /* Gris claro */
  font-size: 0.9rem;
}
</style>
