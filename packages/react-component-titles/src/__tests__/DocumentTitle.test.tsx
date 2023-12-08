/* eslint-disable react/react-in-jsx-scope */

import { render } from "@testing-library/react";
import { DocumentTitle } from "../DocumentTitle";
import { describe, it, expect } from "vitest";
describe("DocumentTitle", () => {
  it("sets title when it mounts and resets when it unmounts", () => {
    document.title = "Unmounted";
    const renderResult = render(<DocumentTitle title="Toasty Buns" />);
    expect(document.title).toBe("Toasty Buns");
    renderResult.unmount();
    expect(document.title).toBe("Unmounted");
  });

  it("prioritizes titles deeper in the tree", () => {
    document.title = "Unmounted";
    const renderResult = render(
      <div>
        <DocumentTitle title="Mounted" />
        <div>
          <DocumentTitle title="Toasty Buns" />
        </div>
      </div>,
    );
    expect(document.title).toBe("Toasty Buns");
    renderResult.rerender(
      <div>
        <DocumentTitle title="Mounted" />
      </div>,
    );
    expect(document.title).toBe("Mounted");
    renderResult.unmount();
    expect(document.title).toBe("Unmounted");
  });
});
