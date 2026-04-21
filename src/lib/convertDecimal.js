import { Decimal } from "@prisma/client/runtime/library";

export const convertDecimals = (obj) => {
  if (obj instanceof Decimal) return Number(obj);
  if (Array.isArray(obj)) return obj.map(convertDecimals);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertDecimals(v)])
    );
  }
  return obj;
}