import Link from 'next/link';

export default function Home() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0a0a0a',
            color: '#fff',
            fontFamily: 'sans-serif'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#FFB800' }}>TRIUSS</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You are viewing the Next.js development server.</p>
            <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#111' }}>
                <p>This project is currently set up as a static site.</p>
                <p>Please use <strong>port 5000</strong> to view the full website.</p>
                <p style={{ marginTop: '1rem' }}>
                    <a href="http://localhost:5000" style={{ color: '#FFB800', textDecoration: 'underline' }}>Go to http://localhost:5000</a>
                </p>
            </div>
        </div>
    );
}
