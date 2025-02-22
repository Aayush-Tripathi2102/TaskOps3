import React, { createContext } from "react";

export const UserContext = createContext<{
  setUserId: (userId: string | null) => Promise<void>;
  userId: string | null;
}>({
  setUserId: async () => {},
  userId: null,
});
