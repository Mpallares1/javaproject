<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col">
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

    <!-- Calculator Section -->
    <div class="flex-grow flex justify-center items-center p-4">
      <div class="calculator">
        <div class="display">{{ currentValue || '0' }}</div>
        <div class="buttons">
          <button @click="clear" class="btn function">C</button>
          <button @click="changeSign" class="btn function">+/-</button>
          <button @click="percent" class="btn function">%</button>
          <button @click="divide" class="btn operator">/</button>
          <button @click="append('7')" class="btn">7</button>
          <button @click="append('8')" class="btn">8</button>
          <button @click="append('9')" class="btn">9</button>
          <button @click="multiply" class="btn operator">*</button>
          <button @click="append('4')" class="btn">4</button>
          <button @click="append('5')" class="btn">5</button>
          <button @click="append('6')" class="btn">6</button>
          <button @click="subtract" class="btn operator">-</button>
          <button @click="append('1')" class="btn">1</button>
          <button @click="append('2')" class="btn">2</button>
          <button @click="append('3')" class="btn">3</button>
          <button @click="add" class="btn operator">+</button>
          <button @click="append('0')" class="btn zero">0</button>
          <button @click="dot" class="btn">.</button>
          <button @click="equal" class="btn operator equal">=</button>
        </div>
      </div>
    </div>

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
import { ref } from 'vue';

const navItems = [
  { href: "/", text: "Inici" },
  { href: "/comentaris", text: "Comentaris" },
  { href: "/usuaris", text: "Usuaris" }
];

const currentValue = ref('');
const previousValue = ref(null);
const operator = ref(null);
const operatorClicked = ref(false);

const clear = () => {
  currentValue.value = '';
  previousValue.value = null;
  operator.value = null;
  operatorClicked.value = false;
};

const changeSign = () => {
  currentValue.value = currentValue.value.charAt(0) === '-' ?
      currentValue.value.slice(1) : `-${currentValue.value}`;
};

const percent = () => {
  currentValue.value = `${parseFloat(currentValue.value) / 100}`;
};

const append = (number) => {
  if (operatorClicked.value) {
    currentValue.value = '';
    operatorClicked.value = false;
  }
  currentValue.value = `${currentValue.value}${number}`;
};

const dot = () => {
  if (currentValue.value.indexOf('.') === -1) {
    append('.');
  }
};

const setPreviousValue = () => {
  previousValue.value = currentValue.value;
  operatorClicked.value = true;
};

const divide = () => {
  setPreviousValue();
  operator.value = (a, b) => a / b;
};

const multiply = () => {
  setPreviousValue();
  operator.value = (a, b) => a * b;
};

const subtract = () => {
  setPreviousValue();
  operator.value = (a, b) => a - b;
};

const add = () => {
  setPreviousValue();
  operator.value = (a, b) => a + b;
};

const equal = () => {
  if (operator.value && previousValue.value) {
    currentValue.value = `${operator.value(
        parseFloat(previousValue.value),
        parseFloat(currentValue.value)
    )}`;
    previousValue.value = null;
    operator.value = null;
  }
};
</script>

<style scoped>
/* General layout for calculator background */
.min-h-screen {
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  color: #e0e0e0;
}

/* Calculator specific styles */
.calculator {
  background-color: #333;
  border-radius: 12px; /* A bit more rounded than before */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  width: 400px;
  max-width: 90%;
}

.display {
  background-color: #444;
  color: #fff;
  font-size: 3rem;
  padding: 20px;
  text-align: right;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  border: none;
  background-color: #555;
  font-size: 1.8rem;
  padding: 20px;
  transition: all 0.2s;
  color: #fff;
  border-radius: 12px; /* Redondeo ligeramente más pronunciado */
}

.btn:hover {
  background-color: #666;
}

.operator {
  background-color: #9b4dca; /* Morado para operadores */
}

.operator:hover {
  background-color: #7a34a3;
}

.function {
  background-color: #facc15; /* Amarillo para funciones */
}

.zero {
  grid-column: span 2;
}

/* Efecto de pulsación para el botón igual */
.equal {
  position: relative;
  width: 86px;
  height: 77px;
  border-radius: 12px; /* Redondeo igual que otros botones */
  background-color: #fbbf24;
  overflow: hidden;
  animation: pulse 2s ease-in-out infinite, colorShift 3s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.equal::before, .equal::after {
  content: '';
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 60%;
  background-color: #d946ef;
  animation: pulseHeart 2s ease-in-out infinite;
}

.equal::before {
  left: 0px;
  top: 63px;
}

.equal::after {
  left: 63px;
  top: 30px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulseHeart {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes colorShift {
  0% {
    background-color: #fbbf24;
  }
  50% {
    background-color: #d946ef;
  }
  100% {
    background-color: #fbbf24;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .calculator {
    width: 350px;
  }

  .display {
    font-size: 2.5rem;
  }

  .btn {
    font-size: 1.6rem;
    padding: 18px;
  }
}

@media (max-width: 480px) {
  .calculator {
    width: 90%;
  }

  .display {
    font-size: 2rem;
  }

  .btn {
    font-size: 1.4rem;
    padding: 16px;
  }
}
</style>
