import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection();
};
