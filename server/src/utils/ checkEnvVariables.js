const checkEnvVariables = () => {
  const envVariables = [
    "DB_URL",
    "DB_TEST_URL",
    "DB_PASS",
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRATION",
    "REFRESH_TOKEN_SECRET",
    "SECRET_TOKEN_EXPIRATION",
    "CLIENT_URL",
    "IK_PUBLIC",
    "IK_PRIVATE",
    "IK_URL",
    "IK_ENV",
  ];

  const missingEnvVariables = envVariables.reduce((acc, env) => {
    if (process.env[env]) acc.push(env);
  }, []);
  if (missingEnvVariables.length >= 1) {
    console.log(
      "Missing required env variables: ",
      missingEnvVariables.join(", "),
    );
    process.exit(1);
  }
};

module.exports = checkEnvVariables;
