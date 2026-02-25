import { useApiData } from '../hooks/useApiData';

type Institution = {
  id: number;
  name: string;
};

function InstitutionsPage() {
  const {
    data: institutions,
    loading,
    error,
    reload,
  } = useApiData<Institution[]>('https://your-api-url.com/institutions');

  if (loading) {
    return <p>Loading institutions...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  if (!institutions || institutions.length === 0) {
    return <p>No institutions found.</p>;
  }

  return (
    <div>
      <h1>Institutions</h1>
      <ul>
        {institutions.map((institution) => (
          <li key={institution.id}>{institution.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default InstitutionsPage
