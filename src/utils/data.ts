import { property1, property2, property3 } from "assets";
import { PropertyCardData } from "components";

export const property: PropertyCardData = {
  images: [property1, property2, property3],
  amenities: { bedroom: 2, toilet: 2 },
  discount: "",
  owner: "string;",
  name: "Adebowale House",
  address: "255 Hervert Macaulay road",
  description: "description",
  amount: "$2500",
  id: "1234",
};

export const propertyList: PropertyCardData[] = new Array(10).fill(property);
