import { getDocs, query, where } from "firebase/firestore";
import { Round } from "./models";
import { rounds } from "../firebaseConfig";

export const getCurrentActiveRound: () => Promise<Round | null> = async () => {
  const q = query(rounds, where("is_active", "==", true));

  try {
    const round = (await getDocs(q)).docs;

    if (round.length === 0) {
      return null;
    } else {
      return {
        id: round[0].id,
        ...round[0].data(),
      } as unknown as Round;
    }
  } catch (e) {
    throw new Error((e as any).message);
  }
};
