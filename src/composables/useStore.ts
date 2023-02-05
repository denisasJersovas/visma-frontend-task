import { reactive } from "vue";
const state = reactive({
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
});
export default {
  state,
};
