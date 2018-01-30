// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  accounts: {
    getPolicies: 'https://accounts.gigya.com/accounts.getPolicies',
    setPolicies: 'https://accounts.gigya.com/accounts.setPolicies',
  },
  credentials: {
    userKey: 'AJA3Cw9XcJZf',
    secret: '1J%2BYxAY47khnuXf4GKSggLpPFBbQv8Hq',
    apiKey: '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK',
  }
};
