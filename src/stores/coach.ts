import { defineStore } from "pinia";
import {
  addNewTreeChild,
  changeTreePosition,
  removeTreeChild,
} from "@/composables/useTreeNode";
import toast from "@/composables/useToast";

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
      if (this.coachList.length < 2000) {
        this.coachList.push(payload.fullName);
        localStorage.setItem("coachList", JSON.stringify(this.coachList));
        addNewTreeChild(this.coachNodeList, payload);
        localStorage.setItem(
          "coachNodeList",
          JSON.stringify(this.coachNodeList)
        );
        return true;
      } else {
        toast.error("Max coach number is 2000");
      }
    },
    deleteCoach(fullName: string) {
      if (this.coachList.length > 1) {
        this.coachList = this.coachList.filter((x) => x != fullName);
        localStorage.setItem("coachList", JSON.stringify(this.coachList));
        removeTreeChild(this.coachNodeList, fullName);
        localStorage.setItem(
          "coachNodeList",
          JSON.stringify(this.coachNodeList)
        );
        toast.success("Succesfully deleted");
      } else {
        toast.error("Parent elemenet should be provided");
      }
    },
    changeCoachPosition(payload: any) {
      changeTreePosition(this.coachNodeList, payload);
      localStorage.setItem("coachNodeList", JSON.stringify(this.coachNodeList));
      toast.success("Position changed");
    },
  },
});
