const DetailPage = () => {
  const params = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmate().catch(console.error);
  }, []);

  const fetchCrewmate = async () => {
    const {data} = await supabase
      .from('crewmates')
      .select()
      .eq('id', params.id);

    setCrewmate(data[0]);
  };

  const navigate = useNavigate();
  const editCrewmate = () => {
    navigate(`/edit/${params.id}`, {replace: true});
  };

  return (
    <div className="detail-page">
      {crewmate && (
        <div>
          <h1>Crewmate: {crewmate.name}</h1>
          <h1>Stats:</h1>
          <h3>Speed: {crewmate.speed} mph</h3>
          <h3>Color: {crewmate.color}</h3>
          <h3>Category: {crewmate.category}</h3> {/* Display category */}
          <button type="button" onClick={editCrewmate}>Wanna edit this Crewmate?</button>
          <div>
            <img src="src\assets\suspect.png" alt="suspect" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
