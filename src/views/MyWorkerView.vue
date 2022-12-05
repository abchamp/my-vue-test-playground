<template>
  <div>
    <!-- <button @click="increment">
      {{ state.count }}
    </button>
    <p>Has published books:</p> -->
    <p>{{ publishDate }}</p>
    <button @click="changeName">{{ publishedBookAuthorName }}</button>
    <span> {{ publishedBooksMessage }}</span>
    <button @click="doSearch">do search</button>
    <button @click="workerCancel">cancel search</button>
    <!-- <span> {{ state.books.length > 0 ? "Yes" : "No" }}</span> -->
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  onRenderTriggered,
} from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      dateNow: null,
      intervalid: undefined,
      worker: null,
    });

    const author = reactive({
      name: "John Doe",
      books: [
        "Vue 2 - Advanced Guide",
        "Vue 3 - Basic Guide",
        "Vue 4 - The Mystery",
      ],
    });

    onMounted(() => {
      state.intervalId = setInterval(() => {
        state.dateNow = new Date();
      }, 1000);
    });

    onUnmounted(() => {
      console.log("Clear time interval");
      clearInterval(state.intervalId);
    });

    // onRenderTriggered((e) => {
    //   // console.log(e);
    // });

    // method
    function increment() {
      state.count++;
    }

    function changeName() {
      author.name = "AbChamp";
    }

    //
    const publishedBooksMessage = computed(() => {
      return author.books.length > 0 ? "Yes" : "No";
    });

    const publishedBookAuthorName = computed(() => {
      return author.name;
    });

    const publishDate = computed(() => {
      return state.dateNow;
    });

    function receivedWorkerMessage(event) {
      console.log();
      console.log(event);
    }

    function workerError(error) {
      console.log(error);
    }

    function workerCancel() {
      if (state.worker !== null) {
        state.worker.terminate();
      }
      console.log("worker stop by user");
    }

    function doSearch() {
      // https://vitejs.dev/guide/features.html#web-workers
      let fromNumber = 1;
      let toNumber = 2000000;
      state.worker = new Worker(
        new URL("@/workers/PrimeWorker.js", import.meta.url)
      );

      state.worker.onmessage = receivedWorkerMessage;
      state.worker.onerror = workerError;

      state.worker.postMessage({
        from: fromNumber,
        to: toNumber,
      });

      // let primes = findPrimes(fromNumber, toNumber);
      // console.log(primes);
    }

    // const fullName = computed({
    //   get() { return "Null" },
    //   set(newValue) {

    //   }
    // })

    // const now = computed(() => Date.now());

    return {
      // author,
      state,
      // increment,
      changeName,
      doSearch,
      workerCancel,
      publishedBookAuthorName,
      publishedBooksMessage,
      publishDate,
      // now,
    };
  },
};
</script>
