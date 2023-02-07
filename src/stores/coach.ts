import { defineStore } from "pinia";
import {
  addNewTreeChild,
  changeTreePosition,
  removeTreeChild,
} from "@/composables/useTreeNode";

export const useCoachStore = defineStore({
  id: "store",
  state: () => ({
    coachList: ["Penelope Randi"],
    coachNodeList: [
      {
        coach: {
          fullName: "Penelope Randi",
          email: "penelope.randi@example.com",
        },
        child: [],
      },
    ],
  }),
  actions: {
    createCoach(payload: any) {
      this.coachList.push(payload.fullName);
      localStorage.setItem("coachList", JSON.stringify(this.coachList));
      addNewTreeChild(this.coachNodeList, payload);
      localStorage.setItem("coachNodeList", JSON.stringify(this.coachNodeList));
    },
    deleteCoach(fullName: string) {
      this.coachList = this.coachList.filter((x) => x != fullName);
      localStorage.setItem("coachList", JSON.stringify(this.coachList));
      removeTreeChild(this.coachNodeList, fullName);
      localStorage.setItem("coachNodeList", JSON.stringify(this.coachNodeList));
    },
    changeCoachPosition(payload: any) {
      changeTreePosition(this.coachNodeList, payload);
      localStorage.setItem("coachNodeList", JSON.stringify(this.coachNodeList));
    },
  },
});
