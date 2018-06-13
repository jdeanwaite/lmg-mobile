import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors'
import { tryOpenLink } from '../api/linking'

export default function ScriptureGroup (props) {
  const { scriptures } = props.scriptureGroup;

  return (
    <View style={styles.borderedGroup}>
      <Text style={styles.title}>{props.scriptureGroup.title}</Text>

      {scriptures.map(scripture => (
        <TouchableOpacity key={scripture.text} onPress={() => handleLink(scripture.link)}>
          <Text style={styles.link}>{scripture.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

ScriptureGroup.propTypes = {
  scriptureGroup: PropTypes.object
}

function handleLink(link) {
  tryOpenLink(link).catch(err => console.error('An error occurred', err));
}

// function tryOpenLinkInGospelLibrary(link) {
//   // const generatedLink = generateScriptureLink(link, true);
//   return Linking.canOpenURL(link)
//     .then((supported) => {
//       if (!supported) {
//         console.log(`Can't handle url: ${link}`);
//         // return tryOpenLinkInBrowser(generatedLink);
//       }
//       return Linking.openURL(link);
//     })
//     .catch(err => console.error('An error occurred', err));
// }

// function tryOpenLinkInBrowser(link) {
//   const generatedLink = generateScriptureLink(link, false);
//   console.log('Opening link', generatedLink);
//   return Linking.openURL(generatedLink);
// }
//
// function generateScriptureLink(link, forGospelLibraryApp) {
//   const prefix = forGospelLibraryApp
//     ? 'gospellibrary://content'
//     : 'https://www.lds.org/languages/eng/content';
//
//   let suffix = '';
//   if (!isNaN(scripture.verse)) {
//     suffix = `#${scripture.verse}`;
//   }
//   return `${prefix}/scriptures/${scripture.book}/${scripture.subBook}/${scripture.chapter}.${
//     scripture.verse
//   }${suffix}`;
// }

const styles = StyleSheet.create({
  borderedGroup: {
    borderColor: 'rgba(0, 0, 0, .1)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, .54)',
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.tintColor,
    marginBottom: 8,
  },
});
