import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset, FileSystem } from 'react-native-unimodules';
import { IHighchartWebView } from './types';

const HighchartWebView = ({ options, styles }: IHighchartWebView) => {
  const [layoutHTML, setLayoutHTML] = useState('');
  const [moduleReady, setModuleReady] = useState(false);
  const [stringifiedScripts, setStringifiedScripts] = useState({});
  const [chartOptions, setChartOptions] = useState(options);
  const [modules] = useState(['highstock', 'data', 'exporting', 'exportdata']);
  const webViewRef = useRef<WebView | any>();

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

  const setLayout = useCallback(async () => {
    const indexHtml = Asset.fromModule(require('../../assets/html/index.html'));
    setLayoutHTML(await getAssetAsString(indexHtml));
  }, []);

  const loadScript = useCallback(async () => {
    const files: any = {};
    // let node = '';
    // if (name === 'highstock') {
    //   node = Modules.highstock;
    // }
    // if (name === 'data') {
    //   node = Modules.data;
    // }
    // if (name === 'exporting') {
    //   node = Modules.exporting;
    // }
    // if (name === 'exportdata') {
    //   node = Modules.exportdata;
    // }
    const highstock = Asset.fromModule(
      require('../../assets/html/hcscript/highstock.hcscript')
    );
    const data = Asset.fromModule(
      require('../../assets/html/hcscript/data.hcscript')
    );
    const exporting = Asset.fromModule(
      require('../../assets/html/hcscript/exporting.hcscript')
    );
    const exportdata = Asset.fromModule(
      require('../../assets/html/hcscript/exportdata.hcscript')
    );
    files.highstock = await getAssetAsString(highstock);
    files.data = await getAssetAsString(data);
    files.exporting = await getAssetAsString(exporting);
    files.exportdata = await getAssetAsString(exportdata);

    setStringifiedScripts(files);
  }, []);

  const serialize = (chartValueOptions: {}, isUpdate?: boolean) => {
    const hcFunctions: any = {};
    let serializedOptions: any;
    let i = 0;

    serializedOptions = JSON.stringify(chartValueOptions, function (val, key) {
      var fcId = '###HighchartsFunction' + i + '###';

      // set reference to function for the later replacement
      if (typeof key === 'function') {
        hcFunctions[fcId] = key.toString();
        i++;
        return isUpdate ? key.toString() : fcId;
      }

      return key;
    });

    // replace ids with functions.
    if (!isUpdate) {
      Object.keys(hcFunctions).forEach(function (key) {
        serializedOptions = serializedOptions.replace(
          '"' + key + '"',
          hcFunctions[key]
        );
      });
    }

    return serializedOptions;
  };

  useEffect(() => {
    setLayout();
    loadScript();
    // loadScript('data');
    // loadScript('exporting');
    // loadScript('exportingdata');
    setModuleReady(true);
  }, [setLayout, loadScript]);

  useEffect(() => {
    setChartOptions(options);
  }, [options]);

  if (moduleReady) {
    const runFirst = `
        var modulesList = ${JSON.stringify(modules)};
        var readable = ${JSON.stringify(stringifiedScripts)}

        function loadScripts(file, callback, redraw) {
            var hcScript = document.createElement('script');
            hcScript.innerHTML = readable[file]
            document.body.appendChild(hcScript);

            if (callback) {
                callback.call();
            }

            if (redraw) {
                Highcharts.stockChart("container", ${serialize(chartOptions)});
            }
        }

        loadScripts('highcharts', function () {
            var redraw = modulesList.length > 0 ? false : true;
            loadScripts('highcharts-more', function () {
                if (modulesList.length > 0) {
                    for (var i = 0; i < modulesList.length; i++) {
                        if (i === (modulesList.length - 1)) {
                            redraw = true;
                        } else {
                            redraw = false;
                        }
                        loadScripts(modulesList[i], undefined, redraw, true);
                    }
                }
            }, redraw);
        }, false);
    `;
    return (
      <View style={[localStyles.container, styles]}>
        <WebView
          ref={webViewRef}
          source={{
            html: layoutHTML,
          }}
          injectedJavaScript={runFirst}
          originWhitelist={['*']}
          automaticallyAdjustContentInsets={true}
          allowFileAccess={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          scrollEnabled={false}
          mixedContentMode="always"
          allowFileAccessFromFileURLs={true}
          onMessage={(e: { nativeEvent: { data?: string } }) => {
            Alert.alert('Message received from JS: ', e.nativeEvent.data);
          }}
        />
      </View>
    );
  } else {
    return <View />;
  }
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 500,
  },
});

export default HighchartWebView;
