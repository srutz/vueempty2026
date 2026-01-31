
import { ref, type SetupContext } from 'vue';

export function FHeader(props: { title: string }, { slots, attrs }: SetupContext) {
  const count = ref(1);
  return (
    <h1 {...attrs} title={props.title} class="text-3xl font-bold underline" onClick={() => {
      count.value += 1;
      console.log(`Header clicked ${count.value} times`);
    }}>
      {slots.default ? slots.default() : 'Default Header'} {count.value}
    </h1>
  );
}

