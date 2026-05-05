import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoleView } from '../context/RoleViewContext';
import { basicAuthHeader, getJson } from '../lib/api';

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

type StatRow = { label: string; value: string };

function DashboardPage() {
  const navigate = useNavigate();
  const { role, setRole, authEmail, authPassword } = useRoleView();
  const [statCards, setStatCards] = useState<StatRow[]>([
    { label: 'Institutions', value: '—' },
    { label: 'Programs', value: '—' },
    { label: 'Courses', value: '—' },
    { label: 'Knowledge Units', value: '—' },
  ]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [institutions, programs, kuList] = await Promise.all([
          getJson<unknown[]>('/api/institutions'),
          getJson<unknown[]>('/api/programs'),
          getJson<unknown[]>('/api/knowledge_units'),
        ]);
        let coursesCount: number | null = null;
        if (authEmail && authPassword) {
          try {
            const courses = await getJson<unknown[]>('/api/courses', {
              headers: basicAuthHeader(authEmail, authPassword),
            });
            coursesCount = courses?.length ?? 0;
          } catch {
            coursesCount = null;
          }
        }
        if (cancelled) return;
        setStatCards([
          { label: 'Institutions', value: String(institutions?.length ?? 0) },
          { label: 'Programs', value: String(programs?.length ?? 0) },
          {
            label: 'Courses',
            value: coursesCount === null ? 'Login as admin/director' : String(coursesCount),
          },
          { label: 'Knowledge Units', value: String(kuList?.length ?? 0) },
        ]);
      } catch {
        if (!cancelled) {
          setStatCards([
            { label: 'Institutions', value: '?' },
            { label: 'Programs', value: '?' },
            { label: 'Courses', value: '?' },
            { label: 'Knowledge Units', value: '?' },
          ]);
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [authEmail, authPassword]);
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

  const roleLabel = role === 'admin' ? 'Admin' : role === 'director' ? 'Director' : 'Student';
  const sectionPlaceholder: Record<Section, string> = {
    Institutions: 'Add New Institution',
    Programs: 'Add New Program',
    Courses: 'Add New Course',
    'Knowledge Units': 'Add New Knowledge Unit',
  };

  const sectionInputBackground: Record<Section, string> = {
    Institutions: 'linear-gradient(90deg, rgba(225, 246, 233, 0.95), rgba(248, 255, 251, 0.9))',
    Programs: 'linear-gradient(90deg, rgba(219, 244, 228, 0.95), rgba(246, 255, 250, 0.9))',
    Courses: 'linear-gradient(90deg, rgba(212, 241, 223, 0.95), rgba(243, 255, 248, 0.9))',
    'Knowledge Units': 'linear-gradient(90deg, rgba(206, 238, 219, 0.95), rgba(240, 255, 246, 0.9))',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'transparent',
        maxWidth: 1080,
        margin: '0 auto',
        padding: '2.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(420px, 1.3fr) minmax(280px, 1fr)',
          gap: '1rem',
          alignItems: 'stretch',
        }}
      >
        <section
          style={{
            border: '1px solid #b8dcc4',
            borderRadius: 20,
            background: 'linear-gradient(145deg, #f9fffb 0%, #e5f8eb 62%, #d8f0df 100%)',
            padding: '1.2rem 1.15rem',
            boxShadow: '0 12px 28px rgba(33, 104, 61, 0.1)',
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              margin: 0,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: '#2f7e41',
              fontSize: '0.78rem',
            }}
          >
            Director
          </p>
          <h1 style={{ margin: '0.35rem 0 0 0', fontSize: '2.5rem', lineHeight: 1, color: '#0f172a' }}>
            Dashboard
          </h1>
          <p style={{ margin: '0.75rem 0 0 0', color: '#385b43', fontSize: '0.95rem' }}>
            Overview of transfer credit activity and quick access to management areas.
          </p>

          <div
            style={{
              marginTop: '1.1rem',
              display: 'flex',
              gap: '0.45rem',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                border: '1px solid #9ec7ab',
                borderRadius: 999,
                padding: '0.35rem 0.7rem',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: '#1b4f2c',
                background: '#ecfaf0',
                whiteSpace: 'nowrap',
              }}
            >
              Current role: {roleLabel}
            </span>
            <button
              type="button"
              onClick={() => setRole('admin')}
              style={{
                borderRadius: 999,
                border: role === 'admin' ? '1px solid #2f7e41' : '1px solid #bbd8c3',
                background: role === 'admin' ? '#2f7e41' : '#ffffff',
                color: role === 'admin' ? '#fff' : '#174125',
                padding: '0.3rem 0.65rem',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              View as Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('student');
                navigate('/');
              }}
              style={{
                borderRadius: 999,
                border: '1px solid #bbd8c3',
                background: '#fff',
                color: '#174125',
                padding: '0.3rem 0.65rem',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              View as Student
            </button>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))',
            gap: '0.7rem',
            alignContent: 'start',
          }}
        >
          {statCards.map((card) => (
            <div
              key={card.label}
              style={{
                border: '1.5px solid #7faf92',
                borderRadius: 16,
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '0.8rem 0.7rem',
                minHeight: 90,
                boxShadow: '0 8px 18px rgba(33, 104, 61, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                {card.value}
              </p>
              <p style={{ margin: '0.35rem 0 0 0', color: '#334155', fontSize: '0.88rem' }}>{card.label}</p>
            </div>
          ))}
        </section>
      </div>

      <header style={{ textAlign: 'center', marginTop: '0.35rem' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.15rem', color: '#0f172a', lineHeight: 1.05 }}>
          Program Director Dashboard
        </h2>
        <p style={{ color: '#2f7e41', margin: 0, fontWeight: 600 }}>
          Manage Institutions, Programs, Courses, and Knowledge Units
        </p>
      </header>

      {sections.map((section) => (
        <section
          key={section}
          style={{
            border: '2px solid #81b090',
            borderRadius: 18,
            padding: '0.95rem 1rem',
            background: 'rgba(255, 255, 255, 0.78)',
            boxShadow: '0 8px 24px rgba(22, 101, 52, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem',
          }}
        >
          <h3 style={{ fontSize: '2rem', margin: '0.1rem 0', color: '#0f172a', lineHeight: 1.1 }}>{section}</h3>
          <div style={{ display: 'flex', gap: '0.55rem' }}>
            <input
              type="text"
              placeholder={sectionPlaceholder[section]}
              value={newEntry[section]}
              onChange={(e) => setNewEntry((prev) => ({ ...prev, [section]: e.target.value }))}
              style={{
                flex: 1,
                height: 44,
                padding: '0 0.95rem',
                borderRadius: 999,
                border: '1px solid #c7dfcd',
                background: sectionInputBackground[section],
                color: '#1f2937',
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
            <button
              type="button"
              onClick={() => handleAdd(section)}
              style={{
                height: 44,
                minWidth: 90,
                padding: '0 1.1rem',
                borderRadius: 999,
                border: '1px solid #75ae85',
                background: 'linear-gradient(145deg, #95e0aa, #7fd097)',
                color: '#11341c',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
          <div
            style={{
              border: '1px solid #d5eadb',
              borderRadius: 999,
              padding: '0.25rem 0.85rem',
              minHeight: 48,
              background: 'linear-gradient(90deg, rgba(238, 250, 242, 0.8), rgba(255, 255, 255, 0.9))',
            }}
          >
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data[section].map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: '0.4rem 0.25rem',
                    borderBottom: i < data[section].length - 1 ? '1px solid #e6f2e9' : 'none',
                    color: '#334155',
                    fontWeight: 500,
                    fontSize: '0.92rem',
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
        </section>
      ))}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '0.9rem',
          marginTop: '0.45rem',
        }}
      >
        <div
          style={{
            border: '2px solid #88b596',
            borderRadius: 18,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '1rem 1.1rem',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.45rem', color: '#0f172a', fontSize: '1.9rem' }}>
            Management Shortcuts
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.05rem', color: '#1f3f2a', lineHeight: 1.55 }}>
            <li>Review institution profiles</li>
            <li>Maintain program equivalencies</li>
            <li>Validate course-to-course mappings</li>
            <li>Approve knowledge unit alignments</li>
          </ul>
        </div>
        <div
          style={{
            border: '2px solid #88b596',
            borderRadius: 18,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '1rem 1.1rem',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.45rem', color: '#0f172a', fontSize: '1.9rem' }}>
            Recent Updates
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.05rem', color: '#1f3f2a', lineHeight: 1.55 }}>
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
