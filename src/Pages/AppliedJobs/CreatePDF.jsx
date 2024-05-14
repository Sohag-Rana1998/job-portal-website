/* eslint-disable no-unused-vars */
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ApplicationData from './ApplicationData';
import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import useAppliedJobDataByID from '../../Components/Hooks/useAppliedJobDataByID/useAppliedJobDataByID';
import { Helmet } from 'react-helmet-async';

const CreatePDF = () => {
  const { user } = useAuth();
  const { id } = useParams();

  // const [loading, setLoading] = useState(true);

  console.log(user);
  const { data } = useAppliedJobDataByID(id);
  console.log(data);
  return (
    <div className="max-w-7xl  w-full mx-auto flex justify-center mt-5">
      <Helmet>
        <title>Job Portal | PDF Download</title>
      </Helmet>
      <div className="container mx-auto">
        <PDFViewer className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] h-[400px] md:h-[600px] lg:h-[800px] xl:h-[1000px] mx-auto mt-5">
          <ApplicationData data={data} user={user} />
        </PDFViewer>
        <div className="flex justify-center w-full my-10">
          <PDFDownloadLink
            document={<ApplicationData data={data} user={user} />}
            fileName="application.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default CreatePDF;
