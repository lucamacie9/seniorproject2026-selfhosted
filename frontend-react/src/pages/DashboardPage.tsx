import { useState } from 'react';

const statCards = [
  { label: 'Institutions', value: 12 },
  { label: 'Programs', value: 34 },
  { label: 'Courses', value: 186 },
  { label: 'Knowledge Units', value: 92 },
];

const sections = ['Institutions', 'Programs', 'Courses', 'Knowledge Units'] as const;
type Section = (typeof sections)[number];

type SectionItem =
  | { name: string }
  | { code: string; title: string }
  | { code: string; description: string };

type DataState = Record<Section, SectionItem[]>;
type NewEntryState = Record<Section, string>;

const recentUpdates = [
  'New course equivalency submitted for CST261.',
  'Program mapping updated for Cybersecurity diploma.',
  'Institution profile approved for Northern Tech.',
];

function DashboardPage() {
  const [data, setData] = useState<DataState>({
    Institutions: [{ name: 'University A' }, { name: 'College B' }],
    Programs: [{ name: 'Cybersecurity' }, { name: 'IT Networking' }],
    Courses: [{ code: 'CST 261', title: 'Assembly Programming' }],
    'Knowledge Units': [{ code: 'KU1', description: 'Binary Calculations' }],
  });

  const [newEntry, setNewEntry] = useState<NewEntryState>({
    Institutions: '',
    Programs: '',
    Courses: '',
    'Knowledge Units': '',
  });

  const handleAdd = (section: Section) => {
    if (!newEntry[section].trim()) return;

    const item: SectionItem =
      section === 'Courses'
        ? { code: newEntry[section], title: '' }
        : section === 'Knowledge Units'
          ? { code: newEntry[section], description: '' }
          : { name: newEntry[section] };

    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));

    setNewEntry((prev) => ({ ...prev, [section]: '' }));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f7faf8',
        maxWidth: 980,
        margin: '0 auto',
        padding: '2.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <section
        style={{
          border: '1px solid #c9e5d4',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #f5fff5 0%, #e8f8e7 55%, #dff1dc 100%)',
          color: '#1f5f3f',
          padding: '1.25rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Director Dashboard</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#355e3b' }}>
          Overview of transfer credit activity and quick access to management areas.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              border: '1px solid #dfe7e2',
              borderRadius: 12,
              background: '#fff',
              padding: '1rem',
            }}
          >
            <p style={{ margin: 0, color: '#4f7a57', fontSize: '0.9rem' }}>{card.label}</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem', fontWeight: 700, color: '#1f4d2e' }}>
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <header style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1f4d2e' }}>
          Program Director Dashboard
        </h2>
        <p style={{ color: '#355e3b', margin: 0 }}>
          Manage Institutions, Programs, Courses, and Knowledge Units
        </p>
      </header>

      {sections.map((section) => (
        <div
          key={section}
          style={{
            border: '1px solid #dfe7e2',
            borderRadius: '12px',
            padding: '1.5rem',
            backgroundColor: '#fff',
            boxShadow: '0 8px 24px rgba(16, 24, 40, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#1f4d2e' }}>{section}</h2>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder={`Add new ${section.slice(0, -1)}`}
              value={newEntry[section]}
              onChange={(e) =>
                setNewEntry((prev) => ({ ...prev, [section]: e.target.value }))
              }
              style={{
                flex: 1,
                height: 38,
                padding: '0 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cad8cf',
                backgroundColor: '#fff',
                color: '#111827',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={() => handleAdd(section)}
              style={{
                height: 38,
                padding: '0 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2f7e41',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>

          <div
            style={{
              border: '1px dashed #cfe2d4',
              borderRadius: '8px',
              padding: '0.5rem',
              minHeight: 60,
              backgroundColor: '#f9fcfa',
            }}
          >
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data[section].map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: '0.25rem 0',
                    borderBottom: '1px solid #e3ebe5',
                    color: '#4b5563',
                  }}
                >
                  {'name' in item
                    ? item.name
                    : 'title' in item
                      ? item.title || item.code
                      : item.description || item.code}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            border: '1px solid #dfe7e2',
            borderRadius: 12,
            background: '#fff',
            padding: '1rem',
          }}
        >
          <h2 style={{ marginTop: 0, color: '#1f4d2e' }}>Management Shortcuts</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#355e3b', lineHeight: 1.8 }}>
            <li>Review institution profiles</li>
            <li>Maintain program equivalencies</li>
            <li>Validate course-to-course mappings</li>
            <li>Approve knowledge unit alignments</li>
          </ul>
        </div>

        <div
          style={{
            border: '1px solid #dfe7e2',
            borderRadius: 12,
            background: '#fff',
            padding: '1rem',
          }}
        >
          <h2 style={{ marginTop: 0, color: '#1f4d2e' }}>Recent Updates</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#355e3b', lineHeight: 1.6 }}>
            {recentUpdates.map((update) => (
              <li key={update}>{update}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
