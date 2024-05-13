import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    fontSize: '25px',
    backgroundColor: 'rgb(247,245,246)',
    width: 'auto',
    padding: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 15,
    marginBottom: 15,
  },

  common: {
    textAlign: 'left',
    fontSize: '16px',
    marginTop: '10px',
  },
  profile: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 130,
    height: 130,
  },
});

// Create Document Component
const ApplicationData = ({ jobData, user }) => {
  console.log(user);
  const {
    jobId,
    job_banner,
    job_title,
    category,
    min_salary,
    max_salary,
    dateOfPosting,
    deadline,
    applicationDate,
    description,
    employer,
    applicantEmail,
    applicantName,
    applicantResume,
    totalApplicant,
  } = jobData;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{`Applicant's Copy`}</Text>
          <Text style={styles.common}>
            Application date: {new Date(applicationDate).toLocaleDateString()}
          </Text>
          <Text style={styles.common}>
            {`Applicant's No`}: {totalApplicant}
          </Text>
          <Text style={styles.common}>
            {`Applicant's ID`}: {jobId}
          </Text>
          <Text style={styles.common}>Job Category: {category}</Text>
          <Text style={styles.common}>Name Of The Post: {job_title}</Text>
          <Text style={styles.common}>
            {`Applicant Name`}: {applicantName}
          </Text>
          <Text style={styles.common}>
            {`Applicant Email `}: {applicantEmail}
          </Text>
          <Text style={styles.common}>
            {`Employer Name `}: {employer?.name}
          </Text>
          <Text style={styles.common}>
            {`Employer Email `}: {employer?.email}
          </Text>
        </View>
        <Image style={styles.profile} src={user?.photoURL} />
      </Page>
    </Document>
  );
};

export default ApplicationData;
