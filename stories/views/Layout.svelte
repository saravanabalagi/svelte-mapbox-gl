<style>
  .container {
    display: flex;
    height: 100%;
  }

  .m-4 {
    margin: 1rem;
  }

  .w-25 {
    width: 25%;
  }

  .w-75 {
    width: 75%;
  }
</style>

<div class="container">
  <div class="w-25 m-4">
    <slot name="left" />
  </div>
  <div class="w-75">
    <slot name="right" />
  </div>
</div>
