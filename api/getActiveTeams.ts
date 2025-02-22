import { query, getDocs, where } from "firebase/firestore";
import { Team, Round } from "./models";
import { teams } from "../firebaseConfig";
import { getCurrentActiveRound } from "./rounds";
import { getTeamById } from "./teams";

async function getActiveTeamsToSabotage(currTeamId: string) {
  // First, find all active rounds
  const currentlyActiveRounds = await getCurrentActiveRound();

  if (!currentlyActiveRounds) {
    return [];
  }

  const currentRequestingTeam = await getTeamById(currTeamId);

  if (!currentRequestingTeam) {
    return [];
  }

  // If the requesting team is sabotaged, return an empty list
  if (currentRequestingTeam.is_sabotaged) {
    return [];
  }

  if (!currentRequestingTeam.can_sabotage) {
    return [];
  }

  // Find all teams that are in the active rounds and not sabotaged
  let activeTeams: (Team & { id: string })[] = [];

  const teamsInRoundQuery = query(
    teams,
    where("round_id", "==", Number(currentlyActiveRounds.id)),
    where("is_sabotaged", "==", false)
  );
  const teamsInRoundDocs = (await getDocs(teamsInRoundQuery)).docs;

  const teamsData = teamsInRoundDocs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as (Team & { id: string })[]; //remove the unknow in future

  activeTeams = activeTeams.concat(teamsData);

  // Filter teams that are both in an active round and not sabotaged
  const activeNonSabotagedTeams = activeTeams
    .filter((team) => !team.is_sabotaged)
    .filter((team) => team.id !== currTeamId);

  return activeNonSabotagedTeams;
}

export { getActiveTeamsToSabotage };
