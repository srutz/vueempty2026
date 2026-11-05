<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    show: boolean
    title?: string
    description?: string
    /** close when clicking the backdrop */
    closeOnOverlay?: boolean
    /** close when pressing Escape */
    closeOnEscape?: boolean
    /** show the X button in the top right corner */
    showClose?: boolean
  }>(),
  { closeOnOverlay: true, closeOnEscape: true, showClose: true },
)

const emit = defineEmits<{
  showChanged: [show: boolean]
}>()

const titleId = useId()
const descId = useId()
const contentRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

function close() {
  emit('showChanged', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEscape) {
    e.stopPropagation()
    close()
  }
}

watch(
  () => props.show,
  async (show) => {
    if (show) {
      previouslyFocused = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
      await nextTick()
      contentRef.value?.focus()
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
      previouslyFocused?.focus?.()
      previouslyFocused = null
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        @mousedown.self="closeOnOverlay && close()">
        <div ref="contentRef" role="dialog" aria-modal="true"
          :aria-labelledby="title || $slots.title ? titleId : undefined"
          :aria-describedby="description || $slots.description ? descId : undefined" tabindex="-1"
          class="relative grid w-fit min-w-64 max-w-full max-h-full overflow-y-auto gap-4 rounded-lg border border-gray-200 bg-mist-100 p-6 text-gray-950 shadow-lg outline-none sm:rounded-lg">
          <div v-if="title || description || $slots.title || $slots.description"
            class="flex flex-col gap-1.5 text-center sm:text-left">
            <h2 :id="titleId" class="text-lg leading-none font-semibold tracking-tight">
              <slot name="title">{{ title }}</slot>
            </h2>
            <p :id="descId" class="text-sm text-gray-500">
              <slot name="description">{{ description }}</slot>
            </p>
          </div>

          <slot />

          <div v-if="$slots.footer" class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <slot name="footer" :close="close" />
          </div>

          <button v-if="showClose" type="button" aria-label="Close"
            class="absolute top-4 right-4 !bg-transparent !p-1 !text-gray-950 opacity-70 transition-opacity hover:!bg-transparent hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 !rounded-sm"
            @click="close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
