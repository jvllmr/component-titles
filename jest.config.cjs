// eslint-disable-next-line no-undef
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	verbose: true,
	moduleNameMapper: {
		"@jvllmr/component-titles-(.+)":
			"<rootDir>/packages/component-titles-$1/src",
		"@jvllmr/(.+)-component-titles":
			"<rootDir>/packages/$1-component-titles/src",
	},
};
