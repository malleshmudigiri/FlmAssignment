import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();




useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/companies.json");

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }


        let data = await response.json();
     

      setCompanies(data);
      setFilteredList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);


  // Apply filters
  useEffect(() => {
    let data = [...companies];

    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (locationFilter !== "") {
      data = data.filter((item) => item.location === locationFilter);
    }

    setFilteredList(data);
    setPage(1);
  }, [search, locationFilter, companies]);


  const startIndex = (page - 1) * pageSize;
  const pageData = filteredList.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredList.length / pageSize);

  const uniqueLocations = [...new Set(companies.map((c) => c.location))];

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Companies Directory
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-64"
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

     
      <div className="flex flex-wrap justify-center items-center gap-5">
        {pageData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Location:</span> {item.location}
            </p>

            <p className="text-gray-600 mb-2">
              <span className="font-medium">Industry:</span> {item.industry}
            </p>

            <div className="flex items-center justify-between text-sm mt-3">
              <span className="px-3 py-1 bg-gray-200 rounded-md">ID: {item.id}</span>
              <button
               onClick={() => navigate(`/company/${item.id}`)}
              className="px-3 py-1 bg-gray-900 text-white rounded-md">
                View
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="text-lg">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompaniesPage;
