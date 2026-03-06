import React from 'react';
import { stories, events } from '../../data';

export default function Landing({ onNavigateToLogin }) {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 50 }}>


            {/* Navbar */}
            <div className="topbar" style={{ padding: '16px 40px', background: 'rgba(255,255,255,0.8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="lmark" style={{ width: 34, height: 34, fontSize: '1rem', margin: 0, animation: 'none' }}>A</div>
                    <div className="pgt" style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>AlumniConnect</div>
                </div>
                <div className="tbr">
                    <button className="btn bo" style={{ fontSize: '.85rem', padding: '8px 18px' }} onClick={onNavigateToLogin}>Log In</button>
                    <button className="btn bt" style={{ fontSize: '.85rem', padding: '8px 18px' }} onClick={onNavigateToLogin}>Join Network</button>
                </div>
            </div>

            {/* Hero Banner */}
            <div className="hero-banner" style={{ height: '540px', borderRadius: '0 0 40px 40px', margin: '0 10px' }}>
                <div className="hero-overlay" />
                <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="greet-text">Welcome to Your Alumni Network</div>
                    <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '1.1rem', marginBottom: 35, lineHeight: 1.6 }}>
                        Connect with peers, find expert mentors, explore exclusive jobs, and give back to your alma mater. The official platform for students, alumni, and faculty.
                    </p>
                    <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
                        <button className="btn bt" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={onNavigateToLogin}>Get Started</button>
                        <button className="btn bo" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)', padding: '14px 28px', fontSize: '1rem', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(5px)' }} onClick={() => document.getElementById('features').scrollIntoView()}>Learn More</button>
                    </div>
                </div>
                <div className="hero-stats" style={{ justifyContent: 'center', gap: 40, borderTop: 'none', background: 'transparent' }}>
                    {[['4,821+', 'Alumni'], ['312+', 'Mentors'], ['89+', 'Active Jobs'], ['12+', 'Upcoming Events']].map(([n, l], i, arr) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="hstat"><div className="hstat-n">{n}</div><div className="hstat-l">{l}</div></div>
                            {i < arr.length - 1 && <div className="hstat-div" style={{ marginLeft: 40 }} />}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 20px' }} id="features">

                {/* Stat Cards from Dashboard */}
                <div className="g4" style={{ marginBottom: 60 }}>
                    {[['4,821', 'Total Alumni', '▲ 127 this year'], ['312', 'Active Mentors', '▲ 28 new'], ['89', 'Open Jobs', '▲ 15 this week'], ['₹24L', 'Funds Raised', '▲ ₹3.2L this quarter']].map(([n, l, d]) => (
                        <div key={l} className="card sc">
                            <div className="sn">{n}</div><div className="sl">{l}</div><div className="sd">{d}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div style={{ textAlign: 'center', marginBottom: 50 }}>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '2.2rem', color: 'var(--forest)' }}>Everything you need in one place</h2>
                    <p style={{ color: 'var(--muted)', marginTop: 10, fontSize: '1.05rem', maxWidth: 600, margin: '10px auto 0' }}>A smart, modern platform designed to keep our incredible community connected and thriving.</p>
                </div>

                <div className="g3" style={{ marginBottom: 70 }}>
                    {[
                        { icon: '🤝', title: 'Mentorship', text: 'Find or become a mentor. Connect seamlessly with industry leaders.' },
                        { icon: '💼', title: 'Job Board', text: 'Exclusive job and internship opportunities shared directly from the network.' },
                        { icon: '📅', title: 'Events & Reunions', text: 'Stay updated on local meetups, global reunions, and webinars.' },
                        { icon: '🤖', title: 'AI Recommendations', text: 'Get personalized networking matches driven by our AI advisor.' },
                        { icon: '📚', title: 'Success Stories', text: 'Get inspired by the amazing achievements of our alumni community.' },
                        { icon: '❤️', title: 'Fundraising', text: 'Give back securely and track the lasting impact of your contributions.' }
                    ].map(f => (
                        <div key={f.title} className="card sc" style={{ padding: 35 }}>
                            <div style={{ fontSize: '2.8rem', marginBottom: 18 }}>{f.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 10, color: 'var(--forest)' }}>{f.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>{f.text}</p>
                        </div>
                    ))}
                </div>

                {/* Sneak Peek - Events */}
                {events && events.length > 0 && (
                    <div style={{ marginBottom: 70 }}>
                        <div className="sh" style={{ marginBottom: 25 }}>
                            <div><div className="sht">Upcoming Events</div><div className="shs">Join us online or in person</div></div>
                            <button className="btn bo" onClick={onNavigateToLogin}>View All Events</button>
                        </div>
                        <div className="g3">
                            {events.slice(0, 3).map(e => (
                                <div key={e.t} className="evc">
                                    <div className={`evb ${e.cl}`}>
                                        <span className="evd">{e.d}</span>
                                        <div className="evt">{e.t}</div>
                                    </div>
                                    <div className="evbd">
                                        <div className="evm"><span>{e.mode}</span><span>📍 {e.loc}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span className="chip ct">{e.type}</span>
                                            <button className="btn bt bsm" onClick={onNavigateToLogin}>Register</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sneak Peek - Stories */}
                {stories && stories.length > 0 && (
                    <div style={{ marginBottom: 60 }}>
                        <div className="sh" style={{ marginBottom: 25 }}>
                            <div><div className="sht">Success Stories</div><div className="shs">Inspiring journeys from our community</div></div>
                            <button className="btn bo" onClick={onNavigateToLogin}>Read All Stories</button>
                        </div>
                        <div className="g2">
                            {stories.slice(0, 2).map(x => (
                                <div key={x.n} className="stc">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13, flexWrap: 'wrap' }}>
                                        <div className="av" style={{ width: 42, height: 42, background: 'var(--forest)', fontSize: '1rem' }}>{x.n.split(' ').map(c => c[0]).join('')}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{x.n}</div>
                                            <div style={{ color: 'var(--muted)', fontSize: '.8rem' }}>{x.r} · Batch {x.b}</div>
                                        </div>
                                        <span className="chip cs" style={{ marginLeft: 'auto' }}>🏆 {x.ach}</span>
                                    </div>
                                    <div className="stq" style={{ fontSize: '.95rem' }}>"{x.q}"</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="card" style={{ textAlign: 'center', padding: '50px 30px', background: 'linear-gradient(135deg, var(--bg2), #fff)', borderColor: 'var(--terra)', borderWidth: 2 }}>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', color: 'var(--forest)', marginBottom: 12 }}>Ready to join your community?</h2>
                    <p style={{ color: 'var(--muted)', marginBottom: 25, fontSize: '1.05rem' }}>Sign in to access the full directory, apply for jobs, and connect directly with mentors.</p>
                    <button className="btn bt" style={{ padding: '14px 34px', fontSize: '1.05rem' }} onClick={onNavigateToLogin}>Sign In to Portal</button>
                </div>

            </div>
        </div>
    );
}
