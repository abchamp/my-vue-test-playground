<script>
import { computed, onMounted, onUnmounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      dateNow: null,
      intervalid: undefined,
    });

    const author = reactive({
      name: "John Doe",
      books: [
        "Vue 2 - Advanced Guide",
        "Vue 3 - Basic Guide",
        "Vue 4 - The Mystery",
      ],
    });

    let intervalid;

    onMounted(() => {
      state.intervalId = setInterval(() => {
        state.dateNow = new Date();
      }, 1000);
    });

    onUnmounted(() => {
      console.log("Clear time interval");
      clearInterval(state.intervalId);
    });

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
      publishedBookAuthorName,
      publishedBooksMessage,
      publishDate,
      // now,
    };
  },
};
</script>

<template>
  <div>
    <!-- <button @click="increment">
      {{ state.count }}
    </button>
    <p>Has published books:</p> -->
    <p>{{ publishDate }}</p>
    <button @click="changeName">{{ publishedBookAuthorName }}</button>
    <span> {{ publishedBooksMessage }}</span>
    <!-- <span> {{ state.books.length > 0 ? "Yes" : "No" }}</span> -->
  </div>
</template>
