import { addDoc, documentId, orderBy, getDocs, query, where } from "firebase/firestore";
import {
  finalTaskList,
  normalTaskList,
  sabotageTaskList,
} from "../constants/tasks";
import { Team } from "./models";
import { teams } from "../firebaseConfig";

export async function registerTeam(
  name: string,
  password: string,
  round_id: number
) {
  const team = (await getDocs(query(teams, where("name", "==", name)))).docs;
  if (team.length > 0)
    throw new Error("Team name already exists! Please try another name.");

  const payload: Team = {
    name,
    password,
    round_id,
    total_score: 0,
    is_sabotaged: false,
    sabotaged_task_id: 0,
    is_final: false,

    sabotage_tasks: [...sabotageTaskList],
    normal_tasks: [...normalTaskList],
    final_tasks: [...finalTaskList],
    recently_solved_timestamp: new Date().getUTCSeconds(),
  };

  try {
    const createdTeam = await addDoc(teams, payload);
    return createdTeam.id;
  } catch (e) {
    throw new Error("Some Error Occurred! Please Contact Admin!");
  }
}

export const loginTeam = async (name: string, password: string) => {
  const team = (await getDocs(query(teams, where("name", "==", name)))).docs;
  if (team.length === 0) throw new Error("Team not found!");

  const teamData = team[0].data();
  if (teamData.password !== password) throw new Error("Invalid Password!");

  return {
    id: team[0].id,
    ...teamData,
  };
};

const getLocalLeaderBoard = async (roundId: string) => {
  const q = query(
    teams,
    where("round_id", "==", roundId),
    orderBy("total_score", "desc")
  );
  const data = (await getDocs(q)).docs;
  return data;
};

const getGlobalLeaderBoard = async (roundId: string) => {
  const q = query(teams, orderBy("total_score", "desc"));
  const data = (await getDocs(q)).docs;
  return data;
};

export async function getTeamById(id: string) {
  try {
    const q = query(teams, where(documentId(), "==", id));

    const teamInfo = (await getDocs(q)).docs;

    if (teamInfo.length === 0) {
      return null;
    }

    return teamInfo[0].data() as unknown as Team;
  } catch (e) {
    return null;
  }
}
