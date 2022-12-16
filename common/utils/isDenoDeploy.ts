// According to https://github.com/denoland/deploy_feedback/issues/73//
const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

export {
  isDenoDeploy
}