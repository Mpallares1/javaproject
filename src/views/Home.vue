<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
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

    <main class="container mx-auto px-4 py-16">
      <section class="text-center mb-24">
        <h2 class="text-6xl font-extrabold mb-6 animate-fade-in-down">
          <span class="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
            Benvinguts
          </span>
          al meu projecte
        </h2>
        <p class="text-xl mb-10 max-w-2xl mx-auto text-gray-400 animate-fade-in-up">
          Una aplicació web utilitzant Javascript amb el framework Vue tipus SPA. S’ha de crear un nou projecte de vue
          per fer l’aplicació.
        </p>
        <button
          onclick="window.location.href='/calculadora'"
          class="bg-gradient-to-r from-yellow-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:from-yellow-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 animate-pulse"
        >
          Comença a Calcular
        </button>
      </section>

      <section id="features" class="grid md:grid-cols-3 gap-12 mb-24">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <component :is="feature.icon" class="w-12 h-12 mb-6 text-yellow-400" />
          <h3 class="text-2xl font-semibold mb-4">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </section>
    </main>

    <footer class="bg-gray-900 py-8 mt-24">
      <div class="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} VueApp. Tots els drets reservats.</p>
        <div
          class="flex flex-col md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0 md:space-x-8 text-gray-400"
        >
          <div>
            <p class="font-semibold text-lg">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Marc</span>
              Pallares Pino - 2nDAM 24/25
            </p>
          </div>
          <div class="flex space-x-4">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              class="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            >
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Calculator, MessageSquare, Users, Github, Twitter, Linkedin } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

const navItems = [
  { href: "/calculadora", text: "Calculadora" },
  { href: "/comentaris", text: "Comentaris" },
  { href: "/usuaris", text: "Usuaris" },
];

const features = [
  {
    icon: Calculator,
    title: "Calculadora Avançada",
    description: "Realitza càlculs complexos amb precisió decimal i múltiples operacions en una interfície elegant i fàcil d'usar.",
  },
  {
    icon: MessageSquare,
    title: "Comentaris en Temps Real",
    description: "Visualitza i interactua amb comentaris en temps real, aprofitant la potència de l'API de JSONPlaceholder.",
  },
  {
    icon: Users,
    title: "Gestió d'Usuaris Intuïtiva",
    description: "Administra perfils d'usuaris amb facilitat gràcies a la nostra integració amb l'API de DummyJSON i una interfície d'usuari refinada.",
  },
];

const socials = [
  { name: "GitHub", icon: Github, url: "https://github.com" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
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

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out 0.5s both;
}
</style>
