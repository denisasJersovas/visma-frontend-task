export interface CoachTreeNode {
  coach: Coach;
  child: any;
}
export type ArrayOfCoachTree = CoachTreeNode[];

export interface Coach {
  fullName: string;
  email: string;
}
export interface NewCoach {
  fullName: string;
  email: string;
  coachName: string;
}
