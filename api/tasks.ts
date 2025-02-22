import { db, teams } from "../firebaseConfig";
import { Task } from "./models";
import { getCurrentActiveRound } from "./rounds";
import { getTeamById } from "./teams";
import { doc, updateDoc } from "firebase/firestore";

function successResponse(data: Task[], message: string) {
  return {
    message,
    data,
    success: true,
  };
}

function errorResponse(message: string) {
  return {
    message,
    data: [] as Task[],
    success: false,
  };
}

export async function getTasksForTeam(team_id: string) {
  try {
    const roundWhichIsActive = await getCurrentActiveRound();

    if (!roundWhichIsActive) {
      return errorResponse("Your Round Has not started yet!");
    }

    const team = await getTeamById(team_id);

    if (!team) {
      return errorResponse(`No user found with id ${team_id}`);
    }

    if (team.round_id !== Number(roundWhichIsActive.id)) {
      return errorResponse("Your Round Has not started yet!");
    }

    if (roundWhichIsActive.is_final) {
      return successResponse(team.final_tasks, "success");
    } else {
      if (team.is_sabotaged) {
        const sab_tasks = team.sabotage_tasks.find((t) => {
          if (t.id == team.sabotaged_task_id) {
            return true;
          } else {
            return false;
          }
        });

        if (!sab_tasks) {
          return errorResponse("No Task Found For Sabotage!");
        }

        return successResponse([sab_tasks], "sabotaged");
      } else {
        return successResponse(team.normal_tasks, "normal");
      }
    }
  } catch (e) {
    throw new Error((e as any).message);
  }
}

export const submitCodeForTask = async (
  team_id: string,
  task_id: number,
  code: string,
  time: number,
  points: number
) => {
  try {
    const roundWhichIsActive = await getCurrentActiveRound();

    const team = await getTeamById(team_id);

    if (!team) {
      return errorResponse(`No user found with id ${team_id}`);
    }

    delete (team as any).id;

    // Check if sabotaged and but you are submitting a normal task
    if (team.is_sabotaged) {
      const isCurrTaskToBeSubmittedIsSabotaged = team.sabotage_tasks.find(
        (t) => t.id === task_id
      );

      if (!isCurrTaskToBeSubmittedIsSabotaged) {
        return errorResponse("You are sabotaged! Please finish that first");
      }
    }

    const tasks = await getTasksForTeam(team_id);

    if (!tasks.success) {
      return errorResponse(tasks.message);
    }

    const task = tasks.data.find((t) => t.id === task_id);

    if (!task) {
      return errorResponse("Task not found");
    }

    if (task.status === "completed") {
      return errorResponse("Task already completed");
    }

    if (task.secret === code) {
      if (team.is_sabotaged) {
        const isCurrTaskToBeSubmittedIsSabotaged = team.sabotage_tasks.find(
          (t) => t.id === task.id
        );

        if (!isCurrTaskToBeSubmittedIsSabotaged) {
          return errorResponse("You are sabotaged! Please finish that first");
        } else {
          // update the db
          const index = team.sabotage_tasks.findIndex((t) => t.id === task.id);
          // TODO: CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
          // team.sabotage_tasks[index].status = "completed";
          // team.sabotage_tasks[index].points = points;
          team.recently_solved_timestamp = new Date().toUTCString();
          // team.total_score += points;
          team.is_sabotaged = false;

          // update firebase db
          await updateDoc(doc(db, "Teams", team_id), team as any);
          return successResponse([], "success");
        }
      } else {
        if (roundWhichIsActive?.is_final) {
          const index = team.final_tasks.findIndex((t) => t.id === task.id);
          if (index === -1) return errorResponse("Task not found");
          team.final_tasks[index].status = "completed";
          team.final_tasks[index].points = points;
          team.recently_solved_timestamp = new Date().toUTCString();
          team.total_score += points;

          // update firebase db
          await updateDoc(doc(db, "Teams", team_id), team as any);
          return successResponse([], "success");
        } else {
          const index = team.normal_tasks.findIndex((t) => t.id === task.id);
          if (index === -1) return errorResponse("Task not found");
          team.normal_tasks[index].status = "completed";
          team.normal_tasks[index].points = points;
          team.recently_solved_timestamp = new Date().toUTCString();
          team.total_score += points;

          // update firebase db
          await updateDoc(doc(db, "Teams", team_id), team as any);
          return successResponse([], "success");
        }
      }
    } else {
      return errorResponse("Wrong code");
    }
  } catch (e) {
    throw new Error((e as any).message);
  }
};
