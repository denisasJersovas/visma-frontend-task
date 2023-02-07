import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { ref } from "vue";

import { useCoachStore } from "../coach";

describe("The coach store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("check store createCoach action", async () => {
    const fullName = ref("Artur Pojarkov");
    const email = ref("artur.pojarkov@example.com");
    const coachName = ref("Penelope Randi");
    const store = useCoachStore();
    await store.createCoach({
      fullName: fullName.value,
      email: email.value,
      coachName: coachName.value,
    });
    expect(store.coachNodeList[0].child[0].coach).toStrictEqual({
      fullName: fullName.value,
      email: email.value,
    });
  });
});
