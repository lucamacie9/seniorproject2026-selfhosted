import type { CSSProperties } from 'react';


function LandingPage() {
 return (
   <div style={pageStyle}>
     {/* HERO SECTION */}
     <section style={heroStyle}>
       <div style={heroContainer}>
         <img
           src="/ru-banner.jpg"
           alt="Roosevelt University Banner"
           style={bannerStyle}
         />


         <h1 style={titleStyle}>
           Transfer to Roosevelt University
         </h1>


         <p style={subtitleStyle}>
           Explore how your completed coursework transfers into Roosevelt University programs.
         </p>
       </div>
     </section>


     {/* FEATURE SECTIONS */}
     <section style={gridStyle}>
       {/* Learn */}
       <div style={cardStyle}>
         <img src="/learn.jpg" alt="Learn about Roosevelt" style={imageStyle} />
         <h3 style={cardTitleStyle}>Learn About Roosevelt</h3>
         <p style={cardDescriptionStyle}>
           Discover how transfer credits work and understand how Roosevelt evaluates your completed coursework.
         </p>
         <a href="/about" style={cardButtonStyle}>Learn More</a>
       </div>


       {/* Match */}
       <div style={cardStyle}>
         <img src="/match.jpg" alt="Transfer credit matching" style={imageStyle} />
         <h3 style={cardTitleStyle}>Search Transfer Credits</h3>
         <p style={cardDescriptionStyle}>
           Enter your courses and see how they match Roosevelt University requirements.
         </p>
         <a href="/match" style={cardButtonStyle}>Start Matching</a>
       </div>


       {/* Programs */}
       <div style={cardStyle}>
         <img src="/programs.jpg" alt="Browse programs" style={imageStyle} />
         <h3 style={cardTitleStyle}>Browse Programs</h3>
         <p style={cardDescriptionStyle}>
           Explore Roosevelt University degree programs and academic pathways.
         </p>
         <a href="/programs" style={cardButtonStyle}>View Programs</a>
       </div>
     </section>
   </div>
 );
}


/* PAGE */
const pageStyle: CSSProperties = {
 display: 'flex',
 flexDirection: 'column',
 gap: '2rem',
 fontFamily: 'system-ui, -apple-system, Inter, sans-serif',
 background: `
   radial-gradient(
     circle at bottom left,
     rgba(34, 197, 94, 0.25) 0%,
     rgba(34, 197, 94, 0.12) 25%,
     rgba(255, 255, 255, 0.95) 60%
   )
 `,
 minHeight: '100vh',
};


/* HERO */
const heroStyle: CSSProperties = {
 padding: '3rem 2rem',
};


const heroContainer: CSSProperties = {
 maxWidth: 900,
 margin: '0 auto',
 textAlign: 'center',
};


const bannerStyle: CSSProperties = {
 width: '100%',
 height: 180,
 objectFit: 'contain',
 borderRadius: '12px',
 marginBottom: '1.5rem',
};


const titleStyle: CSSProperties = {
 marginBottom: '0.5rem',
 color: '#1f4d2e',
 fontSize: '2rem',
 fontWeight: 700,
};


const subtitleStyle: CSSProperties = {
 margin: 0,
 color: '#4a6b55',
 fontSize: '1.05rem',
};


/* GRID */
const gridStyle: CSSProperties = {
 maxWidth: 1100,
 margin: '0 auto',
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
 gap: '1.5rem',
 padding: '0 1rem 3rem',
};


/* CARD */
const cardStyle: CSSProperties = {
 border: '1px solid #dbeee2',
 borderRadius: '14px',
 padding: '1.2rem',
 background: '#ffffff',
 display: 'flex',
 flexDirection: 'column',
 gap: '0.75rem',
 boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
};


const imageStyle: CSSProperties = {
 width: '100%',
 height: 150,
 objectFit: 'cover',
 borderRadius: '10px',
};


const cardTitleStyle: CSSProperties = {
 fontSize: '1.15rem',
 color: '#1f4d2e',
 margin: '0.2rem 0',
 fontWeight: 600,
};


const cardDescriptionStyle: CSSProperties = {
 color: '#4a6b55',
 fontSize: '0.95rem',
 lineHeight: '1.5',
 margin: 0,
};


const cardButtonStyle: CSSProperties = {
 marginTop: 'auto',
 backgroundColor: '#e9f7ee',
 color: '#1f4d2e',
 border: '1px solid #7bc47f',
 padding: '10px 14px',
 borderRadius: '8px',
 fontWeight: 600,
 cursor: 'pointer',
 textDecoration: 'none',
 display: 'inline-block',
 textAlign: 'center',
};


export default LandingPage;
