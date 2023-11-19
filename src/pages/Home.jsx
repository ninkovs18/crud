import { useEffect, useState } from "react";
import apiRequest from "../apiRequest";
import DisplayData from "../components/DisplayData";
function Home() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3003/persons");
      const data = await response.json();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setData((data) => data.filter((d) => d.id !== id));

    const result = await apiRequest(`http://localhost:3003/persons/${id}`, {
      method: "DELETE",
    });

    console.log(result);
  };
  return (
    <div>
      <DisplayData
        data={data}
        setData={setData}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
