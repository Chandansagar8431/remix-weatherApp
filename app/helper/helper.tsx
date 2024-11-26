import { valueForView } from "./contant";

export const weatherDeatailsViewKeys = (key: string, parentKey = "") => {
  if (valueForView[key]) {
    return valueForView[key];
  } else {
    return null;
  }
};
// export const weatherDetailsValueUnits = (key: string, value: any) => {
//   const param = key.split("_")[1];
//   switch (param) {
//     case "c":
//       return `${value} °C`;
//    case ""
//     default:
//       break;
//   }
//   if (key.includes("cloud") || key.includes("humidity")) {
//     return `${value} %`;
//   } else if (key.includes("pressure") && param === "in") {
//     return `${value} inHg`;
//   } else if (param === "in") {
//     return `${value} in`;
//   } else if (key === "condition") {
//     return (
//       <>
//         {value.text}{" "}
//         <img
//           src={value.icon}
//           alt="condition"
//           style={{
//             width: "34px",
//             height: "15px",
//             margin: "0px",
//             padding: "0px",
//           }}
//         />
//       </>
//     );
//   } else {
//     return value;
//   }
// };

export function flattenObjectForCardView(
  obj: object,
  parentKey = "",
  result = {}
): Record<string, any> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObjectForCardView(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}
