import { useState } from 'react';
import { authApi } from '../../api';

export default function Login({ onLogin, onBack }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        setError(null);
        setLoading(true);

        try {
            const { user } = await authApi.login(email, password);
            onLogin(user); 
        } catch (err) {
            setError(err.message || 'Login failed Check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>


            <div className="login-container">
                <div className="login-card" style={{ position: 'relative' }}>
                    <button
                        type="button"
                        className="btn bo"
                        style={{ position: 'absolute', top: 16, left: 16, border: 'none', padding: '6px 12px', fontSize: '.75rem', background: 'rgba(15,21,53,.05)' }}
                        onClick={onBack}
                    >
                        ← Back
                    </button>
                    <div className="login-logo">A</div>
                    <h1 className="login-title">AlumniConnect</h1>
                    <p className="login-subtitle">Sign in to your portal</p>

                    {error && <div className="login-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ex: alice@university.edu"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}
