import { Linking } from 'react-native'

export function tryOpenLink(link) {
  // const generatedLink = generateScriptureLink(link, true);
  return Linking.canOpenURL(link)
    .then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${link}`);
        // return tryOpenLinkInBrowser(generatedLink);
      }
      return Linking.openURL(link);
    })
    .catch(err => console.error('An error occurred', err));
}
