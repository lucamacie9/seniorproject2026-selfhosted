import { useApiData } from '../hooks/useApiData';

type MatchResult = {
  id: number;
  title: string;
};

function MatchPage() {
  const {
    data: matches,
    loading,
    error,
    reload,
  } = useApiData<MatchResult[]>('https://your-api-url.com/matches');

  if (loading) {
    return <p>Loading matches...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return <p>No matches found.</p>;
  }

  return (
    <div>
      <h1>Match</h1>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>{match.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchPage
