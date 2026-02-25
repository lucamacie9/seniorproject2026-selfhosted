import { useApiData } from '../hooks/useApiData';

type Program = {
  id: number;
  name: string;
};

function ProgramsPage() {
  const {
    data: programs,
    loading,
    error,
    reload,
  } = useApiData<Program[]>('https://your-api-url.com/programs');

  if (loading) {
    return <p>Loading programs...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return <p>No programs found.</p>;
  }

  return (
    <div>
      <h1>Programs</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>{program.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramsPage;
