import { NewCoach, ArrayOfCoachTree } from "@/interfaces";

export function addNewTreeChild(array: ArrayOfCoachTree, obj: NewCoach) {
  for (const el of array) {
    if (el.coach.fullName === obj.coachName) {
      el.child.push({
        coach: { fullName: obj.fullName, email: obj.email },
        child: [],
      });
    }
    if (el.child.length > 0) {
      addNewTreeChild(el.child, obj);
    }
  }
}
export function changeTreePosition(array: ArrayOfCoachTree, payload: any) {
  for (const [i, e] of array.entries()) {
    if (i === payload.index && e.coach.fullName === payload.fullName) {
      const element = array.splice(payload.index, 1)[0];
      array.splice(payload.goTo, 0, element);
    }
    if (e.child.length > 0) {
      changeTreePosition(e.child, payload);
    }
  }

  return array;
}
export function removeTreeChild(array: ArrayOfCoachTree, fullName: any) {
  for (const [i, e] of array.entries()) {
    if (e.coach.fullName === fullName) {
      if (e.child.length > 0) {
        e.child.forEach((_: any, index: any, childArr: any) => {
          if (index === 0) {
            for (
              let childInd = 1;
              childInd <= childArr.length - 1;
              childInd++
            ) {
              e.child[index].child.push(childArr[childInd]);
            }
          }
        });
        array.splice(i, 1, e.child[0]);
      } else {
        array.splice(i, 1);
      }
    }
    if (e.child.length > 0) {
      removeTreeChild(e.child, fullName);
    }
  }
  return array;
}
