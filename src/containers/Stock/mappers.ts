import _ from 'lodash';
export const MapResponse = (response: {}) => {
  const result: any = [];
  _.forOwn(response, (value: string, key: string) => {
    const Level1Object = [];
    Level1Object.push(new Date(key).getTime());
    _.forOwn(value, (cValue: any, _cKey) => {
      Level1Object.push(parseFloat(cValue));
    });
    result.push(Level1Object.slice(0, Level1Object.length - 1));
  });
  return result;
};
