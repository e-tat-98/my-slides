<template>
  <div class="absolute top-7 right-7 w-15">
    <img src="/icon.png">
  </div>

  <div class="slidev-layout split">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>
