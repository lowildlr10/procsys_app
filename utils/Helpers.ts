export default class Helper {
  static sanitizeUrl = (url: string) => {
    return url.replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
  };

  static isValidUrl = (urlString: string) => {
    try {
      // const url = new URL(urlString)

      // Additional check to exclude base64-encoded strings
      if (/^data:image\/[a-z]+;base64,/.test(urlString)) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  static formatStringHasUnderscores(str: string) {
    let result = str.replace(/_/g, ' ');
    result = result.replace(/\b\w/g, (char) => char.toUpperCase());
    return result;
  }
}
