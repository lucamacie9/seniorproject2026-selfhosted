function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero / header area similar to index.html */}
      <section
        style={{
          padding: '3rem 2rem',
          background: '#e9f5ff',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
  style={{
    height: 160,
    backgroundImage: "url('/ru-banner.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  }}
/>
          <h1 style={{ marginBottom: '0.5rem' }}>Transfer Credit Match</h1>
          <p style={{ margin: 0, color: '#555' }}>
            Discover how your courses and credits transfer to Roosevelt University
          </p>
        </div>
      </section>

      {/* Cards grid similar to legacy home college cards */}
      <section style={{ maxWidth: 1024, margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>Featured institutions section</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                border: '1px dashed #ccc',
                borderRadius: '8px',
                padding: '1.5rem',
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  height: 80,
                  background: '#f7f7f7',
                  borderRadius: '4px',
                }}
              />
              <div
                style={{
                  height: 14,
                  background: '#eee',
                  borderRadius: '4px',
                  width: '60%',
                }}
              />
              <div
                style={{
                  height: 12,
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  width: '40%',
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
