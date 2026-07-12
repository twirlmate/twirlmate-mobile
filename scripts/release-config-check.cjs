const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const appJsonPath = path.join(projectRoot, 'app.json');
const easJsonPath = path.join(projectRoot, 'eas.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function existsRelative(relativePath) {
  return fs.existsSync(path.join(projectRoot, relativePath));
}

function get(object, propertyPath) {
  return propertyPath.split('.').reduce((value, key) => value?.[key], object);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function hasObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validate() {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(appJsonPath)) {
    errors.push('Missing app.json.');
    return { errors, warnings };
  }

  const appJson = readJson(appJsonPath);
  const expoConfig = appJson.expo;

  if (!expoConfig || typeof expoConfig !== 'object') {
    errors.push('app.json must contain an expo config object.');
    return { errors, warnings };
  }

  const requiredStringFields = [
    'name',
    'slug',
    'version',
    'scheme',
    'icon',
  ];

  for (const field of requiredStringFields) {
    if (!isNonEmptyString(get(expoConfig, field))) {
      errors.push(`Missing required Expo field: expo.${field}`);
    }
  }

  const assetFields = [
    'icon',
    'android.adaptiveIcon.foregroundImage',
  ];

  for (const field of assetFields) {
    const assetPath = get(expoConfig, field);
    if (isNonEmptyString(assetPath) && !existsRelative(assetPath)) {
      errors.push(`Referenced asset does not exist: expo.${field} -> ${assetPath}`);
    }
  }

  const splashPlugin = Array.isArray(expoConfig.plugins)
    ? expoConfig.plugins.find((plugin) => Array.isArray(plugin) && plugin[0] === 'expo-splash-screen')
    : null;

  const splashImagePath = splashPlugin?.[1]?.image;
  if (!isNonEmptyString(splashImagePath)) {
    warnings.push('No expo-splash-screen image is configured.');
  } else if (!existsRelative(splashImagePath)) {
    errors.push(`Referenced splash asset does not exist: ${splashImagePath}`);
  }

  if (!isNonEmptyString(get(expoConfig, 'ios.bundleIdentifier'))) {
    errors.push('Missing expo.ios.bundleIdentifier');
  }

  if (!isNonEmptyString(get(expoConfig, 'ios.buildNumber'))) {
    errors.push('Missing expo.ios.buildNumber');
  }

  if (!isNonEmptyString(get(expoConfig, 'android.package'))) {
    errors.push('Missing expo.android.package');
  }

  if (!isPositiveInteger(get(expoConfig, 'android.versionCode'))) {
    errors.push('Missing or invalid expo.android.versionCode');
  }

  if (!fs.existsSync(easJsonPath)) {
    errors.push('Missing eas.json.');
    return { errors, warnings };
  }

  let easJson;
  try {
    easJson = readJson(easJsonPath);
  } catch (error) {
    errors.push(`Unable to parse eas.json: ${error.message}`);
    return { errors, warnings };
  }

  if (!hasObject(easJson.build)) {
    errors.push('eas.json must contain a build object.');
  }

  if (!hasObject(easJson.submit)) {
    errors.push('eas.json must contain a submit object.');
  }

  const productionBuild = easJson.build?.production;
  if (!hasObject(productionBuild)) {
    errors.push('eas.json must define build.production.');
  } else {
    if (!hasObject(productionBuild.ios)) {
      errors.push('eas.json must define build.production.ios.');
    } else if (productionBuild.ios.distribution !== 'store') {
      errors.push('eas.json build.production.ios.distribution must be "store".');
    }

    if (!hasObject(productionBuild.android)) {
      errors.push('eas.json must define build.production.android.');
    } else if (productionBuild.android.buildType !== 'app-bundle') {
      errors.push('eas.json build.production.android.buildType must be "app-bundle".');
    }
  }

  if (!hasObject(easJson.submit?.production)) {
    errors.push('eas.json must define submit.production.');
  }

  return { errors, warnings };
}

function printResults(results) {
  console.log('Release config check');
  console.log(`Project: ${projectRoot}`);

  if (results.warnings.length > 0) {
    console.log('\nWarnings:');
    for (const warning of results.warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    for (const error of results.errors) {
      console.log(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('\nAll checked release-config requirements passed.');
}

printResults(validate());
