import PackageJson from '../../package.json'

const {
  NODE_ENV,
  REACT_APP_ENVIRONMENT = 'development',
  REACT_APP_BACKEND_BASEURL,
  REACT_APP_TOKEN,
} = process.env

const systemConfig = {
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  isProd: process.env.NODE_ENV === 'production',
  env: NODE_ENV,
  environment: REACT_APP_ENVIRONMENT,
  backendBaseURL: REACT_APP_BACKEND_BASEURL || `https://api.github.com`,
  webAppVersion: PackageJson.version,
  token: REACT_APP_TOKEN,
}

export default systemConfig
