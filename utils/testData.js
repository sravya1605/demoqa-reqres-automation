/** Generates a unique-ish name so parallel test runs don't collide on reqres.in's fake data. */
function randomUser() {
  const id = Date.now();
  return {
    name: `John Tester ${id}`,
    job: 'QA Automation Engineer',
  };
}

module.exports = { randomUser };
