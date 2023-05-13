import { Types } from "mongoose";
import { type RobotMockStructure } from "../types";

const robotsMock: RobotMockStructure[] = [
  {
    _id: new Types.ObjectId(),
    name: "Bender",
    imageUrl: "https://example.com",
    characteristics: {
      speed: 2,
      resistance: 6,
      creationDate: "24/02/2023",
    },
  },
];

export default robotsMock;
