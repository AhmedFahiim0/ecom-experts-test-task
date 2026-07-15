import { cartKey, type CartAction, type CartState } from "@/types";

export const initialCartState: CartState = {
  quantities: {},
  activeVariant: {},
  savedAt: null,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INCREMENT": {
      const key = cartKey(action.productId, action.variantId);
      const next = (state.quantities[key] ?? 0) + (action.step ?? 1);
      return { ...state, quantities: { ...state.quantities, [key]: next } };
    }
    case "DECREMENT": {
      const key = cartKey(action.productId, action.variantId);
      const next = Math.max(0, (state.quantities[key] ?? 0) - (action.step ?? 1));
      return { ...state, quantities: { ...state.quantities, [key]: next } };
    }
    case "SET_QUANTITY": {
      const key = cartKey(action.productId, action.variantId);
      const next = Math.max(0, action.quantity);
      return { ...state, quantities: { ...state.quantities, [key]: next } };
    }
    case "SELECT_VARIANT": {
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      };
    }
    case "SAVE": {
      return { ...state, savedAt: new Date().toISOString() };
    }
    case "RESTORE": {
      return action.state;
    }
    default:
      return state;
  }
}
