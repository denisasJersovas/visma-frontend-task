import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { ref } from "vue";

import { useCoachStore } from "../coach";

describe("The coach store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("create new coach", async () => {
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
  it("delete new created coach", async () => {
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
    await store.deleteCoach(fullName.value);
    expect(store.coachNodeList[0].child).toStrictEqual([]);
  });
  it("tree node ordering", async () => {
    const fullName = ref("Artur Pojarkov");
    const email = ref("artur.pojarkov@example.com");
    const coachName = ref("Penelope Randi");
    const store = useCoachStore();
    await store.createCoach({
      fullName: fullName.value,
      email: email.value,
      coachName: coachName.value,
    });
    const fullName2 = ref("Testikus Test");
    const email2 = ref("testikus.test@example.com");
    const coachName2 = ref("Penelope Randi");
    await store.createCoach({
      fullName: fullName2.value,
      email: email2.value,
      coachName: coachName2.value,
    });
    expect(store.coachNodeList[0].child[1].coach).toStrictEqual({
      fullName: fullName2.value,
      email: email2.value,
    });
    await store.changeCoachPosition({
      fullName: fullName.value,
      index: 0,
      goTo: 1,
    });
    expect(store.coachNodeList[0].child[0].coach).toStrictEqual({
      fullName: fullName2.value,
      email: email2.value,
    });
    expect(store.coachNodeList[0].child[1].coach).toStrictEqual({
      fullName: fullName.value,
      email: email.value,
    });
  });
});
