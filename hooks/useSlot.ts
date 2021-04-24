import useCurrentSlots, { EnhancedSlot } from "./useCurrentSlots";

const useSlot = (slotIdx: number): EnhancedSlot => {
  const currentSlots = useCurrentSlots();
  return currentSlots[slotIdx];
};

export default useSlot;
