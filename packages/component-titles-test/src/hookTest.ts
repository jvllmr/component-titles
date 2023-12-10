import { describe, it, expect, test } from "vitest";

export type TCreateHookTitleFunction = (title: string) => {
  rerender: (title: string) => Promise<void>;
  unmount: () => Promise<void>;
};

export function createHookTests(createTitle: TCreateHookTitleFunction) {
  describe("useComponentTitle", () => {
    it("sets given value as document.title", async () => {
      createTitle("mounted");
      expect(document.title).toBe("mounted");
    });

    it("does not change document.title if called with empty string", async () => {
      document.title = "unmounted";
      createTitle("");
      expect(document.title).toBe("unmounted");
      createTitle("  \t\n");
      expect(document.title).toBe("unmounted");
    });

    it("trims value before setting to document.title", async () => {
      createTitle("  mounted   \t\n");
      expect(document.title).toBe("mounted");
    });

    it("reverts title after unmount", async () => {
      const oldTitle = "Unmounted";
      const newTitle = "Mounted";
      document.title = oldTitle;
      const renderResult = createTitle(newTitle);
      expect(document.title).toBe(newTitle);
      await renderResult.unmount();
      expect(document.title).toBe(oldTitle);
    });

    it("reverts the title if new title is empty", async () => {
      document.title = "unmounted";
      const renderResult = createTitle("mounted");
      expect(document.title).toBe("mounted");
      await renderResult.rerender("");
      expect(document.title).toBe("unmounted");
      await renderResult.rerender("Cool Content");
      expect(document.title).toBe("Cool Content");
      await renderResult.rerender("   ");
      expect(document.title).toBe("unmounted");
    });

    it("reverts title after last mounted unmounts", async () => {
      const oldTitle = "Unmounted";
      const newTitle = "Mounted";
      document.title = oldTitle;

      const renderResult1 = createTitle(newTitle);
      expect(document.title).toBe(newTitle);
      const renderResult2 = createTitle(newTitle);
      expect(document.title).toBe(newTitle);
      await renderResult1.unmount();
      expect(document.title).toBe(newTitle);
      await renderResult2.unmount();
      expect(document.title).toBe(oldTitle);
    });

    it("does work with chained, unique titles", async () => {
      const oldTitle = "Unmounted";
      const newTitle = "Mounted";
      const anotherNewTitle = "There is another";
      document.title = oldTitle;
      const renderNewResult = createTitle(newTitle);
      expect(document.title).toBe(newTitle);
      const renderAnotherNewResult = createTitle(anotherNewTitle);
      expect(document.title).toBe(anotherNewTitle);
      await renderNewResult.unmount();
      expect(document.title).toBe(anotherNewTitle);
      await renderAnotherNewResult.unmount();
      expect(document.title).toBe(oldTitle);
    });

    it("respects the stack", async () => {
      const oldTitle = "Unmounted";
      const newTitle = "Mounted";
      const loadingTitle = "Loading...";

      document.title = oldTitle;
      createTitle(loadingTitle);
      expect(document.title).toBe(loadingTitle);
      createTitle(newTitle);
      expect(document.title).toBe(newTitle);
      const renderResult = createTitle(loadingTitle);
      expect(document.title).toBe(loadingTitle);
      await renderResult.unmount();
      expect(document.title).toBe(newTitle);
    });

    test("one entire setup and teardown", async () => {
      document.title = "Unmounted";
      const renderResults = [
        "Loading...",
        "Some Title",
        "Loading...",
        "Loading...",
        "Wow, this is cool!",
        "Loading...",
        "Toasty Buns", // https://www.youtube.com/watch?v=70gtWveVuRg
      ].map((title: string) => {
        const renderResult = createTitle(title);
        expect(document.title).toBe(title);
        return renderResult;
      });

      await renderResults[6].unmount();
      expect(document.title).toBe("Loading...");
      await renderResults[5].unmount();
      expect(document.title).toBe("Wow, this is cool!");
      await renderResults[4].unmount();
      expect(document.title).toBe("Loading...");
      await renderResults[3].unmount();
      expect(document.title).toBe("Loading...");
      await renderResults[2].unmount();
      expect(document.title).toBe("Some Title");
      await renderResults[0].unmount();
      expect(document.title).toBe("Some Title");
      await renderResults[1].unmount();
      expect(document.title).toBe("Unmounted");
    });

    test("get on top of stack after re-render with another title", async () => {
      document.title = "unmounted";
      const renderResult = createTitle("Mounted");

      const renderResult2 = createTitle("Loading...");

      await renderResult.rerender("Toasty Buns");
      expect(document.title).toBe("Toasty Buns");
      await renderResult.unmount();
      expect(document.title).toBe("Loading...");
      const renderResult3 = createTitle("Toasty Buns");
      expect(document.title).toBe("Toasty Buns");
      await renderResult2.rerender("Toasty Buns");
      await renderResult3.unmount();
      expect(document.title).toBe("Toasty Buns");
      await renderResult2.unmount();
      expect(document.title).toBe("unmounted");
    });

    it("does not revert the title if there is another title on top of the stack", async () => {
      document.title = "unmounted";
      const renderResult = createTitle("Loading");
      expect(document.title).toBe("Loading");
      createTitle("Mounted");
      expect(document.title).toBe("Mounted");
      createTitle("Loading");
      expect(document.title).toBe("Loading");
      await renderResult.unmount();
      expect(document.title).toBe("Loading");
    });
  });
}

export default createHookTests;
