/* eslint-disable react/react-in-jsx-scope */
import { render } from "@solidjs/testing-library";
import { DocumentTitle } from "./DocumentTitle";
import { createSignal } from "solid-js";

describe("DocumentTitle", () => {
  it("sets title when it mounts and resets when it unmounts", () => {
    document.title = "Unmounted";
    const renderResult = render(() => <DocumentTitle title="Toasty Buns" />);
    expect(document.title).toBe("Toasty Buns");
    renderResult.unmount();
    expect(document.title).toBe("Unmounted");
  });

  it("prioritizes titles deeper in the tree", () => {
    document.title = "Unmounted";
    const [mounted, setMounted] = createSignal(true);
    const renderResult = render(() => (
      <div>
        <DocumentTitle title="Mounted" />
        <div>{mounted() ? <DocumentTitle title="Toasty Buns" /> : null}</div>
      </div>
    ));
    expect(document.title).toBe("Toasty Buns");
    setMounted(false);
    expect(document.title).toBe("Mounted");
    renderResult.unmount();
    expect(document.title).toBe("Unmounted");
  });
});
