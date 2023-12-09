/* eslint-disable react/react-in-jsx-scope */
import { render } from "@solidjs/testing-library";
import { DocumentTitle } from "../DocumentTitle";
import { createRoot, createSignal } from "solid-js";
import { describe, expect, it } from "vitest";
import { waitForResolve } from "./testUtils";
describe("DocumentTitle", () => {
  it("sets title when it mounts and resets when it unmounts", async () => {
    document.title = "Unmounted";
    const [dispose] = createRoot((dispose) => {
      const renderResult = render(() => <DocumentTitle title="Toasty Buns" />);

      return [dispose, renderResult];
    });
    await waitForResolve();
    expect(document.title).toBe("Toasty Buns");
    dispose();
    expect(document.title).toBe("Unmounted");
  });

  it("prioritizes titles deeper in the tree", async () => {
    document.title = "Unmounted";
    const [dispose, setMounted] = createRoot((dispose) => {
      const [mounted, setMounted] = createSignal(true);
      const renderResult = render(() => (
        <div>
          <DocumentTitle title="Mounted" />
          <div>{mounted() ? <DocumentTitle title="Toasty Buns" /> : null}</div>
        </div>
      ));

      return [
        dispose,
        async (mounted: boolean) => {
          setMounted(mounted);
          await waitForResolve();
        },
        renderResult,
      ];
    });
    expect(document.title).toBe("Toasty Buns");
    await setMounted(false);
    expect(document.title).toBe("Mounted");
    dispose();
    expect(document.title).toBe("Unmounted");
  });
});
