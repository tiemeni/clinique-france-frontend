import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 20,
  },
  section: {
    padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  username: {
    textAlign: 'right',
  },
  strong: {
    fontWeight: 'extrabold',
  },
  listes: {
    padding: 10,
    marginLeft: 30,
    gap: 5,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    left: 0,
    right: 20,
    bottom: 10,
    textAlign: 'right',
  },
});

function AppointmentPDF() {
  const date = moment(new Date()).format('dddd DD MMMM YYYY');
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={[styles.section, { flexDirection: 'row' }]}>
            <View style={styles.text}>
              <Image style={styles.image} src="/logo.jpg" alt="logo" />
              <View>
                <Text>Centre Ophtalmologique AXEVISION</Text>
                <Text>4 rue Jean Rameau</Text>
                <Text>40100 DAX</Text>
                <Text>Tel : 05 58 58 43 43</Text>
                <Text>Site : https://www.visis.fr/prendre-rendez-vous/</Text>
                <Text>Mail : axevisiondax@gmail.com</Text>
              </View>
            </View>
            <View style={styles.text}>
              <Image style={styles.image} src="/qr-code.jpg" alt="logo" />
            </View>
          </View>

          <View
            style={[
              styles.section,
              styles.text,
              { alignItems: 'flex-end', gap: 30 },
            ]}
          >
            <Text>TIEMENI HAPPI Christian</Text>
            <Text>DAX, le {date}</Text>
          </View>

          <View style={[styles.section, styles.text, { gap: 20 }]}>
            <Text>Ref: ALAXIONE/CS/OPHTA2</Text>
            <View>
              <Text>Monsieur TIEMENI HAPPI Christian</Text>
              <Text style={{ marginTop: 5 }}>
                Voici les détails de vos prochains rendez-vous pour le motif{' '}
                <Text style={styles.strong}>
                  consultation 16-59 - Opthalmologiste2
                </Text>
                {' :'}
              </Text>
              <View style={styles.listes}>
                <View>
                  <Text>
                    <Text style={styles.strong}>Jeudi 26 Octobre 09:20 </Text>
                    avec le Dr OPTHA2 PIerre
                  </Text>
                  <Text>
                    Centre Ophtalmologique AXEVISION - unite fonctionnelle 1
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default AppointmentPDF;
