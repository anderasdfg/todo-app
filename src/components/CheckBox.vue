<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps({
    description: { type: String, default: '' },
    done: Boolean,
    isEditing: Boolean,
  });

  const isChecked = ref(props.done);

  watch(
    () => props.done,
    (newValue) => {
      isChecked.value = newValue;
    },
  );
</script>
<template>
  <div class="checkbox-wrapper-15">
    <input
      id="cbx-15"
      v-model="isChecked"
      class="inp-cbx"
      type="checkbox"
      style="display: none" />
    <label class="cbx" for="cbx-15">
      <span>
        <svg width="12px" height="9px" viewbox="0 0 12 9">
          <polyline points="1 5 4 8 11 1"></polyline>
        </svg>
      </span>
      <span v-if="!isEditing">{{ description }}</span>
    </label>
  </div>
</template>

<style scoped>
  .checkbox-wrapper-15 .cbx {
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    display: flex;
    gap: 2px;
    justify-content: flex-start;
  }
  .checkbox-wrapper-15 .cbx span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  .checkbox-wrapper-15 .cbx span:first-child {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transform: scale(1);
    vertical-align: middle;
    border: 1px solid #b9b8c3;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  .checkbox-wrapper-15 .cbx span:first-child svg {
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 6px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper-15 .cbx span:first-child:before {
    content: '';
    width: 100%;
    height: 100%;
    background: var(--danger);
    display: block;
    transform: scale(0);
    opacity: 1;
    border-radius: 50%;
    transition-delay: 0.2s;
  }
  .checkbox-wrapper-15 .cbx span:last-child {
    margin-left: 8px;
    overflow: hidden;
  }

  .checkbox-wrapper-15 .cbx span:last-child span {
    max-width: calc(100% - 32px);
  }
  .checkbox-wrapper-15 .cbx span:last-child:after {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    height: 1px;
    width: 100%;
    background: #b9b8c3;
    transform-origin: 0 0;
    transform: scaleX(0);
  }
  .checkbox-wrapper-15 .cbx:hover span:first-child {
    border-color: var(--glow);
  }

  .checkbox-wrapper-15 .inp-cbx:checked + .cbx span:first-child {
    border-color: var(--glow);
    background: var(--glow);
    animation: check-15 0.6s ease;
  }
  .checkbox-wrapper-15 .inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }
  .checkbox-wrapper-15 .inp-cbx:checked + .cbx span:first-child:before {
    transform: scale(2.2);
    opacity: 0;
    transition: all 0.6s ease;
  }
  .checkbox-wrapper-15 .inp-cbx:checked + .cbx span:last-child {
    color: #b9b8c3;
    transition: all 0.3s ease;
  }
  .checkbox-wrapper-15 .inp-cbx:checked + .cbx span:last-child:after {
    transform: scaleX(1);
    transition: all 0.3s ease;
  }

  @keyframes check-15 {
    50% {
      transform: scale(1.2);
    }
  }
</style>
