<template>
  <section class="header">
    <div class="hello-box">
      <h1>¡Hola 👋🏽!</h1>
      <span>Estas son las cosas por hacer...</span>
    </div>
  </section>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: flex-start;
    padding: 1rem;
    margin-left: -1rem;
  }

  .hello-box {
    background-color: var(--primary);
    padding: 1rem 2rem;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 80%;
  }

  span {
    color: var(--dark);
  }

  @media only screen and (min-width: 768px) {
    .header {
      justify-content: center;
    }

    .hello-box {
      border-radius: 10px;
      width: 90%;
      margin-left: 1rem;
    }
  }
</style>
