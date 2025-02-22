import { doc, updateDoc, runTransaction, getDoc } from "firebase/firestore";
import { db, teams } from "../firebaseConfig";
import { Task } from "./models";
import { getTeamById } from "./teams";
import { sabotageTaskList } from "../constants/tasks";

function getRandomTask() {
  return sabotageTaskList[Math.floor(Math.random() * sabotageTaskList.length)];
}

async function sabotageTeam(teamId: string, currTeamId: string) {
  const teamRef = doc(teams, teamId);
  try {
    await runTransaction(db, async (transaction) => {
      const currentTeam = await getTeamById(currTeamId);

      if (!currentTeam) {
        throw new Error("Current team does not exist!");
      }

      if (currentTeam.is_sabotaged) {
        throw new Error("Current team is already sabotaged!");
      }

      if (!currentTeam.can_sabotage) {
        throw new Error("Current team cannot sabotage!");
      }

      const teamDoc = await transaction.get(teamRef);
      if (!teamDoc.exists()) {
        throw new Error("Document does not exist!");
      }
      const teamData = teamDoc.data();

      if (teamData.is_sabotaged) {
        throw new Error("Team is already sabotaged!");
      }
      const sabotageTask = getRandomTask();

      // Update the teams is_sabotaged status and assign the sabotage task
      transaction.update(teamRef, {
        is_sabotaged: true,
        sabotaged_task_id: sabotageTask.id,
      });

      // Update the current team's can_sabotage status
      transaction.update(doc(teams, currTeamId), {
        can_sabotage: false,
      });
    });
  } catch (e) {
    throw new Error((e as any).message);
  }
}

export { sabotageTeam };
