import { cartKey, type CartAction, type CartState } from "@/types";

export const initialCartState: CartState = {
  quantities: {},
  activeVariant: {},
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INCREMENT": {
      const key = cartKey(action.productId, action.variantId);
      const min = action.min ?? 0;
      const max = action.max ?? Infinity;
      const next = clamp((state.quantities[key] ?? 0) + (action.step ?? 1), min, max);
      return { ...state, quantities: { ...state.quantities, [key]: next } };
    }
    case "DECREMENT": {
      const key = cartKey(action.productId, action.variantId);
      const min = action.min ?? 0;
      const max = action.max ?? Infinity;
      const next = clamp((state.quantities[key] ?? 0) - (action.step ?? 1), min, max);
      return { ...state, quantities: { ...state.quantities, [key]: next } };
    }
    case "SET_QUANTITY": {
      const key = cartKey(action.productId, action.variantId);
      const min = action.min ?? 0;
      const max = action.max ?? Infinity;
      const next = clamp(action.quantity, min, max);
      return { ...state, quantities: { ...state.quantities, [key]: next } };
    }
    case "SELECT_VARIANT": {
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      };
    }
    case "RESTORE": {
      return action.state;
    }
    default:
      return state;
  }
}
