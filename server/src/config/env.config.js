const envConfig = () => {
  const envVariables = [
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRATION",
    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRATION",
    "CLIENT_URL",
    "IK_PUBLIC",
    "IK_PRIVATE",
    "IK_URL",
    "IK_ENV",
  ];

  const missingEnvVariables = envVariables.reduce((acc, env) => {
    if (!process.env[env]) acc.push(env);
    return acc;
  }, []);
  if (missingEnvVariables.length >= 1) {
    console.log(
      "Missing required env variables: ",
      missingEnvVariables.join(", "),
    );
    process.exit(1);
  }
};

module.exports = envConfig;
