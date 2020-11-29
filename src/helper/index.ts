import { Asset, FileSystem } from 'react-native-unimodules';

const getAssetAsString = async (asset: Asset) => {
  const downloadedModules = await FileSystem.readDirectoryAsync(
    FileSystem.cacheDirectory || ''
  );
  let fileName = 'ExponentAsset-' + asset.hash + '.' + asset.type;

  if (!downloadedModules.includes(fileName)) {
    await asset.downloadAsync();
  }

  return await FileSystem.readAsStringAsync(
    FileSystem.cacheDirectory + fileName
  );
};

export { getAssetAsString };
