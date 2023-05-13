export type TCreateTitleFunction = (title: string) => {
	rerender: (title: string) => void;
	unmount: () => void;
};

export function createTests(createTitle: TCreateTitleFunction) {
	describe("use-dom-title", () => {
		it("sets given value as document.title", () => {
			createTitle("mounted");
			expect(document.title).toBe("mounted");
		});

		it("does not change document.title if called with empty string", () => {
			document.title = "unmounted";
			createTitle("");
			expect(document.title).toBe("unmounted");
			createTitle("  \t\n");
			expect(document.title).toBe("unmounted");
		});

		it("trims value before setting to document.title", () => {
			createTitle("  mounted   \t\n");
			expect(document.title).toBe("mounted");
		});

		it("reverts title after unmount", () => {
			const oldTitle = "Unmounted";
			const newTitle = "Mounted";
			document.title = oldTitle;
			const renderResult = createTitle(newTitle);
			expect(document.title).toBe(newTitle);
			renderResult.unmount();
			expect(document.title).toBe(oldTitle);
		});

		it("reverts the title if new title is empty", () => {
			document.title = "unmounted";
			const renderResult = createTitle("mounted");
			expect(document.title).toBe("mounted");
			renderResult.rerender("");
			expect(document.title).toBe("unmounted");
			renderResult.rerender("Cool Content");
			expect(document.title).toBe("Cool Content");
			renderResult.rerender("   ");
			expect(document.title).toBe("unmounted");
		});

		it("reverts title after last mounted unmounts", () => {
			const oldTitle = "Unmounted";
			const newTitle = "Mounted";
			document.title = oldTitle;

			const renderResult1 = createTitle(newTitle);
			expect(document.title).toBe(newTitle);
			const renderResult2 = createTitle(newTitle);
			expect(document.title).toBe(newTitle);
			renderResult1.unmount();
			expect(document.title).toBe(newTitle);
			renderResult2.unmount();
			expect(document.title).toBe(oldTitle);
		});

		it("does work with chained, unique titles", () => {
			const oldTitle = "Unmounted";
			const newTitle = "Mounted";
			const anotherNewTitle = "There is another";
			document.title = oldTitle;
			const renderNewResult = createTitle(newTitle);
			expect(document.title).toBe(newTitle);
			const renderAnotherNewResult = createTitle(anotherNewTitle);
			expect(document.title).toBe(anotherNewTitle);
			renderNewResult.unmount();
			expect(document.title).toBe(anotherNewTitle);
			renderAnotherNewResult.unmount();
			expect(document.title).toBe(oldTitle);
		});

		it("respects the stack", () => {
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
			renderResult.unmount();
			expect(document.title).toBe(newTitle);
		});

		test("one entire setup and teardown", () => {
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

			renderResults[6].unmount();
			expect(document.title).toBe("Loading...");
			renderResults[5].unmount();
			expect(document.title).toBe("Wow, this is cool!");
			renderResults[4].unmount();
			expect(document.title).toBe("Loading...");
			renderResults[3].unmount();
			expect(document.title).toBe("Loading...");
			renderResults[2].unmount();
			expect(document.title).toBe("Some Title");
			renderResults[0].unmount();
			expect(document.title).toBe("Some Title");
			renderResults[1].unmount();
			expect(document.title).toBe("Unmounted");
		});

		test("get on top of stack after re-render with another title", () => {
			document.title = "unmounted";
			const renderResult = createTitle("Mounted");

			const renderResult2 = createTitle("Loading...");

			renderResult.rerender("Toasty Buns");
			expect(document.title).toBe("Toasty Buns");
			renderResult.unmount();
			expect(document.title).toBe("Loading...");
			const renderResult3 = createTitle("Toasty Buns");
			expect(document.title).toBe("Toasty Buns");
			renderResult2.rerender("Toasty Buns");
			renderResult3.unmount();
			expect(document.title).toBe("Toasty Buns");
			renderResult2.unmount();
			expect(document.title).toBe("unmounted");
		});

		it("does not revert the title if there is another title on top of the stack", () => {
			document.title = "unmounted";
			const renderResult = createTitle("Loading");
			expect(document.title).toBe("Loading");
			createTitle("Mounted");
			expect(document.title).toBe("Mounted");
			createTitle("Loading");
			expect(document.title).toBe("Loading");
			renderResult.unmount();
			expect(document.title).toBe("Loading");
		});
	});
}

export default createTests;
