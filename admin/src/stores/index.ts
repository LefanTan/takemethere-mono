import useAppStore from "./appStore";

/**
 * Returns an object that contains reference to all the stores
 * @returns
 */
export default function useStore() {
  const app = useAppStore();

  return { app };
}
