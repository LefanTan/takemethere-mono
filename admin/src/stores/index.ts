import useAppStore from "./appStore";
import usePageStore from "./pageStore";

/**
 * Returns an object that contains reference to all the stores
 * @returns
 */
export default function useStore() {
  const app = useAppStore();
  const page = usePageStore();

  return { app, page };
}
