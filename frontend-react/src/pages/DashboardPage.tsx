import { useApiData } from '../hooks/useApiData';

type DashboardItem = {
  id: number;
  title: string;
};

function DashboardPage() {
  const {
    data: items,
    loading,
    error,
    reload,
  } = useApiData<DashboardItem[]>('https://your-api-url.com/dashboard');

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p>No dashboard data found.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage
