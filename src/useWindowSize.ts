import { onMounted, onUnmounted, ref, toRefs } from 'vue';

export function useWindowSize() {
  const size = ref({
    width: window.innerWidth, height: window.innerHeight })

  onMounted(() => {
    const l = () => { // wird aufgerufen bei größen-änderung
      size.value.width = window.innerWidth
      size.value.height = window.innerHeight
    }
    window.addEventListener("resize", l)
    onUnmounted(() => window.removeEventListener("resize", l))
  })
  return toRefs(size.value)
}
