import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ApplicationData from './ApplicationData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure/useAxiosSecure';

const CreatePDF = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState({});
  console.log(user);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axiosSecure.get(`applicationData/${id}`);
      setJobData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(jobData);

  return (
    <div className="max-w-7xl  w-full mx-auto flex justify-center mt-5">
      <div className="container mx-auto">
        <PDFViewer className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] h-[400px] md:h-[600px] lg:h-[800px] xl:h-[1000px] mx-auto mt-5">
          <ApplicationData jobData={jobData} user={user} />
        </PDFViewer>
        <div className="flex justify-center w-full my-10">
          <PDFDownloadLink
            document={<ApplicationData jobData={jobData} user={user} />}
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
