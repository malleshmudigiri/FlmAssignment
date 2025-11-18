import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch("/companies.json");
     
        const data = await res.json();

        const selected = data.find((item) => item.id === Number(id));
        setCompany(selected);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-[50vh]">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!company) return <p className="text-center mt-10">Company not found</p>;

  return (
   <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
    <h1 className="text-2xl font-bold mb-4">{company.name}</h1>

    <p className="mb-2">
      <strong>Location:</strong> {company.location}
    </p>

    <p className="mb-2">
      <strong>Industry:</strong> {company.industry}
    </p>

    <p className="mb-2">
      <strong>Founded Year:</strong> {company.foundedYear}
    </p>

    <p className="mb-4">
      <strong>Description:</strong> {company.description}
    </p>

    <p className="mb-4">
      <strong>Company ID:</strong> {company.id}
    </p>

    <Link
      to="/"
      className="px-4 py-2 bg-gray-900 text-white rounded inline-block"
    >
      Back
    </Link>
  </div>
  );
};

export default CompanyDetails;
