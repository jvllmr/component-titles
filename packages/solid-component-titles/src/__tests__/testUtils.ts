// https://docs.solidjs.com/guides/how-to-guides/testing-in-solid/vitest#testing-reactive-state
export async function waitForResolve() {
  await new Promise((done) => setTimeout(done, 0));
}
